from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
from scipy.io.wavfile import write
import os

app = Flask(__name__)
CORS(app)  

UPLOAD_FOLDER = "uploads"
OUTPUT_DIR = "Generated_Melodies"
OUTPUT_WAV_PATH = os.path.join(OUTPUT_DIR, "generated_melody.wav")


@app.route("/api/generate-melody", methods=["POST"])

def generate_melody():
    duration = int(request.args.get('t', 60))  
    sample_rate = 44100 

    freq = 440.0  

    t = np.linspace(0., duration, int(sample_rate * duration))
    signal = 0.5 * np.sin(2. * np.pi * freq * t)

    output_wav_path = os.path.join(OUTPUT_DIR, f"generated_melody_{duration}s.wav")
    write(output_wav_path, sample_rate, signal.astype(np.float32))

    return jsonify({"melodyUrl": f"http://127.0.0.1:5000/download-melody?file={output_wav_path}"})


@app.route("/download-melody", methods=["GET"])
def download_melody():
    if os.path.exists(OUTPUT_WAV_PATH):
        return send_file(OUTPUT_WAV_PATH, as_attachment=True)
    

@app.route("/api/list-audios", methods=["GET"])
def list_audios():
    files = os.listdir(OUTPUT_DIR)
    audio_files = [file for file in files if file.endswith(".wav")]
    return jsonify({"audios": audio_files})


if __name__ == "__main__":
    app.run(debug=True, port=3030)
