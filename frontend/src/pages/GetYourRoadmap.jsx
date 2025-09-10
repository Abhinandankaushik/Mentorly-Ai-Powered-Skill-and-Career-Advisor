import AIInputComponent from '../components/Aiinput'
import Chat from '../components/Chat'
import HeroSection from '../components/HeroSectionInput'
import Response from '../components/Response'
import ResponseComponent from '../components/ResponseComponent'
import SuccessStories from '../components/SuccessStory'
import useResponseStore from "../store/responsestore"


const GetYourRoadmap = () => {

  const { response } = useResponseStore();
  const hasResponse = response?.length > 0;
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white  overflow-hidden flex items-center justify-center">
      <div className={`flex flex-col ${hasResponse?"md:flex-row":""} gap-4 transition-all duration-500 ease-in-out w-full max-w-7xl`}>
        {/* Left side: Hero, Success Stories, AI Input */}
        <div
          className={`flex flex-col gap-4 transition-all duration-500 ease-in-out ${
            hasResponse ? 'md:w-1/2' : 'md:w-full'
          }`}
        >
          <HeroSection />
          <SuccessStories />
          <AIInputComponent />
        </div>

        {/* Right side: Chat Panel */}
        <div
          className={`
            md:w-1/2
            flex flex-col gap-4 mt-4
            transform transition-all duration-500 ease-in-out
            ${hasResponse ? 'opacity-100 translate-x-0' : 'opacity-0 md:translate-x-full'}
          `}
        >
          <Chat prompts={response} />
        </div>
      </div>
    </div>
  )
}

export default GetYourRoadmap