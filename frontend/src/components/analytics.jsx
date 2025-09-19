import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts';
import { fetchCareerData } from '../utils/givedata';

// Data is mocked for demonstration purposes


const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl">
    <h3 className="text-xl font-semibold text-gray-600">{title}</h3>
    <p className="mt-2 text-4xl font-bold text-orange-500">{value}</p>
  </div>
);

const Analytics = () => {
  //const [selectedJob, setSelectedJob] = useState('Software Engineer');
  //const jobData = mockCareerData[selectedJob];
  const params=useParams();     // params
  let career = params.career;
  career = params.career.replace(/\+/g, " ");

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
      <div className="min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center">
        <div className="text-2xl font-bold animate-pulse text-orange-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center text-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-xl text-red-500 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Use optional chaining to safely access nested properties
  const stats = careerData?.stats || [];
  const description = careerData?.description || '';
  const latestStats = stats[stats.length - 1] || {};

  //const chartData = jobData.stats;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-orange-500 leading-tight">Career Reality Check</h1>
          <p className="mt-4 text-lg text-gray-600">
            Statistical data and analytics for different career paths. 
          </p>
        </header>

        {/* Job Selector */}
       

         {/* Career Overview */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 capitalize">
            {career}
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
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
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Students and Hiring Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#f97316" name="Students Per Year" strokeWidth={3} />
                <Line type="monotone" dataKey="hiring" stroke="#fb923c" name="Hiring Per Year" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Success Rate Chart */}
           <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Success Rate Per Year</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="successRate" fill="#f97316" name="Success Rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;