import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import image from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.image to the cards json array
  state = {
    image,
    clickedImageIds: [],
    score: 0,
    goal: 8,
    status: ""
  };

  //shuffle the pup cards in the browser when clicked
  shuffleScoreCard = id => {
    let clickedImageIds = this.state.clickedImageIds;

    if(clickedImageIds.includes(id)){
      this.setState({ clickedImageIds: [], score: 0, status:  "Game Over! You lost. Click to play again!" });
      return;
    }else{
      clickedImageIds.push(id)

      if(clickedImageIds.length === 8){
        this.setState({score: 8, status: "You Won! Wanna play again? Click!", clickedImageIds: []});
        console.log('User has won');
        return;
      }

      this.setState({ image, clickedImageIds, score: clickedImageIds.length, status: " " });

      for (let i = image.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [image[i], image[j]] = [image[j], image[i]];
      }
    }
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Clicky McClickerson Game</h1>
          <p className="App-intro">
            Woah Ho! Don't click the same image twice or you loose my dude!
          </p>
        </header>
        <Score total={this.state.score}
               goal={8}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.image.map(imageObject => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={imageObject.id}
              key={imageObject.id}
              image={imageObject.image}
            />
          ))}
        </Wrapper>
        <footer>
          <p>Built by A.J. Weber<a href="https://github.com/ajweber102/Clicky-Game" target="_blank" rel="noopener noreferrer">Check out the repo</a>.</p>
        </footer>
    </div>
    );
  }
}

export default App;