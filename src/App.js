import logo from './logo.svg';
import './App.css';

// Example GET method implementation:
async function getData(url = '') {
  const response = await fetch(url, {
    method: 'GET',
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function App() {
  getData('https://raw.githubusercontent.com/sean-reid/nyt_crosswords/master/2016/05/12.json')
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
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
