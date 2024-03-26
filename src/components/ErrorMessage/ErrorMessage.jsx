const ErrorMessage = ({ errMsg = "" }) => {
  return <p> {errMsg.length > 0 ? errMsg : "Oops, something went wrong!"}</p>;
};

export default ErrorMessage;
