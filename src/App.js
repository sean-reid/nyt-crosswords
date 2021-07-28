import React, { useCallback, useRef, useState, useEffect } from 'react';
import Crossword from '@jaredreisinger/react-crossword';
import DatePicker from 'react-date-picker';
import styled from 'styled-components';
import { Route, Switch, Link } from "react-router-dom";

const dataStart = {
  across: {
    1: {
      clue: '',
      answer: '',
      row: 0,
      col: 0,
    },
  },
  down: {
    1: {
      clue: '',
      answer: '',
      row: 0,
      col: 0,
    },
  },
};

const Page = styled.div`
  padding: 2em;
`;

const Header = styled.h1`
  margin-bottom: 1em;
`;

const Commands = styled.div``;

const Command = styled.button`
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
  const [startDate, setStartDate] = useState(new Date());
  
  function updateData(startDate) {
    setStartDate(startDate)
    const year = startDate.getFullYear();
    const month = startDate.getMonth().toString().padStart(2, 0);
    const day = startDate.getDay().toString().padStart(2, 0);
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
      <DatePicker value={startDate} autoFocus={true} onChange={(date) => updateData(date)} />

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
