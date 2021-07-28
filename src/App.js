import React, { useCallback, useRef, useState, useEffect } from 'react';
import Crossword from '@jaredreisinger/react-crossword';
import DatePicker from 'react-date-picker';
import styled from 'styled-components';
import { Route, Switch, Link } from "react-router-dom";

const dataStart = {"across": {"1": {"clue": "Attention getter", "answer": "AHEM", "row": 0, "col": 0}, "5": {"clue": "Zola title", "answer": "NANA", "row": 0, "col": 5}, "9": {"clue": "Garlic unit", "answer": "CLOVE", "row": 0, "col": 10}, "14": {"clue": "Met V.I.P.", "answer": "DIVA", "row": 1, "col": 0}, "15": {"clue": "Is obligated", "answer": "OWES", "row": 1, "col": 5}, "16": {"clue": "Volcanic outputs", "answer": "LAVAS", "row": 1, "col": 10}, "17": {"clue": "Hymn word", "answer": "AMEN", "row": 2, "col": 0}, "18": {"clue": "Nail specialist", "answer": "MANICURIST", "row": 2, "col": 5}, "20": {"clue": "May apple", "answer": "MANDRAKE", "row": 3, "col": 0}, "22": {"clue": "Tolerate", "answer": "ABIDE", "row": 3, "col": 9}, "23": {"clue": "Staff man", "answer": "AIDE", "row": 4, "col": 3}, "24": {"clue": "Terza ___", "answer": "RIMA", "row": 4, "col": 8}, "25": {"clue": "Bowling scores", "answer": "SPARES", "row": 5, "col": 0}, "28": {"clue": "Aquatic mammals", "answer": "MANATEES", "row": 5, "col": 7}, "32": {"clue": "Red dye", "answer": "EOSIN", "row": 6, "col": 0}, "33": {"clue": "Baker's ___", "answer": "DOZEN", "row": 6, "col": 6}, "34": {"clue": "Geographical abbr.", "answer": "LAT", "row": 6, "col": 12}, "35": {"clue": "Org.", "answer": "ASSN", "row": 7, "col": 0}, "36": {"clue": "Tender spots", "answer": "SORES", "row": 7, "col": 5}, "37": {"clue": "Venetian ruler", "answer": "DOGE", "row": 7, "col": 11}, "38": {"clue": "Draw", "answer": "TIE", "row": 8, "col": 0}, "39": {"clue": "Something, in Germany", "answer": "ETWAS", "row": 8, "col": 4}, "40": {"clue": "Turn back", "answer": "REPEL", "row": 8, "col": 10}, "41": {"clue": "Footstools", "answer": "OTTOMANS", "row": 9, "col": 0}, "43": {"clue": "\"I am a ___\"", "answer": "CAMERA", "row": 9, "col": 9}, "44": {"clue": "Chimneys, in Glasgow", "answer": "LUMS", "row": 10, "col": 3}, "45": {"clue": "Teasdale", "answer": "SARA", "row": 10, "col": 8}, "46": {"clue": "Soup server", "answer": "LADLE", "row": 11, "col": 1}, "48": {"clue": "Fictional villain", "answer": "FUMANCHU", "row": 11, "col": 7}, "52": {"clue": "Pawed", "answer": "MANHANDLED", "row": 12, "col": 0}, "54": {"clue": "Sullen", "answer": "DOUR", "row": 12, "col": 11}, "55": {"clue": "Old English coin", "answer": "GROAT", "row": 13, "col": 0}, "56": {"clue": "Florida county", "answer": "DADE", "row": 13, "col": 6}, "57": {"clue": "Fitzgerald", "answer": "ELLA", "row": 13, "col": 11}, "58": {"clue": "French relative", "answer": "TANTE", "row": 14, "col": 0}, "59": {"clue": "Machine gun", "answer": "STEN", "row": 14, "col": 6}, "60": {"clue": "Start a card game", "answer": "DEAL", "row": 14, "col": 11}}, "down": {"1": {"clue": "Bede", "answer": "ADAM", "row": 0, "col": 0}, "2": {"clue": "Uganda people", "answer": "HIMA", "row": 0, "col": 1}, "3": {"clue": "Smooth", "answer": "EVEN", "row": 0, "col": 2}, "4": {"clue": "Orange", "answer": "MANDARIN", "row": 0, "col": 3}, "5": {"clue": "Restless ones", "answer": "NOMADS", "row": 0, "col": 5}, "6": {"clue": "On one's toes", "answer": "AWAKE", "row": 0, "col": 6}, "7": {"clue": "Hawaiian goose", "answer": "NENE", "row": 0, "col": 7}, "8": {"clue": "\"___ was saying . . . \"", "answer": "ASI", "row": 0, "col": 8}, "9": {"clue": "Elk or Rotarian", "answer": "CLUBMAN", "row": 0, "col": 10}, "10": {"clue": "Lasso", "answer": "LARIAT", "row": 0, "col": 11}, "11": {"clue": "Roman poet", "answer": "OVID", "row": 0, "col": 12}, "12": {"clue": "Flower holder", "answer": "VASE", "row": 0, "col": 13}, "13": {"clue": "Superlative ending", "answer": "EST", "row": 0, "col": 14}, "19": {"clue": "Actor Michael and family", "answer": "CAINES", "row": 2, "col": 9}, "21": {"clue": "Nothing, in Paris", "answer": "RIEN", "row": 3, "col": 4}, "24": {"clue": "Destroys", "answer": "RAZES", "row": 4, "col": 8}, "25": {"clue": "Treaty org.", "answer": "SEATO", "row": 5, "col": 0}, "26": {"clue": "Assume", "answer": "POSIT", "row": 5, "col": 1}, "27": {"clue": "Black-ink item", "answer": "ASSET", "row": 5, "col": 2}, "28": {"clue": "S.A. trees", "answer": "MORAS", "row": 5, "col": 7}, "29": {"clue": "Run off", "answer": "ELOPE", "row": 5, "col": 12}, "30": {"clue": "Agog", "answer": "EAGER", "row": 5, "col": 13}, "31": {"clue": "Stone slab", "answer": "STELA", "row": 5, "col": 14}, "33": {"clue": "Football units", "answer": "DOWNS", "row": 6, "col": 6}, "36": {"clue": "Flower part", "answer": "STAMEN", "row": 7, "col": 5}, "37": {"clue": "Called for", "answer": "DEMANDED", "row": 7, "col": 11}, "39": {"clue": "Rival", "answer": "EMULATE", "row": 8, "col": 4}, "40": {"clue": "___ avis", "answer": "RARA", "row": 8, "col": 10}, "42": {"clue": "Pass\u00e9", "answer": "OLDHAT", "row": 9, "col": 3}, "43": {"clue": "N.J. city", "answer": "CAMDEN", "row": 9, "col": 9}, "45": {"clue": "Shoe material", "answer": "SUEDE", "row": 10, "col": 8}, "46": {"clue": "Pasternak heroine", "answer": "LARA", "row": 11, "col": 1}, "47": {"clue": "Soon", "answer": "ANON", "row": 11, "col": 2}, "48": {"clue": "Stale", "answer": "FLAT", "row": 11, "col": 7}, "49": {"clue": "Porter", "answer": "COLE", "row": 11, "col": 12}, "50": {"clue": "Oahu dance", "answer": "HULA", "row": 11, "col": 13}, "51": {"clue": "Russian range", "answer": "URAL", "row": 11, "col": 14}, "52": {"clue": "Labor's counterpart: Abbr.", "answer": "MGT", "row": 12, "col": 0}, "53": {"clue": "Dental degree", "answer": "DDS", "row": 12, "col": 6}}};

