import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { certificationData } from "../../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

const Certificate = () => {
    const sectionRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const totalCertificates = certificationData.length;

    const goToCertificate = (index) => {
        const newIndex =
            (index + totalCertificates) % totalCertificates;

        setCurrentIndex(newIndex);
    };

    const currentCertificate =
        certificationData[currentIndex];

    const previousCertificate =
        certificationData[
        (currentIndex - 1 + totalCertificates) %
        totalCertificates
            ];

    const nextCertificate =
        certificationData[
        (currentIndex + 1) % totalCertificates
            ];

    useGSAP(() => {
        gsap.fromTo(
            sectionRef.current,
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);

    // ==========================================
    // SCROLL ENTRANCE ANIMATION ONLY
    // ==========================================

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            // TITLE
            tl.fromTo(
                ".certificate-heading h2",
                {
                    opacity: 0,
                    y: 70,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power3.out",
                }
            );

            // LEFT CERTIFICATE
            tl.fromTo(
                ".certificate-side-left",
                {
                    opacity: 0,
                    x: -120,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.9,
                    ease: "power3.out",
                },
                "-=0.55"
            );

            // CENTER CERTIFICATE
            tl.fromTo(
                ".certificate-main-image",
                {
                    opacity: 0,
                    scale: 0.82,
                    y: 50,
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                },
                "-=0.65"
            );

            // RIGHT CERTIFICATE
            tl.fromTo(
                ".certificate-side-right",
                {
                    opacity: 0,
                    x: 120,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.9,
                    ease: "power3.out",
                },
                "-=0.8"
            );

            // GOLD GLOW
            tl.fromTo(
                ".certificate-main-image",
                {
                    filter:
                        "drop-shadow(0 0 0 rgba(255,220,120,0))",
                },
                {
                    filter:
                        "drop-shadow(0 0 8px rgba(255,220,120,1)) drop-shadow(0 0 25px rgba(255,190,60,0.8))",
                    duration: 0.7,
                    ease: "power2.out",
                },
                "-=0.5"
            );

            // INFORMATION
            tl.fromTo(
                ".certificate-main-info",
                {
                    opacity: 0,
                    y: 35,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                },
                "-=0.45"
            );

            // THUMBNAILS
            tl.fromTo(
                ".certificate-thumb",
                {
                    opacity: 0,
                    y: 35,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power2.out",
                },
                "-=0.35"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="certification"
            className="certificate-section"
        >
            {/* MAIN TITLE */}

            <div className="certificate-heading">
                <h2>CERTIFICATION</h2>
            </div>

            {/* MAIN CERTIFICATE AREA */}

            <div className="certificate-stage">

                {/* LEFT CERTIFICATE */}

                <div className="certificate-side certificate-side-left">
                    <img
                        src={previousCertificate.image}
                        alt={previousCertificate.title}
                    />
                </div>

                {/* LEFT ARROW */}

                <button
                    type="button"
                    className="certificate-arrow certificate-arrow-left"
                    onClick={() =>
                        goToCertificate(currentIndex - 1)
                    }
                    aria-label="Previous certificate"
                >
                    <span>‹</span>
                </button>

                {/* CENTER CERTIFICATE */}

                <div className="certificate-main">

                    <img
                        key={currentCertificate.id}
                        src={currentCertificate.image}
                        alt={currentCertificate.title}
                        className="certificate-main-image"
                    />

                    <div className="certificate-main-info">

                        <h3>
                            {currentCertificate.title}
                        </h3>

                        <p>
                            {currentCertificate.subtitle}
                        </p>

                        {currentCertificate.level && (
                            <span>
                                {currentCertificate.level}
                            </span>
                        )}

                    </div>

                </div>

                {/* RIGHT CERTIFICATE */}

                <div className="certificate-side certificate-side-right">

                    <img
                        src={nextCertificate.image}
                        alt={nextCertificate.title}
                    />

                </div>

                {/* RIGHT ARROW */}

                <button
                    type="button"
                    className="certificate-arrow certificate-arrow-right"
                    onClick={() =>
                        goToCertificate(currentIndex + 1)
                    }
                    aria-label="Next certificate"
                >
                    <span>›</span>
                </button>

            </div>

            {/* THUMBNAILS */}

            <div className="certificate-thumbnails">

                {certificationData.map(
                    (certificate, index) => (
                        <button
                            key={certificate.id}
                            type="button"
                            className={
                                index === currentIndex
                                    ? "certificate-thumb active"
                                    : "certificate-thumb"
                            }
                            onClick={() =>
                                goToCertificate(index)
                            }
                        >
                            <img
                                src={certificate.image}
                                alt={certificate.title}
                            />

                            <span>
                                {String(index + 1).padStart(
                                    2,
                                    "0"
                                )}
                            </span>
                        </button>
                    )
                )}

            </div>
        </section>
    );
};

export default Certificate;