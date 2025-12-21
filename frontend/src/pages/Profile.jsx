import { useEffect, useState } from "react";
import { getProfile } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { maskGovernmentId } from "../utils/mask.util";

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setUser(data.user);
            } catch (error) {
                logout();
                navigate("/login");
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!user) {
        return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading profile...</p>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>User Dashboard</h2>

                <div style={styles.row}>
                    <span>Name</span>
                    <strong>{user.name}</strong>
                </div>

                <div style={styles.row}>
                    <span>Email</span>
                    <strong>{user.email}</strong>
                </div>

                <div style={styles.row}>
                    <span>Government ID</span>
                    <strong>{maskGovernmentId(user.governmentId)}</strong>
                </div>

                <button onClick={handleLogout} style={styles.logoutBtn}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;

/* ---------- Styles ---------- */
const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#eef2f7",
    },
    card: {
        width: "100%",
        maxWidth: "450px",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
    },
    heading: {
        textAlign: "center",
        marginBottom: "25px",
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #eee",
        fontSize: "15px",
    },
    logoutBtn: {
        marginTop: "25px",
        width: "100%",
        padding: "10px",
        background: "#dc2626",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "15px",
    },
};
