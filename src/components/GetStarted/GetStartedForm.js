import React, { useState } from 'react';
import "./GetStartedForm.css";

function GetStartedForm() {
  const [audioFiles, setAudioFiles] = useState([]);
  const [generatedMelody, setGeneratedMelody] = useState(null);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(60); 

  const handleAudioUpload = (e) => {
    const files = Array.from(e.target.files);
    setAudioFiles(files);
  };

  const handleGenerateMelody = async () => {
    if (audioFiles.length === 0) {
      alert("Please upload audio files first!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:3030/api/generate-melody?t=${duration}`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedMelody(data.melodyUrl);
      } else {

        alert("Error generating melody. Please try again.");
      }
    } catch (error) {
      
      alert("Error generating melody. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="get-started-form">
      <div className="form-container">
        <h1>Get Started with Your Audio Creation</h1>

        <div className="audio-upload">
          <label htmlFor="audio-files">Upload Your Audio Files:</label>
          <input
            type="file"
            id="audio-files"
            accept="audio/*"
            multiple
            onChange={handleAudioUpload}
          />
          <div className="audio-list">
            {audioFiles.length > 0 && (
              <ul>
                {audioFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="duration-selector">
          <label>Melody Duration (seconds):</label>
          <input
            type="number"
            min="10"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>

        <button
          className="generate-btn"
          onClick={handleGenerateMelody}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Melody"}
        </button>

        {generatedMelody && (
          <div className="generated-melody">
            <h2>Your Generated Melody:</h2>
            <audio controls>
              <source src={generatedMelody} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetStartedForm;
