import React, { useEffect, useState } from 'react';
import "./GenerateMelody.css";

function GenerateMelody() {
    const [ loading, setLoading ] = useState(true);
    const [ allModels, setAllModels ] = useState([]);  // [ { name: "", desc: "" }, ... ]
    const [ activeModel, setActiveModel ] = useState(null);  // null || string
    const [ fileName, setFileName ] = useState(null);  // TODO : Input to change the file's name

    useEffect(() => {
        fetch("http://127.0.0.1:3030/api/models", { 'method': 'GET' })
        .then((res) => {
            if(res.ok) {
                res.json().then(
                    models => {
                        setAllModels(models);
                        setLoading(false);
                        setActiveModel(models[0].name);
                    }
                );
            }else setLoading(false);
        });
    }, []);

    function generateMelody(event) {
        event.preventDefault();
    
        if (!activeModel) return;
    
        const file = fileName ? `${fileName}.wav` : "out.wav";
    
        fetch(`http://127.0.0.1:3030/api/generate_melody?model=${activeModel}&t=10&name=${file}`, {
            method: "GET",
        })
        .then(async (res) => {
            if (!res.ok) throw new Error("Failed to download file");
    
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
    
            // Create a link and trigger a download
            const a = document.createElement("a");
            a.href = url;
            a.download = file;
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => console.error("Error fetching melody:", error));
    }
    

    if(loading)
    {
        return <h1>Loading</h1>;
    }else{
        return (
            <form>
                <select onChange={(e) => { setActiveModel(e.target.value) } }>
                    {
                        allModels.map((model) => <option key={model.name} value={model.name}>{model.name}</option>)
                    }
                </select>

                {activeModel &&
                    <>
                        <p>{allModels.find(model => model.name === activeModel)?.desc}</p>
                        <button onClick={generateMelody}>Generate</button>
                    </>
                }

                
            </form>
        );
    }
}

export default GenerateMelody;
