function handleError(response, error, message, statusCode) {
  if (error) {
    console.error ('Error', error);
  }

  response.writeHead(statusCode, { 'Content-type': 'application/json'});
  response.end(JSON.stringify({status:false, message: message}));
}

module.exports = handleError;