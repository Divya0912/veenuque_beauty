import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";



const Hero = () => {
    const videoRef = useRef();



    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        const paragraphSplit = new SplitText(".subtitle", {
            type: "lines",
        });

        // MAIN TITLE ENTRANCE
        gsap.from(".title", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
        });

        // LUXURY CHAMPAGNE FLICKER
        const titleFlicker = gsap.timeline({
            delay: 1.8,
        });

        titleFlicker
            .set(".title", {
                opacity: 0,
            })
            .to(".title", {
                opacity: 1,
                duration: 0.1,
            })
            .to(".title", {
                opacity: 0.2,
                duration: 0.05,
            })
            .to(".title", {
                opacity: 1,
                duration: 0.1,
            })
            .to(".title", {
                opacity: 0,
                duration: 0.05,
            })
            .to(".title", {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
            });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
            delay: 1,
        });

        gsap
            .timeline({
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            })
            .to(".right-leaf", { y: 200 }, 0)
            .to(".left-leaf", { y: -200 }, 0);

        // VIDEO SCROLL ANIMATION — ORIGINAL JSM
        const startValue = isMobile ? "top 50%" : "center 60%";
        const endValue = isMobile ? "120% top" : "bottom top";

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: "video",
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            },
        });

        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration,
            });
        };
    }, []);

    return (
        <>
            <section id="hero" className="noisy">

                <h1 className="title">
                    VEENUQUE
                    <span>BEAUTY</span>
                </h1>

                {/* LEFT — BRUSHES */}
                <img
                    src="/images/hero-right-brushes.png"
                    alt="left-leaf"
                    className="left-leaf"
                />

                {/* RIGHT — LIPSTICK */}
                <img
                    src="/images/hero-left-lipstick.png"
                    alt="right-leaf"
                    className="right-leaf"
                />

                <div className="body">

                    <div className="content">

                        <div className="space-y-5 hidden md:block">

                            <p>
                                BEAUTY • ARTISTRY • ELEGANCE
                            </p>

                            <p className="subtitle">
                                MAKEUP THAT
                                <br />
                                TELLS YOUR
                                <br />
                                STORY
                            </p>

                        </div>

                        <div className="view-cocktails">

                            <p className="subtitle">
                                Every look is thoughtfully created with
                                precision, creativity and a personal touch —
                                designed to enhance your natural beauty
                                and confidence.
                            </p>

                            <a href="#art">
                                View my work
                            </a>

                        </div>

                    </div>

                </div>

            </section>

            {/* VIDEO — ORIGINAL JSM STRUCTURE */}
            <div className="video absolute inset-0">
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload="auto"
                    src="/videos/output.mp4"
                />
            </div>
        </>
    );




};




export default Hero;