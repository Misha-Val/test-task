import React, { useRef, useState } from "react";
import "./CardInputs.css";
import valid from "card-validator";

const CardInputs: React.FC = () => {
    const [focused, setFocused] = useState(false);

    const [card, setCard] = useState(["", "", "", ""]);
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");

    const [errors, setErrors] = useState<{ card?: string; expiry?: string; cvc?: string }>({});

    const [isCardGroupFocused, setIsCardGroupFocused] = useState(false);

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const digits = e.target.value.replace(/\D/g, "").slice(0, 4);

        const newCard = [...card];
        newCard[index] = digits;
        setCard(newCard);

        if (digits.length === 4 && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && card[index].length === 0 && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const validateCard = () => {
        const full = card.join("");

        if (!valid.number(full).isValid) {
            setErrors(prev => ({ ...prev, card: "Невірний номер картки" }));
        } else {
            setErrors(prev => ({ ...prev, card: undefined }));
        }
    };

    const onCardFocus = () => {
        setIsCardGroupFocused(true);
    };

    const onCardBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.relatedTarget && inputRefs.current.includes(e.relatedTarget as HTMLInputElement)) {
            return;
        }

        setIsCardGroupFocused(false);
        validateCard();
    };

    const handleExpiryChange = (value: string) => {
        let raw = value.replace(/\D/g, "");

        if (raw.length >= 3) {
            raw = raw.slice(0, 4);
            raw = raw.slice(0, 2) + "/" + raw.slice(2);
        }

        setExpiry(raw);
    };

    const validateExpiry = () => {
        if (!valid.expirationDate(expiry).isValid) {
            setErrors(prev => ({ ...prev, expiry: "Невірна або прострочена дата" }));
            return;
        }

        const [mmStr, yyStr] = expiry.split("/");
        if (!mmStr || !yyStr) return;

        const mm = Number(mmStr);
        const yy = Number("20" + yyStr);

        if (mm < 1 || mm > 12) {
            setErrors(prev => ({ ...prev, expiry: "Місяць має бути 01–12" }));
            return;
        }

        const now = new Date();
        const expDate = new Date(yy, mm - 1);

        if (expDate < new Date(now.getFullYear(), now.getMonth())) {
            setErrors(prev => ({ ...prev, expiry: "Карта прострочена" }));
            return;
        }

        setErrors(prev => ({ ...prev, expiry: undefined }));
    };

    const handleCvcChange = (val: string) => {
        setCvc(val.replace(/\D/g, "").slice(0, 3));
    };

    const validateCvc = () => {
        if (!valid.cvv(cvc).isValid) {
            setErrors(prev => ({ ...prev, cvc: "Невірний CVC" }));
        } else {
            setErrors(prev => ({ ...prev, cvc: undefined }));
        }
    };

    return (
        <div className="ci-wrapper">
            <h3 className="ci-title">Введіть наступні дані</h3>

            <div
                className={`ci-box ${focused ? "active" : ""}`}
                onFocus={() => setFocused(true)}
                onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                        setFocused(false);
                    }
                }}
            >

                <div className="ci-col wide">
                    <label className="ci-label">Номер карти</label>

                    <div className="ci-row top">
                        {[0, 1, 2, 3].map((i) => (
                            <input
                                key={i}
                                ref={(el) => { inputRefs.current[i] = el; }}
                                className={`ci-input ${errors.card ? "ci-invalid" : ""}`}
                                value={card[i]}
                                inputMode="numeric"
                                maxLength={4}
                                onChange={(e) => handleCardInput(e, i)}
                                onKeyDown={(e) => handleBackspace(e, i)}
                                onFocus={onCardFocus}
                                onBlur={onCardBlur}
                            />
                        ))}
                    </div>

                    {!isCardGroupFocused && errors.card && (
                        <p className="ci-error">{errors.card}</p>
                    )}
                </div>


                <div className="ci-row bottom">
                    <div className="ci-col">
                        <label className="ci-label">Термін дії</label>
                        <input
                            className={`ci-input ${errors.expiry ? "ci-invalid" : ""}`}
                            value={expiry}
                            inputMode="numeric"
                            maxLength={5}
                            onChange={(e) => handleExpiryChange(e.target.value)}
                            onBlur={validateExpiry}
                        />
                        {errors.expiry && <p className="ci-error">{errors.expiry}</p>}
                    </div>

                    <div className="ci-col">
                        <label className="ci-label">CVC/CVV</label>
                        <input
                            className={`ci-input ${errors.cvc ? "ci-invalid" : ""}`}
                            value={cvc}
                            inputMode="numeric"
                            maxLength={3}
                            onChange={(e) => handleCvcChange(e.target.value)}
                            onBlur={validateCvc}
                        />
                        {errors.cvc && <p className="ci-error">{errors.cvc}</p>}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CardInputs;
