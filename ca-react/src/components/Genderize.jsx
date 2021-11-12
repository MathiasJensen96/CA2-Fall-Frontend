import React, {useState, useEffect} from "react";


function Genderize (props){

  
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [probability, setProbability] = useState("");


  const changeName = (event) => {
    console.log(event.target.value)
    setName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://api.genderize.io/?name=` + name)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setGender(data.gender)
        setProbability(data.probability)
      })
  }

    return (
        <div>
          <h2>Genderize</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={name} onChange={changeName}/>
            </label>
            <button type="submit">Submit</button>
          </form>
          <p>{name}</p>
          <p>{gender}</p>
          <p>{probability}</p>
        </div>
      );
}

export default Genderize;