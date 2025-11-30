import React, { useState } from "react";
import "./PaymentMethods.css";

import mastercardIcon from "../../assets/icons/mastercard.svg";
import visaIcon from "../../assets/icons/visa.svg";
import terminalIcon from "../../assets/icons/terminal.svg";
import webmoneyIcon from "../../assets/icons/webmoney.svg";
import paypalIcon from "../../assets/icons/paypal.svg";

const PaymentMethods: React.FC = () => {
    const [active, setActive] = useState("privat24");

    const methods = [
        {
            id: "card",
            label: "Карта VISA / MasterCard",
            icons: [mastercardIcon, visaIcon],
            isPrivat: false,
        },
        {
            id: "privat24",
            label: "Приват24",
            icons: [],
            isPrivat: true,
        },
        {
            id: "terminal",
            label: "Термінали України",
            icons: [terminalIcon],
            isPrivat: false,
        },
        {
            id: "webmoney",
            label: "WebMoney",
            icons: [webmoneyIcon],
            isPrivat: false,
        },
        {
            id: "paypal",
            label: "PayPal",
            icons: [paypalIcon],
            isPrivat: false,
        },
    ];

    return (
        <div className="pm-wrapper">
            <h3 className="pm-title">Спосіб оплати</h3>

            <div className="pm-grid">
                {methods.map((m) => (
                    <div
                        key={m.id}
                        className={`pm-item ${active === m.id ? "active" : ""}`}
                        onClick={() => setActive(m.id)}
                    >
                        <div className="pm-top">
                            {m.isPrivat ? (
                                <div className="pm-privat-big">ПРИВАТ 24</div>
                            ) : (
                                <div className="pm-icons">
                                    {m.icons.map((icon, i) => (
                                        <img key={i} src={icon} className="pm-icon" alt="" />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="pm-label">{m.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentMethods;
