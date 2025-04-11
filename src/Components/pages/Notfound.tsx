import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-outer-container">
            <h1 className="not-found-msg">404 🚫</h1>
            <p className="not-found-text">
                Oops! The page you're looking for doesn't exist.
            </p>
            <button
                onClick={() => navigate("/dashboard")}
                className="home-btn"
            >
                Go to Dashboard
            </button>
        </div>
    );
};

export default NotFound;
