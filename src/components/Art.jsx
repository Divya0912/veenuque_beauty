import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { artLeftLists, artRightLists } from '../../constants/index.js'

const Art = () => {

    useGSAP(() => {

        gsap.from('#art .popular li', {
            opacity: 0,
            x: -80,
            stagger: 0.15,
            scrollTrigger: {
                trigger: '#art',
                start: 'top 70%',
            }
        })

        gsap.from('#art .loved li', {
            opacity: 0,
            x: 80,
            stagger: 0.15,
            scrollTrigger: {
                trigger: '#art',
                start: 'top 70%',
            }
        })

    })

    return (
        <section id="art" className="noisy">

            <div className="list">

                {/* LEFT */}

                <div className="popular">

                    <h2>SIGNATURE MAKEUP</h2>

                    <ul>
                        {artLeftLists.map(({ name, detail, icon }) => (
                            <li key={name}>

                                <img
                                    src={icon}
                                    alt=""
                                />

                                <div>
                                    <h3>{name}</h3>
                                    <p>{detail}</p>
                                </div>

                            </li>
                        ))}
                    </ul>

                </div>


                {/* RIGHT */}

                <div className="loved">

                    <h2>BEAUTY & OCCASIONS</h2>

                    <ul>
                        {artRightLists.map(({ name, detail, icon }) => (
                            <li key={name}>

                                <div>
                                    <h3>{name}</h3>
                                    <p>{detail}</p>
                                </div>

                                <img
                                    src={icon}
                                    alt=""
                                />

                            </li>
                        ))}
                    </ul>

                </div>

            </div>

        </section>
    )
}

export default Art