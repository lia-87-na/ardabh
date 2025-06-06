// Staff.jsx
import React, { useState } from 'react';
import './staff.scss';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope, FaGlobe } from 'react-icons/fa';

const staffMembers = [
    {
        name: "Գևորգ Թամարյան",
        position: "Կրթության գծով տնօրեն, դասախոս",
        description: "Համակարգում է կենտրոնի ռազմավարությունը, կազմակերպում է կրթական գործընթացը և վերահսկում է ծրագրերի իրականացումը։ Իրականացնում է շինարարական հմտությունների դասընթացներ՝ ընդգրկելով էլեկտրամոնտաժ, ջրմուղ և այլ գործնական հմտություններ։",
        image: "/images/staff/tamaryan.jpg",
        facebook: null,
        instagram: null,
        linkedin: null,
        email: "gevorgtamaryan73@mail.ru",
        website: null
    },
    {
        name: "Լիաննա Գալստյան",
        position: "Գործավար, համակարգչային տեխնոլոգիաների դասախոս",
        description: "Պատասխանատու է Վեբ ծրագրավորման դասընթացների անցկացման և ուսանողների տեխնիկական առաջադիմության ,ինչպես նաև կենտրոնի գործավարության կազմակերպման համար։",
        image: "/images/staff/lianna.jpg",
        facebook: "https://www.facebook.com/lianna.galstyan.296747",
        instagram: "https://www.instagram.com/lianna_galstyan_87/",
        linkedin: null,
        email: "liana.galstyan.87@mail.ru",
        website: null
    },
    {
        name: "Մարինե Սինանյան",
        position: "Դասախոս",
        description: "Ձեռագործության դասընթացների պատասխանատու՝ ներառում է շյուղագործություն, հելյունագործություն և տիկնիկագործություն։",
        image: "/images/staff/marine.jpg",
        facebook: "https://www.facebook.com/marine.hak.5",
        instagram: "https://www.instagram.com/handmade_sinanyan/",
        linkedin: null,
        email: "marmane2017@gmail.com",
        website: null
    },


    {
        name: "Տիգրան Դեմիրչյան",
        position: "Դասախոս",
        description: "Վանաձորում իրականացնում է շինարարական հմտությունների դասընթացներ՝ ընդգրկելով էլեկտրամոնտաժ, ջրմուղ և այլ գործնական հմտություններ։",
        image: "/images/staff/tigran.jpg",
        facebook: "https://www.facebook.com/tigran.d",
        instagram: "https://www.instagram.com/tigran__demirchyan/",
        linkedin: "https://www.linkedin.com/in/%D1%82%D0%B8%D0%B3%D1%80%D0%B0%D0%BD-%D0%B4%D0%B5%D0%BC%D0%B8%D1%80%D1%87%D1%8F%D0%BD-7a9b98299/",
        email: "tigrand1997@gmail.com",
        website: null
    },
    {
        name: "Արայիկ Սիմոնյան",
        position: "Դասախոս",
        description: "Վանաձորում իրականացնում է շինարարական հմտությունների դասընթացներ՝ ընդգրկելով էլեկտրամոնտաժ, ջրմուղ և այլ գործնական հմտություններ։",
        image: "/images/staff/arayik.jpg",
        facebook: null,
        instagram: null,
        linkedin: null,
        email: "Arayik.Simonyan.64@gmail.com",
        website: null
    },

];

export default function Staff() {
    const [modalImage, setModalImage] = useState(null);

    const openModal = (image) => {
        setModalImage(image);
    };

    const closeModal = () => {
        setModalImage(null);
    };

    return (
        <section id="staff">
            <div className="staff-container">
                <h2>Աշխատակազմ</h2>
                <div className="staff-list">
                    {staffMembers.map((member, index) => (
                        <div className="staff-card" key={index}>
                            <img
                                src={member.image}
                                alt={member.name}
                                className="staff-image"
                                onClick={() => openModal(member.image)}
                            />
                            <h3>{member.name}</h3>
                            <h4>{member.position}</h4>
                            <p>{member.description}</p>
                            <div className="staff-socials">
                                {member.facebook && (
                                    <a href={member.facebook} className="facebook" target="_blank" rel="noreferrer" aria-label="Facebook">
                                        <FaFacebookF />
                                    </a>
                                )}
                                {member.instagram && (
                                    <a href={member.instagram} className="instagram" target="_blank" rel="noreferrer" aria-label="Instagram">
                                        <FaInstagram />
                                    </a>
                                )}
                                {member.linkedin && (
                                    <a href={member.linkedin} className="linkedin" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                        <FaLinkedinIn />
                                    </a>
                                )}
                                {member.email && (
                                    <a href={`mailto:${member.email}`} className="email" aria-label="Email">
                                        <FaEnvelope />
                                    </a>
                                )}
                                {member.website && (
                                    <a href={member.website} className="website" target="_blank" rel="noreferrer" aria-label="Website">
                                        <FaGlobe />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modalImage && (
                <div className="modall" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <img src={modalImage} alt="Մեծացված նկար" />
                    </div>
                </div>
            )}
        </section>
    );
}
