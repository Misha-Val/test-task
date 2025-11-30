import React from "react";
import "./SubmitButton.css";

const SubmitButton: React.FC = () => {
    return (
        <button
            type="submit"
            form="personal-info-form"
            className="submitBtn"
        >
            <span>Допомогти</span>
        </button>
    );
};

export default SubmitButton;
