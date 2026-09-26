import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../style/Portfolio.css";

import {
    portfolioLeftLists,
    portfolioRightLists,
} from "../../constants/Portfolio.js";

gsap.registerPlugin(ScrollTrigger);

const leftFeatures = portfolioLeftLists.map((item) => item.name);

const rightFeatures = portfolioRightLists.map((item) => item.name);

const Portfolio = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion) {
            gsap.set(".portfolio-final", {
                autoAlpha: 1,
            });

            return;
        }

        const media = gsap.matchMedia();

        media.add(
            {
                desktop: "(min-width: 768px)",
                mobile: "(max-width: 767px)",
            },
            (context) => {
                const isMobile = context.conditions?.mobile;

                gsap.set(".portrait-window", {
                    xPercent: -50,
                    yPercent: -50,
                });

                const timeline = gsap.timeline({
                    defaults: {
                        ease: "power2.inOut",
                    },

                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: isMobile ? "+=1900" : "+=2400",
                        scrub: 1.35,
                        pin: true,
                        anticipatePin: 1,
                    },
                });

                timeline
                    .to(".portfolio-fade", {
                        autoAlpha: 0,
                        y: -24,
                        stagger: 0.04,
                        duration: 0.55,
                    })

                    .to(
                        ".foundation-frame",
                        {
                            autoAlpha: 0,
                            scale: 1.08,
                            duration: 0.55,
                        },
                        "-=0.2"
                    )

                    .to(
                        ".portrait-window",
                        {
                            width: "100vw",
                            height: "100vh",
                            top: "50%",
                            left: "50%",
                            borderRadius: 0,
                            duration: 1.2,
                        },
                        "-=0.15"
                    )

                    .to(
                        ".portrait-image",
                        {
                            objectPosition: "center 22%",
                            duration: 0.7,
                        },
                        "-=0.45"
                    )

                    .to(
                        ".portfolio-final",
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.8,
                        },
                        "-=0.35"
                    );

                return () => {
                    timeline.kill();
                };
            }
        );

        return () => {
            media.revert();
        };
    });

    return (
        <section
            ref={sectionRef}
            id="portfolio"
            className="portfolio-stage"
        >
            <div
                className="ambient-glow portfolio-background"
                aria-hidden="true"
            />

            <p className="portfolio-fade section-kicker">
                Makeup artistry portfolio
            </p>

            <h1
                className="portfolio-fade art-title"
                aria-label="Portfolio"
            >
                <span>Port</span>
                <span>folio</span>
            </h1>

            <div
                className="portfolio-fade feature-list feature-list-left"
                aria-label="Portfolio qualities"
            >
                {leftFeatures.map((feature) => (
                    <p
                        key={feature}
                        className="feature-item"
                    >
                        <span
                            aria-hidden="true"
                            className="feature-dot"
                        />
                        {feature}
                    </p>
                ))}
            </div>

            <div
                className="portfolio-fade feature-list feature-list-right"
                aria-label="Artistry values"
            >
                {rightFeatures.map((feature) => (
                    <p
                        key={feature}
                        className="feature-item"
                    >
                        <span
                            aria-hidden="true"
                            className="feature-dot"
                        />
                        {feature}
                    </p>
                ))}
            </div>

            <div className="portrait-reveal">
                <div className="portrait-window">
                    <img
                        src="/images/under-img.png"
                        alt="Bridal makeup artistry by Divya Sri Ramesh"
                        className="portrait-image"
                    />
                </div>

                <img
                    src="/images/mask-img.png"
                    alt=""
                    aria-hidden="true"
                    className="foundation-frame"
                />
            </div>

            <div className="portfolio-fade art-caption">
                <span
                    className="gold-rule"
                    aria-hidden="true"
                />

                <p>Makeup is art</p>

                <span
                    className="gold-rule"
                    aria-hidden="true"
                />
            </div>

            <div className="portfolio-final">
                <p className="final-copy">
                    Every look is thoughtfully created to enhance
                    your natural beauty, confidence and individuality.
                </p>
            </div>

            <p className="portfolio-fade scroll-cue">
                <span aria-hidden="true" />
                Scroll to reveal
            </p>
        </section>
    );
};

export default Portfolio;