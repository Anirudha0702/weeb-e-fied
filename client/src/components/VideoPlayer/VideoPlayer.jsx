import "./VideoPlayer.css"
import  { useEffect,useState } from 'react'
import ReactPlayer from 'react-player'
const VideoPlayer = ({url}) => {
  const [videoUrl, setVideoUrl] = useState(url);

  // Use useEffect to update the video URL when the 'url' prop changes
  useEffect(() => {
    setVideoUrl(url);
  }, [url]);
  console.log(videoUrl)
  return (

<ReactPlayer url={videoUrl}controls={true}/>
  )
}

export default VideoPlayer