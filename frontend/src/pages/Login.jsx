import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { email, password } = formData;

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            setLoading(true);
            const data = await loginUser({ email, password });

            // Store token via context
            login(data.token);

            navigate("/profile");
        } catch (err) {
            setError(
                err?.response?.data?.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Login</h2>

                {error && <p style={styles.error}>{error}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={styles.button}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p style={styles.registerText}>
                    Don’t have an account?{" "}
                    <span
                        style={styles.registerLink}
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;

/* ---------- Styles ---------- */
const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
    },
    form: {
        width: "100%",
        maxWidth: "400px",
        padding: "30px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
    },
    heading: {
        textAlign: "center",
        marginBottom: "20px",
    },
    input: {
        padding: "10px",
        marginBottom: "12px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "14px",
    },
    button: {
        padding: "10px",
        background: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "15px",
    },
    error: {
        color: "red",
        marginBottom: "10px",
        fontSize: "14px",
        textAlign: "center",
    },
    registerText: {
        marginTop: "15px",
        fontSize: "14px",
        textAlign: "center",
    },
    registerLink: {
        color: "#2563eb",
        cursor: "pointer",
        fontWeight: "bold",
    },
};
