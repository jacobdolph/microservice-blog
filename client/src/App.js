import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
const App = () => {
  return (
    <div className='container'>
      <h1>Create Posts</h1>
      <PostCreate />
      <hr />
      <h2>Post List</h2>
      <PostList />
    </div>
  );
};

export default App;
