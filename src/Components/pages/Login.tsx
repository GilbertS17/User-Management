import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);
    const accessToken = useAuthStore((state) => state.accessToken);

    useEffect(() => {
        if (accessToken) {
            navigate("/dashboard");
        }
    }, [accessToken, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Fill required fields.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    body: {
                        email,
                        password,
                    },
                }),
            });

            const data = await response.json();

            if (response.status === 200) {
                if (email === "academy@gmail.com" && password === "academy123") {
                    console.log("Login response data:", data);
                    setAuth(data.result.data.accessToken, data.result.data.expiresIn);
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 100);
                    // console.log("Auth token after setting:", useAuthStore.getState().accessToken);
                } else {
                    setError("Invalid credentials.");
                }
            } else {
                setError(data.message || "Invalid credentials.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-outer-container">
            <div className="login-inner-container">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="input-container"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-6 relative">
                        <label className="label" htmlFor="password">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="input-container"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="visibility-btn"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {error && <p className="error-msg">{error}</p>}

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
