import './App.css';
import React from 'react';

let startBracket = {
  started: false,
  pattern: ""
}

function App() {

  const [regex, setRegex] = React.useState({
    pattern: "",
    output: "",
    selected: "",
    sample: ""
  })

  function escapeRegex(string) {
    return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  function interpretValue(val) {
    try {
      return regex.sample.match(val)
    } catch (err) {
      console.log("Error"); 
      return "";
    }
  }

  function handlePatternChange(e) {
      try {
        setRegex((prev) => ({
          ...prev,
          output: interpretValue(e.target.value)
        }))
        //console.log(sample, fixedPattern, sample.match(fixedPattern));
      } catch (err) {
        console.log(err);
      }
        
  }

  function handleSelectedChange(e) {
    setRegex((prev) => ({
      ...prev,
      selected: e.target.value
    }))
  }

  function handleSampleChange(e) {
    setRegex((prev) => ({
      ...prev,
      sample: e.target.value
    }))
  }

  console.log("Value is: ", regex.output ? regex.output[0] : null);

  return (
    <div className="App">
      <h1>Regex Pattern Configuration</h1>
      <div className="pattern-container">
        <div className="pattern-input-container">
          <label>Pattern:
                <input className="pattern-container-input" name="pattern" onChange={handlePatternChange}></input>
          </label>
          <label>Output:
                <input className="pattern-container-input" name="output" value={regex.output} readOnly={true}></input>  
          </label> 
        </div>
        {/* <label>Selected:
                <input className="patter-container-selected" name="selected" onChange={handleSelectedChange}></input>
        </label> */}
      </div>
      <textarea 
          name="sample" 
          onChange={handleSampleChange}
          onLoad={handleSampleChange}
          ></textarea>
    </div>
  );
}

export default App;
