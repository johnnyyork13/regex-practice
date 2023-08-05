import './App.css';
import React from 'react';

function App() {

  const [regex, setRegex] = React.useState({
    pattern: "",
    output: "",
    selected: "",
    sample: ""
  })

  const [result, setResult] = React.useState("");

  function handlePatternChange(e) {
    try {
      setRegex((prev) => ({
        ...prev,
        pattern: `/${e.target.value}/`
      }))
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

  try {
    React.useEffect(() => {
      setResult(function() {
        const checkForBrackets = new RegExp("\[.*\]")
        if (regex.sample.match(regex.pattern) !== null) {
          return regex.sample.match(regex.pattern)
        } else {
          return "";
        }

      });
    }, [regex.pattern])
  } catch {
    console.log("Error in regex");
  }



  return (
    <div className="App">
      <div className="pattern-container">
        <div className="pattern-input-container">
          <label>Pattern:
                <input className="pattern-container-input" name="pattern" onChange={handlePatternChange}></input>
          </label>
          <label>Output:
                <input className="pattern-container-output" name="output" value={result} readOnly={true}></input>  
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
