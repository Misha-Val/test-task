import React, { useState } from "react";
import "./FormWrapper.css";

import PersonalInfo from "../PersonalInfo/PersonalInfo";
import HelpTypeSelector from "../HelpTypeSelector/HelpTypeSelector";
import SubmitButton from "../SubmitButton/SubmitButton";

const FormWrapper: React.FC = () => {
    const [personType, setPersonType] = useState<"fiz" | "ur">("fiz");

    return (
        <div className="wrapper">
            <div className="container">

                <h2 className="title">Заповніть форму</h2>

                <div className="typeSwitch">

                    <label>
                        <input
                            type="radio"
                            value="fiz"
                            checked={personType === "fiz"}
                            onChange={() => setPersonType("fiz")}
                        />
                        <span className={`switchBtn ${personType === "fiz" ? "active" : ""}`}>
                            Фіз. особа
                        </span>
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="ur"
                            checked={personType === "ur"}
                            onChange={() => setPersonType("ur")}
                        />
                        <span className={`switchBtn ${personType === "ur" ? "active" : ""}`}>
                            Юр. особа
                        </span>
                    </label>

                </div>

                {personType === "fiz" ? (
                    <PersonalInfo />
                ) : (
                    <div className="pi-placeholder">В активній розробці...</div>
                )}

                <HelpTypeSelector />
                <SubmitButton />
            </div>
        </div>
    );
};

export default FormWrapper;
