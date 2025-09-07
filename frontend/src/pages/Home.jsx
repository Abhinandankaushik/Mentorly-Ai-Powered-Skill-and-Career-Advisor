import React, { use } from "react";
import NavBar from "../components/NavBar";
import FloatingCards from "../components/FloatingCards";
import SplitText from "../components/SplitText";
import GetYourRoadmap from "./GetYourRoadmap";
import { useNavigate } from "react-router-dom";



const handleAnimationComplete = () => {
    console.log('All letters have animated!');
};
const Home = () => {

    const navigateToChat = useNavigate();
    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <NavBar />

            <div className="h-72 mt-20 w-full flex items-center justify-center ">
                <SplitText
                    text="Confusion To Clarity"
                    className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-blue-900 text-center"
                    delay={100}
                    duration={0.5}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-10px"
                    textAlign="center"
                    onLetterAnimationComplete={handleAnimationComplete}
                />
            </div>
            <p className="text-blue-900">Your Personalized skill and carrer advisor</p>


            {/* Page Content with padding so it doesn’t clash */}
            <main className="pt-10 px-4 md:px-8">
                <FloatingCards />
            </main>

            <button
                onClick={() => navigateToChat('/chat')}
                className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-lg shadow-md hover:bg-blue-700 hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
                Click here
            </button>



        </div>
    );
};

export default Home;
