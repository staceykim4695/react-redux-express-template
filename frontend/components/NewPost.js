import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class NewPost extends React.Component {
    constructor(props) {
        super(props);
    }

    // handleNewPost() {
    //   if (!req.user) {
    //
    //   } else {
    //     this.props.toggleLoginmodal();
    //   }
    // }


render() {
  return (
    <div>
      <div style={{border: '2px solid black', width: '300px', padding: '20px'}}>
        New Post<br />
        <input type="text" placeholder="Title" /><br />
        <textarea placeholder="Write your post" /><br />
        <input type="text" placeholder="Links/Attachments" /><br />
        <button onClick={() => handleNewPost()}>Submit</button>
      </div>
    </div>
  )
}

}

export default NewPost;
