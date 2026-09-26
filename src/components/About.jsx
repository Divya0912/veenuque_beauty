import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import {
    aboutInfo,
    aboutFeatures,
    artistryImages
} from '../../constants/index.js';

const About = () => {

    useGSAP(() => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#about',
                start: 'top 75%',
                end: 'top 20%',
                scrub: 1.2,
            }
        });

        // PROFILE IMAGE — smooth luxury reveal
        tl.from('#about-profile', {
            opacity: 0,
            scale: 0.75,
            x: -80,
            rotation: -5,
            duration: 1.4,
            ease: 'power3.out',
        })

            // ABOUT ME
            .from('.about-label', {
                opacity: 0,
                y: 35,
                letterSpacing: '0.9em',
                duration: 0.8,
                ease: 'power3.out',
            }, '-=1')

            // NAME
            .from('#about h1', {
                opacity: 0,
                y: 60,
                scale: 0.92,
                duration: 1,
                ease: 'power4.out',
            }, '-=0.5')

            // ROLE
            .from('#about-role', {
                opacity: 0,
                y: 30,
                letterSpacing: '0.8em',
                duration: 0.8,
                ease: 'power3.out',
            }, '-=0.5')

            // DESCRIPTION
            .from('#about-description', {
                opacity: 0,
                y: 35,
                duration: 1,
                ease: 'power3.out',
            }, '-=0.4')

            // FEATURES — appear one by one
            .from('#about-features > div', {
                opacity: 0,
                y: 50,
                scale: 0.85,
                duration: 0.7,
                stagger: 0.18,
                ease: 'back.out(1.7)',
            }, '-=0.5')

            // MY ARTISTRY
            .from('#artistry-title', {
                opacity: 0,
                x: -100,
                duration: 1,
                ease: 'power4.out',
            }, '-=0.3')

            // GALLERY — cinematic stagger
            .from('#artistry-gallery > div', {
                opacity: 0,
                y: 80,
                scale: 0.88,
                rotation: (index) => index % 2 === 0 ? -2 : 2,
                duration: 0.9,
                stagger: 0.12,
                ease: 'power3.out',
            }, '-=0.5');

    });

    return (
        <section id="about">

            <div className="about-content">

                <div className="about-image">

                    <img
                        id="about-profile"
                        src={aboutInfo.profileImage}
                        alt="Praveena Ramesh"
                    />

                </div>

                <div className="about-info">

                    <p className="about-label">
                        ABOUT ME
                    </p>

                    <h1>
                        {aboutInfo.name}
                    </h1>

                    <p
                        id="about-role"
                        className="about-role"
                    >
                        {aboutInfo.role}
                    </p>

                    <p
                        id="about-description"
                        className="about-description"
                    >
                        {aboutInfo.description}
                    </p>

                    <div
                        id="about-features"
                        className="about-features"
                    >

                        {aboutFeatures.map(({ name, detail, icon }) => (

                            <div key={name}>

                                <img
                                    src={icon}
                                    alt=""
                                />

                                <h3>
                                    {name}
                                </h3>

                                <p>
                                    {detail}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

            <div className="artistry">

                <div
                    id="artistry-title"
                    className="artistry-heading"
                >

                    <h2>
                        MY ARTISTRY
                    </h2>

                </div>

                <div
                    id="artistry-gallery"
                    className="artistry-gallery"
                >

                    {artistryImages.map(({ imgPath }, index) => (

                        <div key={imgPath}>

                            <img
                                src={imgPath}
                                alt={`Artistry ${index + 1}`}
                            />

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default About;