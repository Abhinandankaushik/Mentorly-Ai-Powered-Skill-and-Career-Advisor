import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const getYoutubeData = async (req, res) => {
  const { youtubeSearchPrompt } = req.query;
  console.log(youtubeSearchPrompt);

  try {
    // Search request
    const Axiosresponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${youtubeSearchPrompt}&type=video&key=${process.env.YOUTUBE_API}`
    );

    // Map results with async fetches
    const formattedData = await Promise.all(
      Axiosresponse.data.items.map(async (data, index) => {
        // Channel details
        const channelRes = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${data.snippet.channelId}&key=${process.env.YOUTUBE_API}`
        );
        const channelLogo = channelRes.data.items[0].snippet.thumbnails.high.url;
        const channelName = data.snippet.channelTitle;

        // Video details (views + stats)
        const videoRes = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${data.id.videoId}&key=${process.env.YOUTUBE_API}`
        );
        const views = videoRes.data.items[0].statistics.viewCount;
        const ranking = index+1;

        // Format final data
        return {
          channelName,
          channelLogo,
          channelLink: `https://www.youtube.com/watch?v=${data.id.videoId}`,
          videoId: data.id.videoId,
          videoThumbnail: data.snippet.thumbnails.high.url,
          videoTitle: data.snippet.title,
          ranking,
          views,
          videoDescription: data.snippet.description,
        };
      })
    );

    res.status(200).json({
      data: formattedData,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(400).json({
      error: error.response?.data || error.message,
      message: "Something wrong in youtubeVideo.js in backend",
    });
  }
};
