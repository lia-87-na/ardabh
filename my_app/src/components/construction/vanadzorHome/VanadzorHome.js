import React, { useState } from 'react';
import './VanadzorHome.scss';
import HeroSection from '../heroSection/HeroSection';
import VanadzorHome2 from '../VanadzorHome2/VanadzorHome2';

export default function VanadzorHome() {
    const [modalImage, setModalImage] = useState(null);

    const openImage = (src) => {
        setModalImage(src);
    };

    const closeModal = () => {
        setModalImage(null);
    };

    return (
      <div className='Նախագծեր'>
            <section className="vanadzor-home">
                {/* Lightbox modal */}
                {modalImage && (
                    <div className="image-modal" onClick={closeModal}>
                        <img src={modalImage} alt="Մեծացված" />
                    </div>
                )}

                <div className="overview">
                    <h2>Նախագծեր</h2>
                    <HeroSection />
                </div>

                <div className="floorplans">
                    <h3>Հատակագծեր</h3>
                    <div className="plan-grid">
                        <div onClick={() => openImage('/images/floor1.jpeg')}>
                            <img src="/images/floor1.jpeg" alt="Հարկ 1" />
                            <p>1-ին հարկ</p>
                        </div>
                        <div onClick={() => openImage('/images/floor2.jpeg')}>
                            <img src="/images/floor2.jpeg" alt="Հարկ 2" />
                            <p>2-րդ հարկ</p>
                        </div>
                    </div>
                </div>

                <div className="description">
                    <h3>Տեխնիկական Տվյալներ</h3>
                    <img src="/images/exterior3.jpeg" alt="Տան արտաքին տեսք" onClick={() => openImage('/images/exterior3.jpeg')} />
                    <ul>
                        <li>Հարկեր՝ 2</li>
                        <li>Ննջասենյակներ՝ 2</li>
                        <li>Լոգասենյակներ՝ 1</li>
                        <li>Խոհանոց և հյուրասենյակ</li>
                        <li>Լիովին ադապտիվ և արևային պանելներով</li>
                    </ul>
                </div>

                <div className="elevations">
                    <h3>Շինության Ֆասադներ</h3>
                    <div className='fasadblock' onClick={() => openImage('/images/fasad.jpeg')}>
                        <img src="/images/fasad.jpeg" alt="Ֆասադ" />
                    </div>
                    <div className="elevation-grid">
                        {['north', 'south', 'east', 'west'].map((dir) => (
                            <img
                                key={dir}
                                src={`/images/${dir}.jpeg`}
                                alt={`${dir} elevation`}
                                onClick={() => openImage(`/images/${dir}.jpeg`)}
                            />
                        ))}
                    </div>
                </div>
                <VanadzorHome2 />
            </section>
      </div>
    );
}
