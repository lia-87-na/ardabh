import React from "react";

const LoginButton = ({ isAdmin, onClick }) => {
    return (
        <button onClick={onClick} style={styles.button}>
            {isAdmin ? "Ելք" : "Մուտք"}
        </button>
    );
};

const styles = {
    button: {
        padding: "10px 20px",
        backgroundColor: "#f9c94a",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        fontSize: "16px",
        cursor: "pointer",
        position:'absolute',
        top:"20px",
        right:"20px"
    }
};

export default LoginButton;
