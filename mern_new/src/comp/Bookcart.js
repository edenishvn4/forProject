import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
var num=require('numeral');

class Bookcart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      usrnm:'',
      totpr:0,
      messg:''
    };
  }

  componentWillMount(){
        this.getUser()
    }
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('http://localhost:3002/api/cart/'+this.state.usrnm)
      .then(res => {
        var tot=res.data.length
        var subt=0
        for(var i=0;i<tot;i++){
            subt+=(res.data[i].price*res.data[i].qty)
        }
        console.log(subt)
        this.setState({ cart: res.data, totpr:subt });
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  getUser=()=>{
    try {
        var x =localStorage.getItem('jwtToken')
        var y =x.split(' ')
        var n =y[1]
        var m=JSON.parse(atob(n.split('.')[1]))
        this.setState({usrnm:m.username})
    } catch (error) {
            this.props.history.push("/login");
    }
    
  }
  klik(){
    var username=this.state.usrnm;
    var isbn=[];
    var stock1=[];
    var stock=0
    var title=[];
    var qty=[];
    var price =this.state.totpr;
    var n= this.state.cart.length
    for(var i=0;i<n;i++){
        title.push(this.state.cart[i].title)
        qty.push(this.state.cart[i].qty)
        isbn.push(this.state.cart[i].isbn)
        stock1.push(this.state.cart[i].stock-this.state.cart[i].qty)
    }
    if(price===0){
      this.setState({ messg: 'Cart is empty' });
    }else{
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.post('http://localhost:3002/api/hist/', { username, title, qty, price })
      .then((result) => {
        console.log(result);
      }).catch((error) => {
        if(error) {
          console.log(error);
        }
      });
      axios.delete('http://localhost:3002/api/cart/', { data:{username:username }})
      .then((result) => {
        console.log(result)
      }).catch((error) => {
        if(error) {
          console.log(error);
        }
      });
      for(var j=0;j<n;j++){
        stock=stock1[j]
        axios.patch('http://localhost:3002/api/book/'+isbn[j], {stock})
        .then((result) => {
        console.log(result)
      }).catch((error) => {
        if(error) {
          console.log(error);
        }
      });
      }
      this.props.history.push('/histo')
    console.log(stock);
    }
  }

  delete(id){
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.delete('http://localhost:3002/api/cart/'+id)
      .then((result) => {
        window.location.reload();
        // console.log(result)
      });
  }

  render() {
    var prt=this.state.totpr
    var totp=num(prt).format('0,0')
    const { messg } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Your Cart
            </h3>
          </div>
          <div className="panel-body">
          <h4><Link to="/home"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Book List</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>  </th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>qty</th>
                </tr>
              </thead>
              <tbody>
              {this.state.cart.map((cart,index) =>{
                  var pr=cart.price
                  var strnum=num(pr).format('0,0')
                  return(
                    <tr key={index}>
                    <td><span className="glyphicon glyphicon-minus" onClick={this.delete.bind(this, cart._id)} aria-hidden="true"></span></td>
                    <td>{cart.title}</td>
                    <td>{cart.description}</td>
                    <td>Rp {strnum},-</td>
                    <td>{cart.qty}</td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="panel-footer">
          <div className="text-right">
            <p><b>Total : Rp {totp} ,-</b></p>
            <button onClick={()=>{this.klik();}} className="btn btn-primary">Checkout</button>
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

export default Bookcart;