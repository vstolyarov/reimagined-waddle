import React, { Component } from 'react';
import Ticker from './components/Ticker';
import SignIn from './components/SignIn';
//import fire from './firebase';
import firebase from './firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import currencies from './currencies';

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      data: null,
//      newData: newData,
      isSignedIn: false,
      selectedPairs: []
    };


  }

componentDidMount() {


  firebase.auth().onAuthStateChanged(user=> {
    this.setState({isSignedIn:!!user})
  })



//  firebase.ref().on('value', (snapshot)=> {
//   this.setState({
//     data: snapshot.val()
//              data: 20
//    })
//  });
}

//handleSubmit(event) {
  
//}

//handleChange(event) {
//  const newData=event.target.value;
//  this.setState({
//    newData: newData
//  });

handleCheckBox=(currency) => (event) => {
  const {checked}=event.target;

  this.setState(({ selectedPairs }) => {

    let pairs =[...selectedPairs]
  

    if (checked) {
      pairs.push(currency)
    } else {
      
    }

    return {
      selectedPairs: ['btc-usd']
    }
    
  })
}

  render() {
    return (
      <div className="App">
      <div>{this.state.isSignedIn ? (
          <div>Signed In!</div>
          ) : (
            <div>Not Signed In!</div>

          )}</div>
      
        <pre className="App--Data">{JSON.stringify(this.state.data, null, 2)}</pre>
        <Ticker price={0.75} pair="BTC/USD" />
        <SignIn/>
        <aside>
            <ul className="currList">
              {currencies.map(curr=> <li key={curr} className="currItem"><input type="checkbox" id={curr} onChange={this.handleCheckBox}/><label htmlFor={curr}>{curr.toUpperCase()}</label>
              </li>)}
            </ul>
          </aside>
        <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
        
      </div>
    );
  }
}

export default App;