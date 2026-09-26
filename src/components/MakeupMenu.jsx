import { makeupCategories } from "../../constants/index.js";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const MakeupMenu = () => {
    const contentRef = useRef(null);

    // CATEGORY
    const [currentIndex, setCurrentIndex] = useState(0);

    // IMAGE INSIDE CURRENT CATEGORY
    const [imageIndex, setImageIndex] = useState(0);

    const totalCategories = makeupCategories.length;

    const currentCategory = makeupCategories[currentIndex];

    const images = currentCategory.images || [];

    const totalImages = images.length;

    const goToCategory = (index) => {
        const newIndex =
            (index + totalCategories) % totalCategories;

        setCurrentIndex(newIndex);

        // Always start new category from first image
        setImageIndex(0);
    };

    const goToImage = (index) => {
        if (totalImages === 0) return;

        const newImageIndex =
            (index + totalImages) % totalImages;

        setImageIndex(newImageIndex);
    };

    const prevCategory =
        makeupCategories[
        (currentIndex - 1 + totalCategories) %
        totalCategories
            ];

    const nextCategory =
        makeupCategories[
        (currentIndex + 1) % totalCategories
            ];

    useGSAP(() => {
        gsap.fromTo(
            "#title",
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 0.8,
            }
        );

        gsap.fromTo(
            ".makeup img.main-makeup-image",
            {
                opacity: 0,
                xPercent: -30,
            },
            {
                xPercent: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power1.inOut",
            }
        );

        gsap.fromTo(
            ".makeup-details h2",
            {
                yPercent: 50,
                opacity: 0,
            },
            {
                yPercent: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power1.inOut",
            }
        );

        gsap.fromTo(
            ".makeup-details p",
            {
                yPercent: 30,
                opacity: 0,
            },
            {
                yPercent: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power1.inOut",
            }
        );
    }, [currentIndex, imageIndex]);

    return (
        <section
            id="makeup-menu"
            aria-labelledby="makeup-menu-heading"
        >

            <h2
                id="makeup-menu-heading"
                className="sr-only"
            >
                Makeup Menu
            </h2>

            {/* CATEGORY NAVIGATION */}

            <nav
                className="makeup-tabs"
                aria-label="Makeup Categories"
            >
                {makeupCategories.map(
                    (category, index) => (
                        <button
                            key={category.id}
                            type="button"
                            className={
                                index === currentIndex
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                goToCategory(index)
                            }
                        >
                            {category.name}
                        </button>
                    )
                )}
            </nav>


            {/* MAIN CONTENT */}

            <div
                className="makeup-content"
                ref={contentRef}
            >

                {/* LEFT ARROW */}

                <button
                    type="button"
                    className="makeup-arrow makeup-arrow-left"
                    onClick={() => {

                        if (totalImages > 0 && imageIndex > 0) {
                            // Go to previous image inside this category
                            goToImage(imageIndex - 1);
                        } else {
                            // Already on first image -> previous category
                            goToCategory(
                                currentIndex - 1
                            );
                        }

                    }}
                    aria-label={
                        totalImages > 1
                            ? "Previous image"
                            : `Previous category: ${prevCategory.name}`
                    }
                >

                    <span>
                        {totalImages > 1
                            ? currentCategory.name
                            : prevCategory.name}
                    </span>

                    <img
                        src="/images/arrow-r.png"
                        alt=""
                        aria-hidden="true"
                    />

                </button>


                {/* CENTER IMAGE */}

                <div className="makeup">

                    {totalImages > 0 ? (

                        <img
                            key={`${currentCategory.id}-${imageIndex}`}
                            src={images[imageIndex]}
                            alt={`${currentCategory.name} ${imageIndex + 1}`}
                            className="main-makeup-image"
                        />

                    ) : (

                        <div className="makeup-coming-soon">

                            <span>
                                COMING
                            </span>

                            <strong>
                                SOON
                            </strong>

                        </div>

                    )}

                </div>


                {/* RIGHT ARROW */}

                <button
                    type="button"
                    className="makeup-arrow makeup-arrow-right"
                    onClick={() => {

                        if (
                            totalImages > 0 &&
                            imageIndex < totalImages - 1
                        ) {
                            // Go to next image inside this category
                            goToImage(imageIndex + 1);
                        } else {
                            // Already on last image -> next category
                            goToCategory(
                                currentIndex + 1
                            );
                        }

                    }}
                    aria-label={
                        totalImages > 1
                            ? "Next image"
                            : `Next category: ${nextCategory.name}`
                    }
                >

                    <img
                        src="/images/arrow-l.png"
                        alt=""
                        aria-hidden="true"
                    />

                    <span>
                        {totalImages > 1
                            ? currentCategory.name
                            : nextCategory.name}
                    </span>

                </button>


                {/* BOTTOM */}

                <div className="makeup-recipe">

                    <div className="makeup-info">

                        <p>
                            MAKEUP CATEGORY
                        </p>

                        <p id="title">
                            {currentCategory.name}
                        </p>

                    </div>


                    <div className="makeup-details">

                        <h2>
                            {currentCategory.title}
                        </h2>

                        <p>
                            {currentCategory.description}
                        </p>

                    </div>

                </div>


                {/* LEFT POWDER */}

                <img
                    src="/images/powders.png"
                    alt=""
                    aria-hidden="true"
                    className="makeup-left-decoration"
                />


                {/* RIGHT LIPSTICK */}

                <img
                    src="/images/liguid.png"
                    alt=""
                    aria-hidden="true"
                    className="makeup-right-decoration"
                />

            </div>

        </section>
    );
};

export default MakeupMenu;