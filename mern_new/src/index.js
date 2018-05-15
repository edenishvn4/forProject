import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './comp/Login';
import Register from './comp/Register';
import Bookadd from './comp/Bookadd';
import Bookdetail from './comp/Bookdetail';
import Bookedit from './comp/Bookedit';
import Homeuser from './comp/Homeuser';
import Bookdetuser from './comp/Bookdetuser'
import Bookcart from './comp/Bookcart'
import Bookhist from './comp/Bookhist'

ReactDOM.render(
    <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/home' component={Homeuser} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/edit/:id' component={Bookedit} />
      <Route path='/create' component={Bookadd} />
      <Route path='/show/:id' component={Bookdetail} />
      <Route path='/showus/:id' component={Bookdetuser} />
      <Route path='/cart' component={Bookcart} />
      <Route path='/histo' component={Bookhist} />
    </div>
</Router>,document.getElementById('root')
);
registerServiceWorker();
