
import { useParams } from "react-router-dom";
import YouTubeResponse from '../store/YouTubeResponse'
import { useEffect } from "react";
const Tutor = () => {

    const params = useParams();
    const prompt = params.searchPrompt;
    const { getAllYoutubeVideo, youtubeVideos } = YouTubeResponse();

    useEffect(() => {
        getAllYoutubeVideo(prompt);
    }, [])

    return (
        <div>

            {youtubeVideos.length > 0 ? <div> Empty </div> : <div> </div>}
        </div>
    );
};

export default Tutor;
