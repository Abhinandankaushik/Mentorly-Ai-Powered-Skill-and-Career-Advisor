import React, { useState, useCallback, useEffect } from 'react';
import RoadmapGraph from '../components/Roadmap/RoadmapGraph.jsx';
import { generateRoadmap } from '../utils/RoadmapGenerate.js';
import ErrorMessage from '../components/Roadmap/ErrorMessage.jsx';
import RoadmapLoader from '../components/Roadmap/RoadmapLoader.jsx';
import { useParams } from 'react-router-dom';

const Roadmap = () => {
  const [careerGoal, setCareerGoal] = useState('');
  const [roadmapData, setRoadmapData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateRoadmap = useCallback(async (goal) => {
    if (!goal) return;

    setIsLoading(true);
    setError(null);
    setRoadmapData(null);
    setCareerGoal(goal);

    try {
      const data = await generateRoadmap(goal);
      if (data && data.nodes.length > 0) {
        setRoadmapData(data);
      } else {
        setError('The generated roadmap was empty. Please try a different career goal or be more specific.');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  let params = useParams();
    console.log(params.career)
  useEffect(()=>{
    let car = params.career.replace(/\+/g, " ");

    handleGenerateRoadmap(car);
  },[handleGenerateRoadmap]);

  return (
    <div className="min-h-screen bg-white text-white  flex flex-col items-center p-4 sm:p-6 lg:p-8">      
      <main className="w-full max-w-5xl flex-grow flex flex-col items-center">
        <div className="w-full flex-grow flex items-center justify-center p-4 rounded-xl bg-white border border-orange-500 shadow-2xl min-h-[60vh]">
          {isLoading && <RoadmapLoader />}
          {error && !isLoading && <ErrorMessage message={error} />}
          {roadmapData && !isLoading && !error && (
            <RoadmapGraph data={roadmapData} />
          )}
          {!isLoading && !error && !roadmapData && (
            <div className="text-center black animate-fade-in">
              <p className="text-lg mb-2">Your journey starts here.</p>
              <p>Try "Software Engineer", "Data Scientist", or "UX Designer".</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Roadmap;