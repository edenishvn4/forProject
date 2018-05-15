import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Bookadd extends Component {

  constructor() {
    super();
    this.state = {
      isbn: '',
      title: '',
      author: '',
      description: '',
      published_date:'',
      publisher: '',
      price:0,
      stock:0,
      books:[]
    };
  }
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('http://localhost:3002/api/book')
      .then(res => {
        this.setState({ books: res.data });
        console.log(this.state.books);
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { isbn, title, author, description, published_date, publisher,price,stock } = this.state;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.post('http://localhost:3002/api/book', { isbn, title, author, description, published_date, publisher,price,stock })
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const { isbn, title, author, description, published_date, publisher,price,stock } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ADD BOOK
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="isbn">ISBN:</label>
                <input type="text" className="form-control" name="isbn" value={isbn} onChange={this.onChange} placeholder="ISBN" />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author:</label>
                <input type="text" className="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea className="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textarea>
              </div>
              <div className="form-group">
                <label htmlFor="published_date">Published Date:</label>
                <input type="text" className="form-control" name="published_date" value={published_date} onChange={this.onChange} placeholder="Published Date" />
              </div>
              <div className="form-group">
                <label htmlFor="publisher">Publisher:</label>
                <input type="text" className="form-control" name="publisher" value={publisher} onChange={this.onChange} placeholder="Publisher" />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input type="number" className="form-control" name="price" value={price} onChange={this.onChange} placeholder="Price" />
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock:</label>
                <input type="number" className="form-control" name="stock" value={stock} onChange={this.onChange} placeholder="Stock" />
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Bookadd;