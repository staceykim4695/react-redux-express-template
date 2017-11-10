import React from 'react';
import NewPost from './NewPost';

class Feed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NewPost />
      </div>
    );
  }
};

export default Feed;
