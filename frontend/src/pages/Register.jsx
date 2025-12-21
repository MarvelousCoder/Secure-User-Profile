import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.api";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        governmentId: "",
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

        const { name, email, password, governmentId } = formData;

        // Basic client-side validation
        if (!name || !email || !password || !governmentId) {
            setError("All fields are required");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);

            await registerUser({
                name,
                email,
                password,
                governmentId,
            });

            // Registration successful → redirect to login
            navigate("/login");

        } catch (err) {
            setError(
                err?.response?.data?.message || "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Register</h2>

                {error && <p style={styles.error}>{error}</p>}

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                />

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

                <input
                    type="text"
                    name="governmentId"
                    placeholder="Government ID"
                    value={formData.governmentId}
                    onChange={handleChange}
                    style={styles.input}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={styles.button}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p style={styles.loginText}>
                    Already have an account?{" "}
                    <span
                        style={styles.loginLink}
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;

/* ---------- Basic Inline Styles ---------- */
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
    loginText: {
        marginTop: "15px",
        fontSize: "14px",
        textAlign: "center",
    },
    loginLink: {
        color: "#2563eb",
        cursor: "pointer",
        fontWeight: "bold",
    },
};
