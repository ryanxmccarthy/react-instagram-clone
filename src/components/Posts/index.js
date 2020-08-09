import React, { Component } from "react";
import "./Posts.css";
import gql from "graphql-tag";
import Post from "../Post";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    Notification.requestPermission();

    if (!navigator.onLine) {
      this.setState({ posts: JSON.parse(localStorage.getItem("posts")) });
    } else {
      this.props.apollo_client
        .query({
          query: gql`
            {
              posts(user_id: "a") {
                id
                user {
                  nickname
                  avatar
                }
                image
                caption
              }
            }
          `,
        })
        .then((response) => {
          this.setState({ posts: response.data.posts });
        });
    }

    this.posts_channel = this.props.pusher.subscribe("posts-channel");

    this.posts_channel.bind(
      "new-post",
      (data) => {
        this.setState({ posts: this.state.posts.concat(data.post) });

        if (Notification.permission === "granted") {
          try {
            // notify user of new post
            let notification = new Notification("Pusher Instagram Clone", {
              body: `New post from ${data.post.user.nickname}`,
              icon: "https://img.stackshare.io/service/115/Pusher_logo.png",
              image: `${data.post.image}`,
            });
            // open the website when the notification is clicked
            notification.onclick = function (event) {
              window.open("http://localhost:3000", "_blank");
            };
          } catch (e) {
            console.log("Error displaying notification");
          }
        }
      },
      this
    );
  }

  render() {
    return (
      <div className="Posts">
        {this.state.posts.map((post) => (
          <Post
            nickname={post.user.nickname}
            avatar={post.user.avatar}
            image={post.image}
            caption={post.caption}
            key={post.id}
          />
        ))}
      </div>
    );
  }
}

export default Posts;
