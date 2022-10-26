module.exports = {
    openapi: '3.0.0',
    info: {
      title: 'REDITCLONE',
      version: '1.0.0',
      description:
      `REDITCLONE API documentation <br> 
      <h2>Authentication<h2>
      <h3>token</h3>
      <p>Authenticate your API calls by including your token in the Authorization header of every request you make to logout, subreddit, post and comment</p>
      <p>You will use this token in your request's Authorization header. Here is an example:<br><br><br><code> Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywicGhvbmVOdW1iZXIiOjIzNDkwMDAwMDAwMDAsImlhdCI6MTY2NTYyNDcxNywiZXhwIjoxNjY1NjI1NjE3fQ.ydQrT-l7JlMvImV29_uaWKNkUs4vm8yZbhxcazq1Ggg </code></p>
      <h3>Token</h3>
      <p>To aquire token:</p>
      <p>1.Signin via Login route</p>
      <h2>Requests and Response</h2>
      <p>Both request body data and response data are formatted as JSON. Content type for responses will always be application/json. Generally, all responses will be in the following format:</p>
      <code>
      <p>Error:</p>
      {<br>
        statusCode: "500",<br>
        success: false,<br>
        message: "An error occured",<br>
        error: e.message<br>
       }<br><br>
       <p>Success:</p>
       {<br>
        statusCode: "200",<br>
        success: true,<br>
        message: 'Subreddit updated succesfully',<br>
        subredit: updateSubreddit<br>
       }<br>
       </code>
       <h2>Response Codes </h2>
       <p>200, 201: Request was successful and intended action was carried out.<p>
       <p>400: A validation or client side error occurred and the request was not fulfilled.<p>
       <p>401: The request was not authorized. This can be triggered by passing an invalid token in the authorization header or the lack of one.<p>
       <p>404: Request could not be fulfilled as the request resource does not exist.<p>
       <p>500, 501, 502, 503, 504: Request could not be fulfilled due to an error on reditclone end.<p>
      `,
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Adegboye opeyemi',
        url: 'https://github.com/honsmart',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'ttps://thenewreddit.herokuapp.com',
        description: 'Live server',
      },
    ],
  };