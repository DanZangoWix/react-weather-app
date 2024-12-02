import "./PageNotFound.css";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="page">
      <div className="error-container">
        <div className="error-code">404</div>
        <div className="error-message">Page Not Found</div>
        <div className="error-description">
          Sorry, the page you're looking for doesn't exist.
        </div>
        <Link to="/" className="home-button">
          Go Home
        </Link>
      </div>
    </div>
  );
}
