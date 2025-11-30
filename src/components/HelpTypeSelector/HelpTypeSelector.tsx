import React, { useState } from "react";
import "./HelpTypeSelector.css";

import PaymentMethods from "../PaymentMethods/PaymentMethods";
import CardInputs from "../CardInputs/CardInputs";

import handIcon from "../../assets/icons/hand.svg";
import walletIcon from "../../assets/icons/wallet.svg";
import clothingIcon from "../../assets/icons/clothing.svg";
import heartIcon from "../../assets/icons/heart.svg";

const HelpTypeSelector: React.FC = () => {
    const [activeType, setActiveType] = useState("finance");

    const buttons = [
        { id: "make", label: "Зробити", icon: handIcon },
        { id: "finance", label: "Фінансова допомога", icon: walletIcon },
        { id: "material", label: "Матеріальна допомога", icon: clothingIcon },
        { id: "volunteer", label: "Волонтерство", icon: heartIcon }
    ];

    return (
        <div className="help-wrapper">
            <h2 className="help-title">Види допомоги</h2>
            <p className="help-subtitle">Ви можете змінити вид допомоги</p>

            <div className="help-types">
                {buttons.map(btn => (
                    <div
                        key={btn.id}
                        className={`help-item ${activeType === btn.id ? "active" : ""}`}
                        onClick={() => setActiveType(btn.id)}
                    >
                        <div className="icon-box">
                            <img src={btn.icon} className="help-icon" alt="" />
                        </div>

                        <span className="help-text">{btn.label}</span>

                        {activeType === btn.id && <div className="hts-arrow"></div>}
                    </div>
                ))}
            </div>

            <div className="help-content-box">
                {activeType === "finance" ? (
                    <div className="finance-flex">
                        <PaymentMethods />
                        <CardInputs />
                    </div>
                ) : (
                    <div className="developing">
                        <h3>В активній розробці...</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HelpTypeSelector;
