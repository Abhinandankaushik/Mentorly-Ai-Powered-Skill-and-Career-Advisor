import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts';
import { fetchCareerData } from '../utils/givedata';

// Data is mocked for demonstration purposes
const mockCareerData = {
  'Software Engineer': {
    description: 'A professional who designs, develops, and maintains software applications.',
    stats: [
      { year: 2020, students: 10000, hiring: 8000, successRate: 80 },
      { year: 2021, students: 12000, hiring: 9500, successRate: 79 },
      { year: 2022, students: 15000, hiring: 12500, successRate: 83 },
      { year: 2023, students: 18000, hiring: 15000, successRate: 83 },
      { year: 2024, students: 20000, hiring: 17000, successRate: 85 },
    ],
  },
  'Data Scientist': {
    description: 'An expert in analyzing and interpreting complex data to help organizations make better decisions.',
    stats: [
      { year: 2020, students: 5000, hiring: 4000, successRate: 80 },
      { year: 2021, students: 6500, hiring: 5500, successRate: 85 },
      { year: 2022, students: 8000, hiring: 6800, successRate: 85 },
      { year: 2023, students: 10000, hiring: 8500, successRate: 85 },
      { year: 2024, students: 12000, hiring: 10500, successRate: 88 },
    ],
  },
  'Product Manager': {
    description: 'A leader responsible for guiding the success of a product and leading the cross-functional team that is responsible for it.',
    stats: [
      { year: 2020, students: 3000, hiring: 2000, successRate: 67 },
      { year: 2021, students: 4000, hiring: 3000, successRate: 75 },
      { year: 2022, students: 5500, hiring: 4500, successRate: 82 },
      { year: 2023, students: 7000, hiring: 6000, successRate: 86 },
      { year: 2024, students: 8000, hiring: 7000, successRate: 88 },
    ],
  },
};

const Card = ({ title, value }) => (
  <div className="bg-gray-800 p-6 rounded-2xl shadow-xl transition-transform transform hover:scale-105">
    <h3 className="text-xl font-semibold text-gray-400">{title}</h3>
    <p className="mt-2 text-4xl font-bold text-teal-400">{value}</p>
  </div>
);

const Analytics = () => {
  const [selectedJob, setSelectedJob] = useState('Software Engineer');
  const jobData = mockCareerData[selectedJob];
  const params=useParams();     // params
  const career = params.career;

  const [careerData, setCareerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Use useEffect to fetch data from Gemini API when the `career` param changes
useEffect(() => {
  console.log('🔍 useEffect triggered with career:', career);
  
  const getData = async () => {
    console.log('🚀 Starting API call for:', career);
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchCareerData(career);
      console.log('✅ API response received:', data);
      
      if (data && data.stats && data.stats.length > 0) {
        setCareerData(data);
        console.log('📊 Data set successfully');
      } else {
        setError("No data available for this career. Please try a different one.");
        console.log('❌ No data in response');
      }
    } catch (err) {
      console.error('❌ API call failed:', err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      console.log('🏁 Finally block reached');
      setIsLoading(false);
    }
  };

  if (career) {
    getData();
  } else {
    console.log('⏹️ No career specified, skipping API call');
    setIsLoading(false);
  }
}, [career]);

    // Conditional rendering based on loading and error states
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center text-center p-4">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl text-red-400 mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Use optional chaining to safely access nested properties
  const stats = careerData?.stats || [];
  const description = careerData?.description || '';
  const latestStats = stats[stats.length - 1] || {};

  const chartData = jobData.stats;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-teal-400 leading-tight">Career Reality Check</h1>
          <p className="mt-4 text-lg text-gray-400">
            Statistical data and analytics for different career paths. 
          </p>
        </header>

        {/* Job Selector */}
       

         {/* Career Overview */}
        <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-200 capitalize">
            {career}
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Card title="Students Per Year" value={latestStats.students?.toLocaleString() || 'N/A'} />
          <Card title="Hiring Per Year" value={latestStats.hiring?.toLocaleString() || 'N/A'} />
          <Card title="Success Rate" value={`${latestStats.successRate || 'N/A'}%`} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Students and Hiring Chart */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-gray-300 mb-4">Students and Hiring Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis dataKey="year" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#8884d8" name="Students Per Year" />
                <Line type="monotone" dataKey="hiring" stroke="#82ca9d" name="Hiring Per Year" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Success Rate Chart */}
           <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-gray-300 mb-4">Success Rate Per Year</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis dataKey="year" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip />
                <Bar dataKey="successRate" fill="#f6ad55" name="Success Rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;