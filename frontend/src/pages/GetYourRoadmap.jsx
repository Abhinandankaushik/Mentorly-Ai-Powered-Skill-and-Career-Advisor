import { useEffect } from 'react'
import AIInputComponent from '../components/Aiinput'
import Chat from '../components/ChatComponets/Chat'
import HeroSection from '../components/Home/HeroSectionInput'
import SuccessStories from '../components/SuccessStory'
import useStore from "../store/responsestore"

const GetYourRoadmap = () => {
  const { questions } = useStore();
  const hasResponse = questions?.length > 0;

  // Force scroll to top when component mounts
  

  return (
    <div className="w-full bg-gray-50 overflow-hidden text-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className={`flex flex-col ${hasResponse ? "lg:flex-row" : ""} gap-6 transition-all duration-500 ease-in-out`}>
          {/* Left side: Hero, Success Stories, AI Input */}
          <div
            className={`flex flex-col gap-6 transition-all duration-500 ease-in-out ${
              hasResponse ? 'lg:w-1/2' : 'w-full'
            }`}
          >
            <HeroSection />
            <SuccessStories />
            <div className="flex justify-center">
              <AIInputComponent />
            </div>
          </div>

          {/* Right side: Chat Panel */}
          {hasResponse && (
            <div className="lg:w-1/2 flex flex-col gap-4 mt-4 transform transition-all duration-500 ease-in-out">
              <Chat />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GetYourRoadmap