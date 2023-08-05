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
            output: sample.match(fixedPattern) ? sample.match(`${fixedPattern}`) : "boob"
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
      <div className="pattern-container">
        <div className="pattern-input-container">
          <label>Pattern:
                <input className="pattern-container-input" name="pattern" onChange={handlePatternChange}></input>
          </label>
          <label>Output:
                <input className="pattern-container-output" name="output" value={regex.output} readOnly={true}></input>  
          </label> 
        </div>
        <label>Selected:
                <input className="patter-container-selected" name="selected" onChange={handleSelectedChange}></input>
        </label>
      </div>
      <textarea name="sample" onChange={handleSampleChange}></textarea>
    </div>
  );
}

export default App;
