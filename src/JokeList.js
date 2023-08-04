import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

function JokeList({ numJokesToGet = 5 }) {
  const [jokesList, setJokesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /* retrieve jokes from API */
    async function getJokes() {
      try {
        // load jokes one at a time, adding not-yet-seen jokes
        let jokes = [...jokesList];
        let seenJokes = new Set();

        while (jokes.length < numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          
          let { ...joke } = res.data;
  
          if (!seenJokes.has(joke.id)) {
            seenJokes.add(joke.id);
            jokes.push({ ...joke, votes: 0 });
          } else {
            console.log("duplicate found!");
          }
        }
        
        setJokesList(jokes);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    if(jokesList.length === 0) {
      getJokes();
    } 
    
  }, [jokesList])

  /* change vote for this id by delta (+1 or -1) */
  function vote(id, delta) {
    setJokesList(allJokes =>
      allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    );
  }

  function generateNewJokes(){
    setJokesList([]);
    setIsLoading(true);
  }

  /* render: either loading spinner or list of sorted jokes. */
  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    )
  }

  let sortedJokes = [...jokesList].sort((a, b) => b.votes - a.votes);

  return (
    <div className="JokeList">
      <div className="JokeList-getmore-container">
        <button
          className="JokeList-getmore"
          onClick={generateNewJokes}
        >
          Get New Jokes
        </button>
      </div>
      {sortedJokes.map(j => (
        <Joke
          text={j.joke}
          key={j.id}
          id={j.id}
          votes={j.votes}
          vote={vote}
        />
      ))}
    </div>
  );
}

export default JokeList;
