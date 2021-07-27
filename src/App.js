import logo from './logo.svg';
import './App.css';
import Crossword from '@jaredreisinger/react-crossword';

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}



function ConvertData(data) {

}

function App() {
  const year = 2011;
  const month = 2;
  const day = 20;
  let url = `https://raw.githubusercontent.com/sean-reid/nyt-crosswords-data/master/${(year).pad(4)}/${(month).pad(2)}/${(day).pad(2)}.json`
  fetch(url)
  .then(status)
  .then(json)
  .then(function(data) {
    console.log('Request succeeded with JSON response', data);
    return data
  }).then(ConvertData)
  .catch(function(error) {
    console.log('Request failed', error);
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
