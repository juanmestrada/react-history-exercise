import React from "react";
import "./Joke.css";

/** A single joke, along with vote up/down buttons. */

function Joke({ id, vote, votes, text }) {
  function handleUpVote() {
    vote(id, +1);
  }
  function handleDownVote() {
    vote(id, -1);
  }
  return (
    <div className="Joke">
      <div className="Joke-container">
        <div className="Joke-text">{text}</div>
        <div className="Joke-votearea">
          <button className="upvote" onClick={handleUpVote}>
            <i className="fas fw fa-thumbs-up" />
          </button>
          {votes}
          <button className="downvote" onClick={handleDownVote}>
            <i className="fas fw fa-thumbs-down" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Joke;