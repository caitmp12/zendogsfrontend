import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {

  //URL variable
  const url = "https://cmp-zenbackend.herokuapp.com"

  //List of Dogs State
  const [dogs, setDogs] = React.useState([])

  //Empty Dog
  const emptyDog = {
    name: "",
    age: 0, 
    img: "",
  }

  //Selected Dog State
  const [selectedDog, setSelectedDog] = React.useState(emptyDog)

  //Get List of Dogs Function
  const getDogs = () => {
    fetch(url + "/dog/")
    //response.json is not in curly brackets, so it is an implicit return
      .then((response) => response.json())
      //data is the response.json()
      .then((data) => {
        console.log(data)
        setDogs(data)
      })
  }

  //useEffect to do initial fetch of dogs
  React.useEffect(() => getDogs(), [])

  //handleCreate function for creating new dogs
  //handleCreate pushes the new dog to the API
  //form data is being passed in as (newDog)
  const handleCreate = (newDog) => {
    fetch(url + "/dog/", {
      //sending form data as a json string
      method: "post",
      //tells server what kind of data we're receiving
      //header is what you see in the network tab
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDog),
    }).then(() => {
      getDogs()
    })
  }

  //handleUpdate function for updating dogs
  const handleUpdate = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "put", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    }).then(() => {
      getDogs()
    })
  }

  const selectDog = (dog) => {
    setSelectedDog(dog)
  }

  const deleteDog = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      getDogs()
    })
  }

  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      <Link to="/create">
        <button>Add a Pupper!</button>
      </Link>
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => <Display {...rp} dogs={dogs} selectDog={selectDog} deleteDog={deleteDog} />} 
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
