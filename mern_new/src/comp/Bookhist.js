import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
var num=require('numeral');

class Bookhist extends Component {

    constructor(props) {
      super(props);
      this.state = {
        hist: [],
        usrnm:'',
      };
    }
  
    componentWillMount(){
          this.getUser()
      }
    componentDidMount() {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.get('http://localhost:3002/api/hist/'+this.state.usrnm)
        .then(res => {
          this.setState({ hist: res.data });
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
    render() {

      const data =this.state.hist.map((hist,index) =>{
        var title=hist.title.join(' & ')
        var quan = hist.qty.join(' & ')
        var totp=num(hist.price).format('0,0')
        var datestr=hist.buy_date
        var dateNew=new Date(datestr)
        var formDate=dateNew.toDateString();
        var formTime=dateNew.toLocaleTimeString('en-US');
        var ndate=formDate+' - '+formTime
        return(
          <tr key={index}>
          <td>{title}</td>
          <td>{quan}</td>
          <td>Rp {totp},-</td>
          <td>{ndate}</td>
        </tr>
        )
      })
      return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
               Purchase History
              </h3>
            </div>
            <div className="panel-body">
            <h4><Link to="/home"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Book List</Link></h4>
              <table className="table table-stripe">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Buy Date</th>
                  </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default Bookhist;