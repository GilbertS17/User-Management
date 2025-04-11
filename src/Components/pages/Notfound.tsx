import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 dark:bg-primary-dark">
            <h1 className="text-6xl font-bold text-primary mb-4">404 🚫</h1>
            <p className="text-xl text-gray-500 mb-6 text-center">
                Oops! The page you're looking for doesn't exist.
            </p>
            <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 bg-primary hover:bg-primary-super-dark text-white font-semibold rounded-lg shadow-md transition-all duration-300"
            >
                Go to Dashboard
            </button>
        </div>
    );
};

export default NotFound;
