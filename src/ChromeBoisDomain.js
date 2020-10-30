import React from 'react';
import ToyHeader from './ToyHeader.js'
import ToyForm from './ToyForm.js'
import ToysContainer from './ToysContainer.js'

export default class App extends React.Component {
  state = {
    toysArray: []
  }

  componentDidMount() {
   fetch('http://localhost:3000/toys')
   .then(res => res.json())
   .then(severData => this.setState({toysArray: severData}))
  }

  addLike = (e) => {
    // need a conditinal data-toyname == obj.name do this 
    // else return obj
    let toyName = e.target.dataset.toyname;

    this.setState((preState) => {
      return (
        { 
          toysArray: preState.toysArray.map( toyObj => {
            if(toyObj.name === toyName){
              return {...toyObj, likes: toyObj.likes + 1 }
            } else {
              return toyObj
            }
          })
        }
      )
    }, () => console.log(this.state))
    // console.log(e.target)
  }

  addNewToy = (newToy) => {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(newToy)
    })
    .then(res => res.json())
    .then(toy => this.setState(
      (preState) => {
        return {toysArray: [...preState.toysArray, toy]}
      }, 
      () => console.log(this.state.toysArray)
    ))
  }

  render() {
    return (
      <div className="Main">
        <ToyHeader />
        <ToyForm addToyToToyArr={this.addNewToy} />
        <ToysContainer 
          toysArray={this.state.toysArray} 
          addLikeFn={this.addLike}
        />
      </div>
    )}
}