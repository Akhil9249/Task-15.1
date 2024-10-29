import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
    const [count, setCount] = useState([]);
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    
    useEffect(()=>{
        getImage()
    },[])

    const photoApload = (event) => {
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
        setImagePreview(URL.createObjectURL(event.target.files[0]));
    };

    const imageUpload = async (event) => {

        const formData = new FormData();
        formData.append("upload_file", image);
        const response = await axios("http://localhost:3001/upload", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        });

        setCount(response.data)
    };

    const getImage = async ()=>{
        const response = await axios("http://localhost:3001/");
        setCount(response.data)
    }


    return (
        <div className="App-main-container">
            <div className="App-main-container-center">
                <h3>Photo Gallery</h3>
                <p>A picture is worth thousand words</p>
                <input type="file" name="upload_file" id="fileInput" onChange={photoApload} />
                <label htmlFor="fileInput" id="customFileLabel">
                    <div className="Add-image">+</div>
                </label>

                <p>{image.name}</p>
                <button onClick={imageUpload}>ok</button>
            </div>
            <div className="App-main-container-bottom">
                {count.map((data,index)=>(
                    <img key={index} src={`http://localhost:3001/${data.url}`} alt="" />
                ))}
    
            </div>
        </div>
    );
}

export default App;
