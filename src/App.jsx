import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Art from "./components/Art";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import MakeupMenu from "./components/MakeupMenu";
import Certificate from "./components/Certificate.jsx";
import Contact from "./components/Contact.jsx";


gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
    return (
        <main>
            <Navbar />
            <Hero />
            <Art />
            <About />
            <Portfolio/>
            <MakeupMenu/>
            <Certificate/>
            <Contact/>
        </main>
    );
};

export default App;