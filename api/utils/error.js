 const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    console.log("bfbb");
    return error;
  };
    export default errorHandler;