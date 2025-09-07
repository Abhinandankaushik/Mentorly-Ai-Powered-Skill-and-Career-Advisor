import AIInputComponent from '../components/Aiinput'
import HeroSection from '../components/HeroSectionInput'
import ResponseComponent from '../components/ResponseComponent'
import SuccessStories from '../components/SuccessStory'
import useResponseStore from "../store/responsestore"


const GetYourRoadmap = () => {

  const { response } = useResponseStore();
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-4">
     
      {response?.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-4">

          <div className="md:w-1/2 flex flex-col gap-4">
            <HeroSection />
            <SuccessStories />
            <AIInputComponent />
          </div>


          <div className="md:w-1/2 flex flex-col gap-4">
            <ResponseComponent />
          </div>
        </div>
      ) : (

        <div className="flex flex-col gap-4">
          <HeroSection />
          <SuccessStories />
          <AIInputComponent />
        </div>
      )}

      
    </div>
  )
}

export default GetYourRoadmap