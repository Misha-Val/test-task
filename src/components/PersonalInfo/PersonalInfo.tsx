import React, { useRef, useState } from "react";
import "./PersonalInfo.css";

import { useForm } from "react-hook-form";
import type { SubmitHandler, Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
    .object({
        firstName: yup.string().min(2, "Ім’я має містити мінімум 2 символи").required("Введіть ім’я"),
        lastName: yup.string().min(2, "Прізвище має містити мінімум 2 символи").required("Введіть прізвище"),
        company: yup.string().required("Введіть назву компанії"),
        email: yup.string().email("Невірний формат Email").required("Введіть Email"),
        phone: yup.string().matches(/^[0-9]+$/, "Телефон має містити лише цифри").min(10).max(15).required(),
        country: yup.string().required("Введіть країну"),
        city: yup.string().required("Введіть місто"),
        state: yup.string().required("Введіть район/штат"),
        address: yup.string().required("Введіть адресу"),
        postal: yup.string().matches(/^[0-9]+$/, "Індекс має містити лише цифри").length(5).required(),
    })
    .required();

type PersonalInfoForm = yup.InferType<typeof schema>;

const PersonalInfo: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PersonalInfoForm>({
        resolver: yupResolver(schema) as Resolver<PersonalInfoForm>,
    });

    const onSubmit: SubmitHandler<PersonalInfoForm> = async (data) => {
        const formData = new FormData();

        Object.entries(data).forEach(([k, v]) => {
            formData.append(k, v);
        });

        if (logoFile) {
            formData.append("logo", logoFile);
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log("SERVER RESPONSE:", result);
        } catch (err) {
            console.error("FORM SUBMIT ERROR:", err);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setLogoFile(e.target.files[0]);
        }
    };

    return (
        <form id="personal-info-form" className="pi-wrapper" onSubmit={handleSubmit(onSubmit)}>
            <div className="pi-left">
                <div className="pi-row-short">
                    <div className="pi-field pi-field-name" >
                        <label>Ім’я</label>
                        <input {...register("firstName")} type="text" />
                        {errors.firstName && <p className="pi-error">{errors.firstName.message}</p>}
                    </div>

                    <div className="pi-field">
                        <label>Прізвище</label>
                        <input {...register("lastName")} type="text" />
                        {errors.lastName && <p className="pi-error">{errors.lastName.message}</p>}
                    </div>
                </div>

                <div className="pi-logo-row">
                    <div className="pi-field long-field">
                        <label>Назва компанії, організації</label>
                        <input {...register("company")} type="text" />
                        {errors.company && <p className="pi-error">{errors.company.message}</p>}
                    </div>

                    <div className="logo-btn-wraper">
                        <span className="logo-btn" onClick={() => fileInputRef.current?.click()}>
                        + Логотип
                        </span>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            style={{ display: "none" }}
                        />

                        {logoFile && <p className="logo-file-name">{logoFile.name}</p>}
                    </div>

                </div>

                <div className="pi-field">
                    <label>Email-адрес</label>
                    <input {...register("email")} type="email" />
                    {errors.email && <p className="pi-error">{errors.email.message}</p>}
                </div>

                <div className="pi-field">
                    <label>Номер телефону</label>
                    <input {...register("phone")} type="text" inputMode="numeric" />
                    {errors.phone && <p className="pi-error">{errors.phone.message}</p>}
                </div>
            </div>

            <div className="pi-right">
                <div className="pi-field">
                    <label>Країна</label>
                    <input {...register("country")} type="text" />
                    {errors.country && <p className="pi-error">{errors.country.message}</p>}
                </div>

                <div className="pi-row-short">
                    <div className="pi-field pi-field-sity">
                        <label>Місто</label>
                        <input {...register("city")} type="text" />
                        {errors.city && <p className="pi-error">{errors.city.message}</p>}
                    </div>

                    <div className="pi-field">
                        <label>Штат, район</label>
                        <input {...register("state")} type="text" />
                        {errors.state && <p className="pi-error">{errors.state.message}</p>}
                    </div>
                </div>

                <div className="pi-field">
                    <label>Адреса</label>
                    <input {...register("address")} type="text" />
                    {errors.address && <p className="pi-error">{errors.address.message}</p>}
                </div>

                <div className="pi-row-short">
                    <div className="pi-field">
                        <label>Поштовий індекс</label>
                        <input {...register("postal")} type="text" inputMode="numeric" />
                        {errors.postal && <p className="pi-error">{errors.postal.message}</p>}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PersonalInfo;
