import React, { useState, useEffect } from 'react';
import './courses.scss';
import { CiGlobe } from "react-icons/ci";
import { IoIosConstruct } from "react-icons/io";
import { GiWool } from "react-icons/gi";
import DOMPurify from 'dompurify';

export default function Courses() {
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const handleError = (event) => {
            if (event.message.includes('ResizeObserver loop')) {
                event.stopImmediatePropagation();
            }
        };
        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, []);

    const openModal = (course) => {
        setSelectedCourse(course);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setSelectedCourse(null);
        document.body.style.overflow = "";
    };

    const courses = [
        {
            title: "Վեբ Ծրագրավորում",
            icon: <CiGlobe />,
            lecture: "Լիաննա Գալստյան",
            duration: "7 - 8 ամիս",
            frequency: "Շաբաթական 3 դաս",
            bio: "Դասընթացը նախատեսված է սկսնակների և սկսնակ-միջին մակարդակի ծրագրավորողների համար։",
            description: "Սովորում եք HTML, CSS, SCSS, BOOTSTRAP, JavaScript, OOP, React՝ իրական նախագծերով։",
            facebookUrl: "https://www.facebook.com/code.li.2025",  
            instagramUrl: "https://www.instagram.com/code_li_school/"
        },
        {
            title: "Շյուղագործություն",
            icon: <GiWool />,
            lecture: "Մարինե Սինանյան",
            duration: "3 կամ 6 ամիս",
            frequency: "Շաբաթական 3 դաս",
            bio: "Հմտացնում ենք ձեռքի աշխատանքները՝ ստեղծելով գեղարվեստական և գործնական արտադրանք։",
            description: "Դասընթացներ՝ Գործված հագուստի մոդելավորում, Չափագրում, Տիկնիկագործություն, Հելյունագործություն, Հուլունքագործություն։",
            facebookUrl: "https://www.facebook.com/marine.hak.5",
            instagramUrl: "https://www.instagram.com/handmade_sinanyan/"
        },
        {
            title: "Շինաշխատանքներ",
            icon: <IoIosConstruct />,
            lecture: "Գևորգ Թամարյան",
            duration: "3 ամիս",
            frequency: "Շաբաթական 3 դաս",
            bio: "Դասընթացը համադրում է տեսական գիտելիքները և գործնական հմտությունները՝ շինարարության տարբեր ճյուղերում։",
            description: DOMPurify.sanitize(`
                Շինարարական դասընթացներն ավարտած շրջանավարտներից մի քանիսը դառնում են դասախոսներ։ Օրինակ՝ 
                էլեկտրագետ Վարդան Մկրտչյանը հիմնել է 
                <a href="https://solarmaster.am/" target="_blank" rel="noopener noreferrer">«Սոլար Մաստեր»</a>։<br/>
                Մհեր Ստեփանյանը, Արայիկ Սիմոնյանը, Արտակ Վարոսյանը ևս ակտիվ դեր ունեն «ԱՌԴԱ» ԲՀ-ի նախագծերում։
            `),
            facebookUrl: "https://www.facebook.com/ARDA_KENTRON",
            instagramUrl: null  
        }
    ];

    return (
        <div id='courses'>
            <div className="courses_intro">
                <h2>«ԱՌԴԱ» ԲՀ մասնագիտական կրթական կենտրոնը իրականացնում է հետևյալ կրթական ծրագրերը՝</h2>
                <p>Մասնագիտական կրթության հաջողությանը նպաստում են փորձառու դասավանդողները և ժամանակակից սարքավորումներով հագեցած տեխնիկական բազան։</p>
            </div>

            <div className='courses_block'>
                {courses.map((course, i) => (
                    <div className='box' key={i} onClick={() => openModal(course)}>
                        <div className='icon'>{course.icon}</div>
                        <h3>{course.title}</h3>
                        <h5>{course.lecture}</h5>
                        <button className="details-btn" onClick={e => { e.stopPropagation(); openModal(course); }}>
                            Մանրամասներ
                        </button>
                    </div>
                ))}
            </div>

            {selectedCourse && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-text">
                                <h3>{selectedCourse.title}</h3>
                                <p><strong>Դասախոս․</strong> {selectedCourse.lecture}</p>
                                <p><strong>Տևողություն․</strong> {selectedCourse.duration}</p>
                                <p><strong>Դասաժամ․</strong> {selectedCourse.frequency}</p>
                                <p><strong>Ծրագիր․</strong></p>
                                <p dangerouslySetInnerHTML={{ __html: selectedCourse.description }} />

                                {selectedCourse.bio && (
                                    <div className="course-bio">
                                        <p><strong>Նկարագրություն․</strong> {selectedCourse.bio}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button onClick={closeModal}>Փակել</button>
                            <a href="#register" onClick={closeModal} className="register-btn">Գրանցվել</a>
                            <div className="social-share">
                                {selectedCourse.facebookUrl && (
                                    <a
                                        href={selectedCourse.facebookUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Facebook"
                                    >
                                        Facebook
                                    </a>
                                )}
                                {selectedCourse.instagramUrl && (
                                    <a
                                        href={selectedCourse.instagramUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Instagram"
                                    >
                                        Instagram
                                    </a>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
