import './App.css';
import Movie from './components/Movie';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/common/navBar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import { Component } from 'react';
import PageNotFound from './components/pageNotFound';
import MovieForm from './components/movieForm';
import Login from './components/loginFrom';
import Register from './components/register';


class App extends Component {
  render() {

    return (

      <div>
        <NavBar />
        <div className='content'>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/movies/:iiid" component={MovieForm} />
            <Route path="/movies" component={Movie} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={PageNotFound} />
            <Route path="/" exact component={Movie} />
            <Redirect to='/not-found' />
          </Switch>
        </div>
      </div >

    );
  }

}

export default App;
