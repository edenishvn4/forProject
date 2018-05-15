import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Bookedit extends Component {

  constructor(props) {
    super(props);
    this.state = {
        book: {},
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3002/api/book/'+this.props.match.params.id)
      .then(res => {
        this.setState({book: res.data});
        console.log(this.state.book);
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  onChange = (e) => {
    const state = this.state.book
    state[e.target.name] = e.target.value;
    this.setState({book:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {isbn,title,author,description,published_date,publisher,price,stock } = this.state.book;
    
    axios.put('http://localhost:3002/api/book/'+this.props.match.params.id, { isbn, title, author, description, published_date, publisher,price,stock })
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              EDIT BOOK
            </h3>
          </div>
          <div className="panel-body">
          <h4><Link to="/"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="isbn">ISBN:</label>
                <input type="text" className="form-control" name="isbn" value={this.state.book.isbn} onChange={this.onChange} placeholder="ISBN" />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" name="title" value={this.state.book.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author:</label>
                <input type="text" className="form-control" name="author" value={this.state.book.author} onChange={this.onChange} placeholder="Author" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea className="form-control" name="description" value={this.state.book.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <div className="form-group">
                <label htmlFor="published_date">Published Date:</label>
                <input type="text" className="form-control" name="published_date" value={this.state.book.published_date} onChange={this.onChange} placeholder="Published Date" />
              </div>
              <div className="form-group">
                <label htmlFor="publisher">Publisher:</label>
                <input type="text" className="form-control" name="publisher" value={this.state.book.publisher} onChange={this.onChange} placeholder="Publisher" />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input type="number" className="form-control" name="price" value={this.state.book.price} onChange={this.onChange} placeholder="Price" />
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock:</label>
                <input type="number" className="form-control" name="stock" value={this.state.book.stock} onChange={this.onChange} placeholder="Stock" />
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Bookedit;