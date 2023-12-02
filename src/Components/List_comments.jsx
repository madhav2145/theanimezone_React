import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import downvote from '../assets/downvote.png';
import upvote from '../assets/upvote.png';
import clock from '../assets/clock.png';
import { useParams } from 'react-router-dom';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.upvotes = React.createRef();
    this.downvotes = React.createRef();
    this.handleUpvoteDownvote = this.handleUpvoteDownvote.bind(this);
    this.state = {
      upvoted: false,
      downvoted: false,
      publisher: '',
    };
    
  }

  componentDidMount() {
    // Query redis to determine user comments upvote downvote status to set state - could be optimized
    const jwt = sessionStorage.getItem('jwt-token');
    if (jwt === null) {
      console.log('not logged in');
    } else {
      const headers = {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          'auth-header': jwt,
        },
      };
      axios
        .post('http://localhost:5000/api/cache/updownstate', { commentid: this.props.comment._id }, headers)
        .then((resp) => {
          this.setState(resp.data);
        })
        .catch((err) => console.log(err));
    }
  }

  handleUpvoteDownvote(e) {
    console.log(e.target.name);
    console.log(this.props);
    const json = { type: e.target.name,
      data: {
        comment: {
          _id: this.props.comment._id,  // Include specific properties needed
          upvotes: this.props.comment.upvotes,
          downvotes: this.props.comment.downvotes,
          user: {
            _id: this.props.comment.user._id,  // Include specific properties needed
          },
        },
      }, };
    json.data = this.props;
    console.log(json);
    const jwt = sessionStorage.getItem('jwt-token');
    
    if (jwt === null) {
      // Handle not logged in scenario
    } else {
      console.log(this.state.publisher);

      if (this.state.publisher === json.data.comment.user._id) {
        // Handle can't upvote/downvote your own comment
      } else {
        if (e.target.name === 'upvote') {
          if (this.state.downvoted) {
            json.data.comment.downvotes--;
            this.setState({ downvoted: false });
          }
          json.data.comment.upvotes++;
          this.setState({ upvoted: true });
        } else {
          if (this.state.upvoted) {
            json.data.comment.upvotes--;
            this.setState({ upvoted: false });
          }
          json.data.comment.downvotes++;
          this.setState({ downvoted: true });
        }
        this.props.socket.send(JSON.stringify(json));
        const headers = {
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'auth-header': jwt,
          },
        };
        // Sync with MongoDB
        axios
          .put('http://localhost:5000/api/comments/update', json.data.comment, headers)
          .then((res) => {
            console.log(res);
            // Sync with Redis
            axios
              .put('http://localhost:5000/api/cache/updownstate', { commentid: json.data.comment._id, upvoted: this.state.upvoted ? 1 : 0 }, headers)
              .then((resp) => this.setState(resp.data))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    }
  }

  render() {
    let likeimgurl = this.state.upvoted ? process.env.PUBLIC_URL + '/logos/liked.png' : process.env.PUBLIC_URL + '/logos/like.png';
    let dislikeimgurl = this.state.downvoted ? process.env.PUBLIC_URL + '/logos/disliked.png' : process.env.PUBLIC_URL + '/logos/dislike.png';

    return (
      <div className="border p-4 mb-4 w-[100%]">
        <div className="flex">
          <div className="flex-1">
            <h5 className="text-lg font-bold mb-2">
              {this.props.comment.user.firstName} {this.props.comment.user.lastName}
            </h5>
            <p className="text-gray-700 text-base">{this.props.comment.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              <img src={clock} className="inline-block mr-1" alt="clock" />
              {moment(Date.parse(this.props.comment.createdAt)).fromNow()}
            </p>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              <button
                type="button"
                disabled={this.state.upvoted}
                onClick={this.handleUpvoteDownvote}
                name="upvote"
                className="flex items-center space-x-1 focus:outline-none"
              >
                <img src={upvote} alt="upvote" width="20" height="20" />
                <span className="text-sm font-bold">{this.props.comment.upvotes}</span>
              </button>
            </div>
            <div>
              <button
                type="button"
                disabled={this.state.downvoted}
                onClick={this.handleUpvoteDownvote}
                name="downvote"
                className="flex items-center space-x-1 focus:outline-none"
              >
                <img src={downvote} alt="downvote" width="20" height="20" />
                <span className="text-sm font-bold">{this.props.comment.downvotes}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// class ListComments extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { comments: [] };
//   }

//   componentDidMount() {
//     axios
//       .get('http://localhost:5000/api/comments/')
//       .then((resp) => this.setState({ comments: resp.data }))
//       .catch((err) => console.log(err));
//   }

//   componentWillReceiveProps(nextProps) {
//     const data = JSON.parse(nextProps.comment);
//     console.log(data.data);
//     if (data.type === 'upvote' || data.type === 'downvote') {
//       let cloneComments = [...this.state.comments];
//       const foundIndex = cloneComments.findIndex((x) => x._id === data.data.comment._id);
//       console.log(foundIndex);
//       cloneComments[foundIndex] = data.data.comment;

//       this.setState({ comments: cloneComments });
//     } else if (data.type === 'comment') {
//       this.setState({ comments: [data.data, ...this.state.comments] });
//     }
//   }

//   commentList() {
//     return this.state.comments.map((currentcomment) => {
//       return <Comment comment={currentcomment} socket={this.props.actions} key={currentcomment._id} />;
//     });
//   }
//   render() {
//     return (
//       <div className="flex flex-col">
//         <h3 className="text-xl font-bold mb-4">Comments</h3>
//         {this.commentList()}
//       </div>
//     );
//   }
// }
class ListComments extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }

  componentDidMount() {
    // Access 'romaji' parameter using this.props.match.params
    const { match } = this.props;
    if (match && match.params) {
      const { romaji } = match.params;
  
      axios
        .get(`http://localhost:5000/api/comments/${romaji}`)
        .then((resp) => this.setState({ comments: resp.data }))
        .catch((err) => console.log(err));
    }
  }

  componentWillReceiveProps(nextProps) {
    const data = JSON.parse(nextProps.comment);
    if (data.type === 'upvote' || data.type === 'downvote') {
      let cloneComments = [...this.state.comments];
      const foundIndex = cloneComments.findIndex((x) => x._id === data.data.comment._id);
      cloneComments[foundIndex] = data.data.comment;

      this.setState({ comments: cloneComments });
    } else if (data.type === 'comment') {
      this.setState({ comments: [data.data, ...this.state.comments] });
    }
  }

  commentList() {
    return this.state.comments.map((currentcomment) => {
      return <Comment comment={currentcomment} socket={this.props.actions} key={currentcomment._id} />;
    });
  }

  render() {
    return (
      <div className="flex flex-col">
        <h3 className="text-xl font-bold mb-4">Comments</h3>
        {this.commentList()}
      </div>
    );
  }
}

export default ListComments;
