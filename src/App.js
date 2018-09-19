import React, { Component } from 'react';
import Ticker from './components/Ticker';
//import SignIn from './components/SignIn';
//import fire from './firebase';
import {firebase, googleAuth} from './firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import currencies from './currencies';
import './App.css';


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
//var provider = new firebase.auth.GoogleAuthProvider();    
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

componentDidMount=()=> {
  firebase.auth().onAuthStateChanged(user=> {
    this.setState({isSignedIn: !!user})
  })

  
}


//  firebase.ref().on('value', (snapshot)=> {
//   this.setState({
//     data: snapshot.val()
//              data: 20
//    })
//  });


//handleSubmit(event) {
  
//}

//handleChange(event) {
//  const newData=event.target.value;
//  this.setState({
//    newData: newData
//  });
signIn = () => {
  firebase.auth().signInWithPopup(googleAuth)
}

signOut = () => {
  firebase.auth().signOut()
}

handleCheckBox= currency => (event) => {
  const {checked}=event.target;

  this.setState(({ selectedPairs }) => {

    let pairs =[...selectedPairs]
  

    if (checked) {
      pairs.push(currency);
    } else {
      pairs=pairs.filter(pair=> pair !==currency)
    }

    return {
      selectedPairs: pairs
    }
    
  })
}


  render() {
    return (
      <div className="App">
      <div>{this.state.isSignedIn ? (
        <span>
          <div>Signed In!</div>
          
          <button onClick={()=>firebase.auth().signOut}>Sign Out</button>
          <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
<img alt="profile picture" src={firebase.auth().currentUser.photoURL}/>
        </span>  
          ) : (
            <div>Not Signed In!</div>
            
            
            
          )}</div>
      <button onClick={this.signIn}>LOGIN With GOOGLE</button>
      <button onClick={this.signOut}>LOG OFF</button>
        <pre className="App--Data">{JSON.stringify(this.state.data, null, 2)}</pre>
        <Ticker price={0.75} pair="BTC/USD" />
       
        <aside>
            <ul className="currList">
              {currencies.map(curr=> <li key={curr} className="currItem">
              <input type="checkbox" id={curr} onChange={this.handleCheckBox(curr)}/>
              <label htmlFor={curr}>{curr.toUpperCase()}</label>
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


// <SignIn/>