import React, { useRef, useEffect } from 'react';
import './MediaSection.scss';

const MediaSection = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const video = videoRef.current;
                if (!video) return;

                if (entry.isIntersecting) {
                    video.play().catch((err) => console.log('Video play error:', err));
                } else {
                    video.pause();
                }
            },
            { threshold: 0.5 }
        );

        const currentVideo = videoRef.current;
        if (currentVideo) {
            observer.observe(currentVideo);
        }

        return () => {
            if (currentVideo) observer.unobserve(currentVideo);
        };
    }, []);

    return (
        <section className="media-section">
            <div className="video-container">
                <h2>Ներկայացում</h2>
                <video ref={videoRef} muted controls playsInline>
                    <source src="/videos/promo.mp4" type="video/mp4" />
                    Ձեր բրաուզերը չի աջակցում video tag-ին։
                </video>
                <p className="description">
                    Այս տեսանյութում ներկայացված է մեր կազմակերպության կառուցապատման գործունեության հիմնական ուղղությունները։
                </p>
            </div>

            <div className="gallery-container">
                <h2>Նկարներ կառուցապատումից</h2>
                <div className="images">
                    <div className="image-card">
                        <img src="/images/betonehimq.jpg" alt="Նկար 1" />
                        <p>Կառուցվող տան հիմքը։</p>
                    </div>
                    <div className="image-card">
                        <img src="/images/karucapatum.jpg" alt="Նկար 2" />
                        <p>Երկաթե կոնստրուկցիայի հավաքումը։</p>
                    </div>
                    <div className="image-card">
                        <img src="/images/karkas.jpeg" alt="Նկար 3" />
                        <p>Կառուցվող տան տեսքը, որը կատարվում է բացառապես ԱՌԴԱ ուսումնական կենտրոնի ուսանողների կողմից։</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MediaSection;
