const mongoose = require("mongoose");
const debug = require("debug")("app:DB");
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'aduit.log' }),
  ],
});


let MongoURI;

module.exports = async app  => {

  MongoURI = process.env.DB_String;

  mongoose.connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  let db = mongoose.connection;

  await db.once("open", async () => {
    console.log("MongoDb Connected Successfully")
    debug("MongoDb Connected Successfully");

    const commentCollection = db.collection("comments")
    const postCollection= db.collection("posts")
    const subredditCollection = db.collection("subreddits")

    const commentChangeStrem = await commentCollection.watch();

    commentChangeStrem.on("change", (change) => {
      console.log(change);

      if(change.operationType === 'insert') {
        const Comment = change.fullDocument;
        logger.log({level: 'info',audit:change})
      } 
    })

    const postChangeStrem = await postCollection.watch();

    postChangeStrem.on("change", (change) => {
      console.log(change);
      if(change.operationType === 'insert') {
        const Post = change.fullDocument;
        logger.log({level: 'info',audit:change})
      } 
    })

    const subredditChangeStrem = await subredditCollection.watch();

    subredditChangeStrem.on("change", (change) => {
      console.log(change);
      if(change.operationType === 'insert') {
        const Subreddit = change.fullDocument;
        logger.log({level: 'info',audit:change})
      } 
    })


  });

  db.on("reconnected", () => {
    console.log("MongoDb has reconnected Successfully")
    debug("MongoDb has reconnected Successfully");
  });

  db.on("error", () => {
    console.log("MongoDb Connection Error")
    debug("MongoDb Connection Error");
    mongoose.disconnect()
  });

  db.on("disconnected", () => {
    console.log("MongoDb connection is disconnected")
    debug("MongoDb connection is disconnected");
  });
};