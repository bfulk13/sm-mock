import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
  constructor(props){
    super(props)

    this.state = {
      title: '',
      img: '',
      content: ''
    }
  }

  handleInput = (prop, val) => {
    this.setState({ [prop]: val })
  }

  newPost = async () => {
    const {title, img, content} = this.state;
    await axios.post('/api/post', { title, img, content })
  }

  render() {
    return (
      <div className="Form">
        <h1>Form Component</h1>
        <input type="text" value={this.state.title} onChange={ e => this.handleInput('title', e.target.value)} placeholder="post title" max="45"/>
        <input type="text" value={this.state.img} onChange={ e => this.handleInput('img', e.target.value)} placeholder="img URL..." />
        <input type="text" value={this.state.content} onChange={ e => this.handleInput('content', e.target.value)} placeholder="content..." />
        <button onClick={ this.newPost }>Post</button>
      </div>
    );
  }
}

export default Form;