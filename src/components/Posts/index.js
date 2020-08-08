import React, { Component } from "react";
import "./Posts.css";
import gql from "graphql-tag";
import Post from "../Post";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }

  return (
    <Query
      query={gql`
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
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading Posts...</p>;
        if (error) return <p>Error Fetching Posts...</p>;
        let posts = data.posts;

        return (
          <div className="Posts">
            {posts.map((post) => (
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
      }}
    </Query>
  );
};

export default Posts;
