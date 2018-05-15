import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
var num=require('numeral');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      usrnm:''
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('http://localhost:3002/api/book')
      .then(res => {
        this.setState({ books: res.data });
        this.getUser();
        console.log(this.state.books);
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }
  getUser=()=>{
    var x =localStorage.getItem('jwtToken')
    var y =x.split(' ')
    var n =y[1]
    var m=JSON.parse(atob(n.split('.')[1]))
    this.setState({usrnm:m.username})
  }
  logout = () => {
    localStorage.removeItem('jwtToken');
    // window.location.reload();
  }

  render() {
    return (
      <div className="container">
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <h2>Welcome, {this.state.usrnm}</h2>
        </li>
        <li className="nav-item">
        <h3>
          {localStorage.getItem('jwtToken') &&
               <Link to="/login"><button className="btn btn-primary" onClick={this.logout}>Logout</button></Link>
              }
          </h3>
        </li>
      </ul>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              BOOK CATALOG
            </h3>
          </div>
          <div className="panel-body">
          <h4><Link to="/create"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Book</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map((book,index) =>{
                  var pr=book.price
                  var strnum=num(pr).format('0,0')
                  return(
                    <tr key={index}>
                    <td><Link to={`/show/${book._id}`}>{book.isbn}</Link></td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>Rp {strnum},-</td>
                    <td>{book.stock}</td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;