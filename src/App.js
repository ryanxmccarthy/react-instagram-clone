import React from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//components
import Header from "./components/Header";
import Post from "./components/Post";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <section className="App-main">
          <Post
            nickname="ryanxvx"
            avatar="https://picsum.photos/200"
            caption="Enjoying the great outdoors!"
            image={require("./assets/images/IMG_8567.JPG")}
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
    </ApolloProvider>
  );
}

export default App;
