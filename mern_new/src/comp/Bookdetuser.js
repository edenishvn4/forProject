import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
var num=require('numeral');

class Bookdetuser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {},
      usrnm:'',
      messg:'',
      quan:0
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('http://localhost:3002/api/book/'+this.props.match.params.id)
      .then(res => {
        this.getUser();
        this.setState({ book: res.data });
        console.log(this.state.book);
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  klik2(){
    var username=this.state.usrnm;
    var title=this.state.book.title;
    var description=this.state.book.description;
    var qty=this.state.quan;
    var price =this.state.book.price;
    var isbn = this.state.book.isbn
    var stock = this.state.book.stock
    if(qty<=0){
      this.setState({messg:'the value is invalid'})
    }else{
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.post('http://localhost:3002/api/cart', { isbn,username, title, description, qty, price,stock })
      .then((result) => {
        this.setState({ messg: 'Added To cart' });
        console.log(result);
      }).catch((error) => {
        if(error) {
          this.setState({ messg: 'you have added this item to cart' });
          console.log(error);
        }
      });
    }
  }
  getUser=()=>{
    var x =localStorage.getItem('jwtToken')
    var y =x.split(' ')
    var n =y[1]
    var m=JSON.parse(atob(n.split('.')[1]))
    this.setState({usrnm:m.username})
  }

  // onChange=(e)=>{
  //   e.persist()
  //   // this.setState({book:state});
  //   // this.setState({quan:e.nativeEvent.data})
  //   console.log(e.target.value)
  // }
  klik(){
    this.setState({quan: this.refs.quan.value});
  }
  render() {
    var pr=this.state.book.price
    var strnum=num(pr).format('0,0')
    const { messg } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              {this.state.book.title}
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/home"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Book List</Link></h4>
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
          </div>
          <div className="panel-footer">
          <div className="text-right">
          <form className="form-inline">
            <div className="form-group mx-sm-3 mb-2 row">
            <div className="col">
              <label htmlFor="inputQty">Qty: </label>
              <input type="number" ref="quan" style={{width:100,marginLeft:10}} className="form-control" onInput={()=>{this.klik();}} placeholder="qty"/>
            <button onClick={()=>{this.klik2();}} style={{marginLeft:10}} className="btn btn-primary mb-2">Add To Cart</button> 
            </div>
            </div>
          </form>
          </div>
          </div>
        </div>
        {messg !== '' &&
            <div className="alert alert-success alert-dismissible">
              { messg }
            </div>
          }
      </div>
    );
  }
}

export default Bookdetuser;