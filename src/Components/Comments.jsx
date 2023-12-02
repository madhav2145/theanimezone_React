import React, { Component } from 'react';
import ListComments from './List_comments';
import AddComment from './Add_comments';

export default class Comments extends Component {

  constructor(props){
    super(props);
    const sock = new WebSocket('ws://localhost:5000/comment');
    sock.onopen = function() {
        console.log('open');
    };

    const self = this;
    sock.onmessage = function(e) {
          const message = JSON.parse(e.data);
          const dataToSend = JSON.stringify(message);
          self.setState({ comment: dataToSend });
    };

    this.state = {
      actions : sock,
      comment : {},
    }
  }

  render() {
    return (
      <div className="container border bg-green-500  m-[5%] ml-[15%] w-[80%]">
        <br/>
        < AddComment { ... this.state  }/>
        < ListComments { ... this.state }/>
      </div>
    );
  }
}