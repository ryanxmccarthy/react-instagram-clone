import React from "react";
import "./App.css";

import Header from "./components/Header";
import Post from "./components/Post";

function App() {
  return (
    <div className="App">
      <Header />
      <section className="App-main">
        <Post
          nickname="Chris"
          avatar="https://picsum.photos/200"
          caption="Moving the community!"
          image="https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg"
        />
        <Post
          nickname="OG"
          avatar="https://picsum.photos/201"
          caption="Holding a mic"
          image="https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg"
        />

        {/* more posts */}
      </section>
    </div>
  );
}

export default App;
