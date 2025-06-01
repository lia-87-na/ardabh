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
            description: "Սովորում եք HTML, CSS, SCSS, BOOTSTRAP, JavaScript, OOP, React՝ իրական նախագծերով։"
        },
        {
            title: "Շյուղագործություն",
            icon: <GiWool />,
            lecture: "Մարինե Սինանյան",
            description: "Դասընթացներ՝ Գործված հագուստի մոդելավորում, Չափագրում, Տիկնիկագործություն, Հելյունագործություն, Հուլունքագործություն։"
        },
        {
            title: "Շինաշխատանքներ",
            icon: <IoIosConstruct />,
            lecture: "Գևորգ Թամարյան",
            description: DOMPurify.sanitize(`
                Շինարարական դասընթացներն ավարտած շրջանավարտներից մի քանիսը դառնում են դասախոսներ։ Օրինակ՝ 
                էլեկտրագետ Վարդան Մկրտչյանը հիմնել է 
                <a href="https://solarmaster.am/" target="_blank" rel="noopener noreferrer">«Սոլար Մաստեր»</a>։
                Մհեր Ստեփանյանը, Արայիկ Սիմոնյանը, Արտակ Վարոսյանը ևս ակտիվ դեր ունեն «ԱՌԴԱ» ԲՀ-ի նախագծերում։
            `)
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
                        {course.icon}
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
                                <p dangerouslySetInnerHTML={{ __html: selectedCourse.description }} />
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button onClick={closeModal}>Փակել</button>
                            <a href="#contact" onClick={closeModal}>Գրանցվել</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}





