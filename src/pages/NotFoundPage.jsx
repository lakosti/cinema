import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <p>Not found page!</p>
      <Link to="/">Return to home</Link>
    </>
  );
};

export default NotFoundPage;