const Page = styled.div`
  padding: 2em;
`;

const Header = styled.h1`
  margin-bottom: 1em;
`;

const Commands = styled.div``;

const Command = styled.button`
  margin-top: 2em;
  margin-right: 1em;
`;

const CrosswordWrapper = styled.div`
  margin-top: 2em;
  max-width: 100%;
  /* and some fun making use of the defined class names */
  .crossword.correct {
    rect {
      stroke: rgb(100, 200, 100) !important;
    }
    svg > rect {
      fill: rgb(100, 200, 100) !important;
    }
    text {
      fill: rgb(100, 200, 100) !important;
    }
  }
  .clue.correct {
    ::before {
      content: '\u2713'; /* a.k.a. checkmark: ✓ */
      display: inline-block;
      text-decoration: none;
      color: rgb(100, 200, 100);
      margin-right: 0.25em;
    }
    text-decoration: line-through;
    color: rgb(130, 130, 130);
  }
`;

const Messages = styled.pre`
  background-color: rgb(230, 230, 230);
  margin: 1em 0;
  padding: 1em;
`;

// in order to make this a more-comprehensive example, and to vet Crossword's
// features, we actually implement a fair amount...


function App() {

  const [data,setData]=useState(dataStart);
  const [startDate, setStartDate] = useState(new Date(1976, 0, 1));
  
  function updateData(startDate) {
    setStartDate(startDate)
    const year = startDate.getFullYear();
    const month = (startDate.getMonth()+1).toString().padStart(2, 0);
    const day = startDate.getDate().toString().padStart(2, 0);
    let abortController = new AbortController();
      const fetchData=()=>{
        const url = `https://raw.githubusercontent.com/sean-reid/nyt-crosswords-data/main/${year}/${month}/${day}.json`
        fetch(url)
          .then(function(response){
            console.log(response)
            return response.text();
          })
          .then(function(myText) {
            const myJson = JSON.parse(myText);
            console.log(myJson);
            setData(myJson)
            console.log(data);
          });
      }
      fetchData();
      return () => {
        abortController.abort();
      }
    }


  const crossword = useRef();

  const focus = useCallback((event) => {
    crossword.current.focus();
  }, []);

  const fillAllAnswers = useCallback((event) => {
    crossword.current.fillAllAnswers();
  }, []);

  const reset = useCallback((event) => {
    crossword.current.reset();
  }, []);

  // We don't really *do* anything with callbacks from the Crossword component,
  // but we can at least show that they are happening.  You would want to do
  // something more interesting than simply collecting them as messages.
  const [messages, setMessages] = useState([]);

  const addMessage = useCallback((message) => {
    setMessages((m) => m.concat(`${message}\n`));
  }, []);

  // onCorrect is called with the direction, number, and the correct answer.
  const onCorrect = useCallback(
    (direction, number, answer) => {
      addMessage(`onCorrect: "${direction}", "${number}", "${answer}"`);
    },
    [addMessage]
  );

  // onLoadedCorrect is called with an array of the already-correct answers,
  // each element itself is an array with the same values as in onCorrect: the
  // direction, number, and the correct answer.
  const onLoadedCorrect = useCallback(
    (answers) => {
      addMessage(
        `onLoadedCorrect:\n${answers
          .map(
            ([direction, number, answer]) =>
              `    - "${direction}", "${number}", "${answer}"`
          )
          .join('\n')}`
      );
    },
    [addMessage]
  );

  // onCrosswordCorrect is called with a truthy/falsy value.
  const onCrosswordCorrect = useCallback(
    (isCorrect) => {
      addMessage(`onCrosswordCorrect: ${JSON.stringify(isCorrect)}`);
    },
    [addMessage]
  );

  // onCellChange is called with the row, column, and character.
  const onCellChange = useCallback(
    (row, col, char) => {
      addMessage(`onCellChange: "${row}", "${col}", "${char}"`);
    },
    [addMessage]
  );

  return (
    <Page>
      <Header>NYT Crosswords</Header>

      <p>
        Enter date of NYT crossword to solve.
      </p>
      <DatePicker value={startDate} autoFocus={false} maxDate={new Date(2017,11,1)} minDate={new Date(1976,0,1)} onChange={(date) => updateData(date)} />

      <Commands>
        <Command onClick={focus}>Focus</Command>
        <Command onClick={fillAllAnswers}>Fill all answers</Command>
        <Command onClick={reset}>Reset</Command>
      </Commands>

      <CrosswordWrapper>
        <Crossword
          data={data}
          ref={crossword}
          onCorrect={onCorrect}
          onLoadedCorrect={onLoadedCorrect}
          onCrosswordCorrect={onCrosswordCorrect}
          onCellChange={onCellChange}
        />
      </CrosswordWrapper>
    </Page>
  );
}

export default App;
