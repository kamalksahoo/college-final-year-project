import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [pneumonia, setPneumonia] = useState(false);
  const [normal, setNormal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = async (e) => {
    
    setPneumonia(false);
    setNormal(false);
    setLoading(true);

    const formData = new FormData();
    formData.set("imagefile", e.target.files[0]);

    fetch("http://localhost:5000/RequestImageWithMetadata", {
      method: "POST",
      headers: {
        Accept: "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data)
        //console.log(parseFloat(data.result))

        if (parseFloat(data.result) > 0.5) {
          console.log("pneumonia");
          setLoading(false);
          setPneumonia(true);
          setNormal(false);
        } else {
          console.log("normal");
          setLoading(false);
          setPneumonia(false);
          setNormal(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Pneumonia detector</p>
        {pneumonia ? <p>RESULT : PNEUMONIA </p> : ""}
        {normal ? <p>RESULT : Congrats ! It's Normal</p> : ""}
        {loading ? <p>Loading .... please wait </p> : ""}

        <form>
          <input
            onChange={onChangeHandler}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </form>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          X-ray
        </a>
      </header>
    </div>
  );
}

export default App;
