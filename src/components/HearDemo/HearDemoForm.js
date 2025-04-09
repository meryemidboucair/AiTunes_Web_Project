import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaStop, FaRedo } from "react-icons/fa";
import "./HearDemoForm.css";

function HearDemoForm() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioFiles, setAudioFiles] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(new Audio());
  const progressRef = useRef(null);
  
  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3030/api/list_demo");
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        setAudioFiles(data.audios);
        
        if (data.audios.length > 0) {
          setSelectedAudio(`http://localhost:3030/api/download_demo?id=0`);
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load audio files");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAudioFiles();
  }, []);

  // Handle audio playback
  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      if (progressRef.current) {
        progressRef.current.style.width = `${(audio.currentTime / audioDuration) * 100}%`;
      }
    };

    const handleLoadedData = () => {
      setAudioDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setIsPlaying(false);
      setError("Error playing audio");
    };

    if (selectedAudio) {
      audio.src = selectedAudio;
      audio.load();

      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', handleLoadedData);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);
    }

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedData);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [selectedAudio, audioDuration]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => {
        console.error("Playback failed:", err);
        setError("Playback failed");
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    if (!isPlaying) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Restart failed:", err));
    }
  };

  const handleStop = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  const handleAudioSelection = (event) => {
    const selectedIndex = event.target.value;
    if (selectedIndex >= 0 && selectedIndex < audioFiles.length) {
      setSelectedAudio(`http://localhost:3030/api/download_demo?id=${selectedIndex}`);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  if (isLoading) {
    return (
      <div className="hear-demo-page">
        <div className="hear-demo-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hear-demo-page">
        <div className="hear-demo-container">
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`hear-demo-page ${isPlaying ? "audio-playing" : "audio-paused"}`}>
      <div className="music-icon-container">
        <div className="music-icon">♪</div>
      </div>
      
      <div className="hear-demo-container">
        <h1>Hear Demo</h1>

        {audioFiles.length === 0 ? (
          <p className="no-audio-message">No audio files available</p>
        ) : (
          <>
            <div className="audio-file-picker">
              <select 
                onChange={handleAudioSelection}
                value={audioFiles.findIndex(file => selectedAudio.includes(file))}
                disabled={isPlaying}
              >
                <option value={-1}>Select an audio file</option>
                {audioFiles.map((audio, index) => (
                  <option key={index} value={index}>
                    {audio}
                  </option>
                ))}
              </select>
            </div>

            <div className="audio-progress">
              <div className="progress-bar" ref={progressRef}></div>
            </div>

            <div className="audio-duration">
              {formatTime(currentTime)} / {formatTime(audioDuration)}
            </div>

            <div className="audio-controls">
              <button 
                onClick={handlePlayPause} 
                disabled={!selectedAudio}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button 
                onClick={handleStop} 
                disabled={!selectedAudio}
                aria-label="Stop"
              >
                <FaStop />
              </button>
              <button 
                onClick={handleRestart} 
                disabled={!selectedAudio}
                aria-label="Restart"
              >
                <FaRedo />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HearDemoForm;