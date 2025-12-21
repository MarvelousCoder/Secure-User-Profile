import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Secure User Profile System</h1>
                <p style={styles.subtitle}>
                    Identity Management & Access Control Microservice
                </p>

                <div style={styles.buttonGroup}>
                    <Link to="/login" style={styles.link}>
                        <button style={styles.primaryBtn}>Login</button>
                    </Link>

                    <Link to="/register" style={styles.link}>
                        <button style={styles.secondaryBtn}>Register</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
        fontFamily: "Arial, sans-serif",
    },
    card: {
        backgroundColor: "#ffffff",
        padding: "40px",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "420px",
        textAlign: "center",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
    },
    title: {
        fontSize: "26px",
        fontWeight: "700",
        color: "#1e3a8a",
        marginBottom: "10px",
    },
    subtitle: {
        fontSize: "14px",
        color: "#475569",
        marginBottom: "30px",
        lineHeight: "1.6",
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "center",
        gap: "12px",
    },
    primaryBtn: {
        padding: "10px 22px",
        backgroundColor: "#2563eb",
        color: "#ffffff",
        border: "none",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
    },
    secondaryBtn: {
        padding: "10px 22px",
        backgroundColor: "#ffffff",
        color: "#2563eb",
        border: "2px solid #2563eb",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
    },
};
