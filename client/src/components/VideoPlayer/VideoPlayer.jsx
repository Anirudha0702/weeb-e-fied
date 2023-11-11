import "./VideoPlayer.css";
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

const VideoPlayer = ({url,width,height}) => {
  const [videoUrl, setVideoUrl] = useState(url);
  useEffect(() => {
    setVideoUrl(url);
  }, [url]);
  const style={
    position:"absolute",
    width:"100%",
    height:"100%"
  }
  return (
    <ReactPlayer url={videoUrl} controls={true} width={width} height={height}/>
  )
}

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default VideoPlayer