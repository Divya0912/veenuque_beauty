import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { contactData } from "../../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#contact",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });

        tl.fromTo(
            ".contact-heading h3",
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
            }
        );

        tl.fromTo(
            ".contact-heading h2",
            {
                opacity: 0,
                y: 70,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
            },
            "-=0.35"
        );

        tl.fromTo(
            ".contact-divider",
            {
                opacity: 0,
                scaleX: 0,
            },
            {
                opacity: 1,
                scaleX: 1,
                duration: 0.7,
                ease: "power3.out",
            },
            "-=0.5"
        );

        tl.fromTo(
            ".contact-tagline",
            {
                opacity: 0,
                y: 25,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
            },
            "-=0.3"
        );

        tl.fromTo(
            ".contact-card",
            {
                opacity: 0,
                y: 70,
                scale: 0.94,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: "power3.out",
            },
            "-=0.25"
        );

        tl.fromTo(
            ".contact-book-button",
            {
                opacity: 0,
                y: 40,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
            },
            "-=0.25"
        );
    });

    return (
        <footer id="contact">

            <div className="contact-content">

                <div className="contact-heading">
                    {/* SMALL LABEL */}
                    <h3>CONTACT</h3>

                    {/* MAIN TITLE */}
                    <h2>CONTACT US</h2>
                </div>

                {/* GOLD DIVIDER */}
                <div className="contact-divider">
                    <span />
                    <span className="contact-heart">♡</span>
                    <span />
                </div>

                {/* TAGLINE */}
                <p className="contact-tagline">
                    {contactData.tagline}
                </p>

                {/* QR CARDS */}
                <div className="contact-cards">

                    {/* WHATSAPP */}
                    <a
                        href={contactData.whatsapp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-card"
                        aria-label="Open WhatsApp"
                    >
                        <img
                            src={contactData.whatsapp.image}
                            alt="WhatsApp QR code"
                            className="contact-qr"
                        />

                        <div className="contact-card-info">
                            <img
                                src={contactData.whatsapp.icon}
                                alt=""
                            />

                            <strong>
                                {contactData.whatsapp.username}
                            </strong>
                        </div>
                    </a>

                    {/* INSTAGRAM */}
                    <a
                        href={contactData.instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-card"
                        aria-label="Open Instagram"
                    >
                        <img
                            src={contactData.instagram.image}
                            alt="Instagram QR code"
                            className="contact-qr"
                        />

                        <div className="contact-card-info">
                            <img
                                src={contactData.instagram.icon}
                                alt=""
                            />

                            <strong>
                                {contactData.instagram.username}
                            </strong>
                        </div>
                    </a>

                    {/* TIKTOK */}
                    <a
                        href={contactData.tiktok.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-card"
                        aria-label="Open TikTok"
                    >
                        <img
                            src={contactData.tiktok.image}
                            alt="TikTok QR code"
                            className="contact-qr"
                        />

                        <div className="contact-card-info">
                            <img
                                src={contactData.tiktok.icon}
                                alt=""
                            />

                            <strong>
                                {contactData.tiktok.username}
                            </strong>
                        </div>
                    </a>

                </div>

                {/* BOOK BUTTON */}
                <a
                    href={contactData.buttonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-book-button"
                >
                    {contactData.button}
                    <span>→</span>
                </a>

            </div>

        </footer>
    );
};

export default Contact;