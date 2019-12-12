import React, { Component } from "react";
import Card from "./components/playingcards";
import Wrapper from "./components/wrapper";
import Score from "./components/score";
import BrBa from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.BrBa to the cards json array
  state = {
    BrBa,
    clickedBrBaIds: [],
    score: 0,
    goal: 10,
    status: ""
  };

  //shuffle the character cards in the browser when clicked
  shuffleScoreCard = id => {
    let clickedBrBaIds = this.state.clickedBrBaIds;

    if(clickedBrBaIds.includes(id)){
      this.setState({ clickedBrBaIds: [], score: 0, status:  "Game Over. You lost. Click to play again." });
      return;
    }else{
      clickedBrBaIds.push(id)

      if(clickedBrBaIds.length === 10){
        this.setState({score: 10, status: "You Won! Click to play again!", clickedBrBaIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ BrBa, clickedBrBaIds, score: clickedBrBaIds.length, status: " " });

      for (let i = BrBa.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [BrBa[i], BrBa[j]] = [BrBa[j], BrBa[i]];
      }
    }
  }

  // Map over this.state.cards and render a Card component for each card
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Clickster</h1>
          <p className="App-intro">
            Try not to click the same image twice!
          </p>
        </header>
        <Score total={this.state.score}
               goal={10}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.BrBa.map(Character => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={Character.id}
              key={Character.id}
              image={Character.image}
            />
          ))}
        </Wrapper>
        <footer>
          <a href="https://cannon27528.github.io/Clicky-Game/" target="_blank" rel="noopener noreferrer"> here</a>.
        </footer>
    </div>
    );
  }
}

export default App;
