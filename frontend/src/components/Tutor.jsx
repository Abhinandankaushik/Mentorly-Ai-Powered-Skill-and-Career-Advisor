import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Tutor() {
  const [channelsData, setChannelsData] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loader state
  const { searchPrompt } = useParams();

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/get-your-tutor",
          {
            params: {
              youtubeSearchPrompt: searchPrompt,
            },
          }
        );
        console.log("frontend response", res);
        setChannelsData(res.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // ✅ always stop loader
      }
    };

    getdata();
  }, [searchPrompt]);

  // Sort by ranking (ascending)
  const sortedData = [...channelsData].sort(
    (a, b) => parseInt(a.ranking) - parseInt(b.ranking)
  );

  // Track which video is playing
  const [playingVideo, setPlayingVideo] = useState(null);

  
  const MarvelLoader = () => (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <div className="relative">
        <div className="w-32 h-32 border-8 border-t-red-600 border-b-blue-600 border-l-yellow-400 border-r-green-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-m font-extrabold tracking-widest animate-pulse">
            Mentorly
          </span>
        </div>
      </div>
      <p className="mt-6 text-lg animate-pulse">Loading your Tutors...</p>
    </div>
  );

  if (loading) return <MarvelLoader />; // ✅ Show loader till data comes

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-10">
        📊 Get Your Tutor
      </h1>

      <div className="flex flex-col gap-10 max-w-4xl mx-auto">
        {sortedData.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:scale-[1.01] transition duration-300"
          >
            {/* Video Section */}
            <div className="relative block aspect-video w-full bg-black">
              {playingVideo === item.videoId ? (
                <iframe
                  className="absolute inset-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1`}
                  title={item.videoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={item.videoThumbnail}
                    alt="Video Thumbnail"
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setPlayingVideo(item.videoId)}
                      className="bg-black/50 rounded-full p-4 hover:scale-110 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 22v-20l18 10-18 10z" />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h2 className="text-xl font-bold text-white mb-1">
                {item.videoTitle}
              </h2>
              <p className="text-gray-300 text-sm mb-3">
                {item.videoDescription}
              </p>

              <div className="flex items-center mb-2">
                <img
                  src={item.channelLogo}
                  alt="Channel Logo"
                  className="w-10 h-10 rounded-full border border-gray-300 mr-3"
                />
                <a
                  href={item.channelLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-md font-semibold text-blue-400 hover:underline"
                >
                  {item.channelName}
                </a>
              </div>

              <div className="flex gap-6 text-sm text-gray-300">
                <p>
                  👀 <span className="font-bold">{item.views}</span> views
                </p>
                <p>
                  🏆 Ranking:{" "}
                  <span className="font-bold text-yellow-400">
                    #{item.ranking}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
