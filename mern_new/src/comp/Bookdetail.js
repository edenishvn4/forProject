import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
var num=require('numeral');

class Bookdetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('http://localhost:3002/api/book/'+this.props.match.params.id)
      .then(res => {
        this.setState({ book: res.data });
        console.log(this.state.book);
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });;
  }

  delete(id){
    console.log(id);
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.delete('http://localhost:3002/api/book/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    var pr=this.state.book.price
    var strnum=num(pr).format('0,0')
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              {this.state.book.title}
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Book List</Link></h4>
            <dl>
              <dt>ISBN:</dt>
              <dd>{this.state.book.isbn}</dd>
              <dt>Author:</dt>
              <dd>{this.state.book.author}</dd>
              <dt>Description:</dt>
              <dd>{this.state.book.description}</dd>
              <dt>Publish Date:</dt>
              <dd>{this.state.book.published_date}</dd>
              <dt>Publisher:</dt>
              <dd>{this.state.book.publisher}</dd>
              <dt>Price:</dt>
              <dd>Rp {strnum},-</dd>
              <dt>Stock:</dt>
              <dd>{this.state.book.stock}</dd>
            </dl>
            <Link to={`/edit/${this.state.book._id}`} className="btn btn-success">Edit</Link>
            <button style={{marginLeft:10}} onClick={this.delete.bind(this, this.state.book._id)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Bookdetail;