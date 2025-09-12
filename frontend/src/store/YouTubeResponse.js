import { create } from "zustand";
import axios from 'axios'
const YouTubeResponse = create((set, get) => ({
    youtubeVideos: [],

    getAllYoutubeVideo: async (searchPrompt) => {
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxRes
            ults=5&q=react%20develper&type=video&key=${import.meta.env.VITE_APP_YOUTUBE_API}`)
            console.log(res)
        set(() => ({
           youtubeVideos: res.data.items,
        }))
        console.log(get().youtubeVideos)
    }


}));

export default YouTubeResponse;
