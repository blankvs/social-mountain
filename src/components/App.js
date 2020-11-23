import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'


class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then(results=>{ //.get retrieves data, then we select from where with the link, .then is required(still don't know why), then you you arrow function results because arrow functions have an auto return so it is returning this.setState then calling it posts and returning the results.data from the link.
    this.setState({posts: results.data})
    })
  }

  updatePost(id, text) {
  axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text }).then(results => {
    this.setState({posts: results.data})
  })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then(results=>{
      this.setState({posts: results.data})
    })
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', {text}).then(results=> {
      this.setState({posts: results.data})
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          
          {
            posts.map( post => (// To change these since their "Post", we must go to our website API and click on "Post" and It will tell us every property it has.
              <Post key={ post.id } 
                    id={ post.id }
                    text={ post.text }
                    date={ post.date } 
                    updatePostFn={ this.updatePost }
                    deletePostFn={ this.deletePost }/>
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
