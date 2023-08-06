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

  function handlePatternChange(e) {
    const val = e.target.value;
    if (val[val.length - 1] === "[" ) {
      startBracket.started = true;
    }
    
    if (!startBracket.started) {
      try {
        const sample = regex.sample;
        let fixedPattern = escapeRegex(e.target.value);
        try {
          setRegex((prev) => ({
            ...prev,
            output: sample.match(fixedPattern) ? sample.match(`${fixedPattern}`) : ""
          }))
          console.log(sample, fixedPattern, sample.match(fixedPattern));
        } catch (err) {
          console.log(err);
        }
        
      } catch (err) {
        console.log(err);
      }
    } else {
      startBracket.pattern = val;
      if (val[val.length - 1] === "]") {
        startBracket.started = false;
      }
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
          value={"Minim nostrud qui irure voluptate pariatur dolore dolor amet et labore anim pariatur veniam culpa. Dolor ad sint labore aute pariatur aliqua aute in commodo. Eu in nisi voluptate veniam aliqua voluptate cillum laborum excepteur magna ut laborum id. Ipsum pariatur consectetur laboris ex eu culpa laborum adipisicing irure Lorem consectetur id non occaecat. Voluptate eu enim est laboris adipisicing non amet quis. Amet excepteur Lorem magna id ipsum nulla do labore officia exercitation eiusmod."}
          ></textarea>
    </div>
  );
}

export default App;
