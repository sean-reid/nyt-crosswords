import logo from './logo.svg';
import './App.css';
import Crossword from '@jaredreisinger/react-crossword';

//https://stackoverflow.com/questions/16102263/to-find-index-of-multidimensional-array-in-javascript
function getIndexOfK(arr, k) {
  for (var i = 0; i < arr.length; i++) {
    var index = arr[i].indexOf(k);
    if (index > -1) {
      return [i, index];
    }
  }
}

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
  let size = data.size;
  let answers = data.grid;
  let nums = data.gridnums;
  let answersGrid = [];
  let answersRow = [];
  for (let index_rows = 0; index_rows < size.rows; index_rows++) {
    answersRow = [];
    for (let index_cols = 0; index_cols < size.cols; index_cols++) {
      answersRow.push(answers[size.cols*index_rows + index_cols]);
    }
    answersGrid.push(answersRow);
  }
  let numsGrid = [];
  let numsRow = [];
  for (let index_rows = 0; index_rows < size.rows; index_rows++) {
    numsRow = [];
    for (let index_cols = 0; index_cols < size.cols; index_cols++) {
      numsRow.push(nums[size.cols*index_rows + index_cols]);
    }
    numsGrid.push(numsRow);
  }
  let acrossClues = data.clues.across;
  let downClues = data.clues.down;
  let clueNum = 0;
  let result = [];
  let answer = "";
  let clue = "";
  for (let index_across = 0; index_across < acrossClues.length; index_across++) {
    clue = acrossClues[index_across]
    clueNum = GetClueNumber(clue);
    result = getIndexOfK(numsGrid, clueNum);
    answer = answersGrid[result[0]][result[1]];
    answer = GetAnswer(answersGrid, result, "across");
    console.log(clue, answer);
  }
}

function GetAnswer(answersGrid, indicies, direction) {
  let answer = "";
  let row = indicies[0];
  let col = indicies[1];
  let current_letter = answersGrid[row][col];
  while (current_letter !== "*") {
    answer += current_letter;
    if (direction === "across") {
      col++;
    } else if (direction === "down") {
      row++;
    }
    current_letter = answersGrid[row][col];
  }
  return answer;
}

function GetClueNumber(clue) {
  let clueNum = parseInt(clue.split('.')[0]);
  return clueNum
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
