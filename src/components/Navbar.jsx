import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { navLinks } from '../../constants/index.js';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const menuTimeline = useRef(null);

    // Scroll trigger & desktop underline hover animations
    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: 'bottom top',
            },
        });

        navTween.fromTo(
            'nav',
            { backgroundColor: 'transparent' },
            {
                backgroundColor: '#00000080',
                backdropFilter: 'blur(12px)',
                duration: 0.8,
                ease: 'power1.inOut',
            }
        );

        // Underline hover for desktop links only
        const desktopLinks = gsap.utils.toArray('.desktop-nav li a');

        desktopLinks.forEach((link) => {
            const underline = document.createElement('span');
            underline.className = 'nav-hover-line';
            link.appendChild(underline);

            gsap.set(underline, {
                scaleX: 0,
                transformOrigin: 'left center',
            });

            link.addEventListener('mouseenter', () => {
                gsap.to(link, { y: -2, duration: 0.3, ease: 'power2.out' });
                gsap.to(underline, { scaleX: 1, duration: 0.45, ease: 'power3.out' });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, { y: 0, duration: 0.3, ease: 'power2.out' });
                gsap.to(underline, { scaleX: 0, duration: 0.3, ease: 'power2.in' });
            });
        });
    }, { scope: navRef });

    // Mobile menu open / close GSAP timeline
    useGSAP(() => {
        if (!mobileMenuRef.current) return;

        menuTimeline.current = gsap.timeline({ paused: true })
            .to(mobileMenuRef.current, {
                autoAlpha: 1,
                y: 0,
                duration: 0.4,
                ease: 'power3.out',
            })
            .fromTo(
                '.mobile-link-item',
                { y: 24, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.35,
                    ease: 'power2.out',
                },
                '-=0.2'
            );
    }, { scope: navRef });

    const toggleMenu = () => {
        const nextState = !isOpen;
        setIsOpen(nextState);

        if (nextState) {
            menuTimeline.current?.play();
            document.body.style.overflow = 'hidden';
        } else {
            menuTimeline.current?.reverse();
            document.body.style.overflow = 'auto';
        }
    };

    const handleLinkClick = () => {
        if (isOpen) {
            setIsOpen(false);
            menuTimeline.current?.reverse();
            document.body.style.overflow = 'auto';
        }
    };

    return (
        <nav ref={navRef}>
            <div className="navbar-container">

                {/* LOGO + BRAND */}
                <a href="#home" className="brand" onClick={handleLinkClick}>
                    <img
                        src="/images/logo.png"
                        alt="VEENUQUE BEAUTY"
                    />
                    <p>VEENUQUE BEAUTY</p>
                </a>

                {/* DESKTOP NAV LINKS (hidden on mobile) */}
                <ul className="desktop-nav hidden md:flex">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`}>
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* HAMBURGER BUTTON (visible only on mobile) */}
                <button
                    type="button"
                    className="hamburger-btn md:hidden"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                >
                    <span className={`burger-line ${isOpen ? 'open-top' : ''}`} />
                    <span className={`burger-line ${isOpen ? 'open-mid' : ''}`} />
                    <span className={`burger-line ${isOpen ? 'open-bot' : ''}`} />
                </button>

            </div>

            {/* MOBILE FULLSCREEN MENU */}
            <div
                ref={mobileMenuRef}
                className="mobile-menu-overlay"
                style={{ visibility: 'hidden', opacity: 0, transform: 'translateY(-10px)' }}
            >
                <ul className="mobile-nav-list">
                    {navLinks.map((link) => (
                        <li key={link.id} className="mobile-link-item">
                            <a
                                href={`#${link.id}`}
                                onClick={handleLinkClick}
                            >
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="mobile-menu-footer">
                    <p>© VEENUQUE BEAUTY</p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
