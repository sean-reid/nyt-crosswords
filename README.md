# NYT Crosswords
Play most New York Times crosswords from 1976 to 2017 in the browser!

<a href="https://www.buymeacoffee.com/seanreid" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

## Background
For years I've wanted a simple, ad-free interface to play crosswords online. The New York Times has a stellar collection of crosswords spanning several years, however it is locked behind a paywall and littered with ads.

Fortunately for me, I stumbled upon two projects that were critical to developing this project:
* [a repo](https://github.com/doshea/nyt_crosswords) of scraped crosswords from the NYT, available as a crude JSON API.
* [`react-crossword`](https://www.npmjs.com/package/@jaredreisinger/react-crossword/v/5.1.0), a crossword component for React apps that is available as an npm package.

Using [doshea](https://github.com/doshea)'s repo, I converted the scraped JSON data into a format compatible with `react-crossword` using a Python script. This data is available as another crude API, hosted in a [GitHub repo](https://github.com/sean-reid/nyt-crosswords-data).

Then it was just a matter of integrating a [date picker](https://www.npmjs.com/package/react-date-picker) into the React app, allowing users to select a crossword.

## Features

With this interface, users can select a crossword date (between 1/1/1976 and 12/1/2017, with some gaps in coverage), and enter answers to each across/down question. Whenever a question is answered correctly, it is crossed out and a green check appears next to the question. Users can also choose to reveal all answers, or reset the board.

## Development

The following instructions are for curious developers who want to fork the code and build something of their own.

### Setup

Install dependancies with:
```
yarn install
```

### Build

Build locally with:
```
yarn run predeploy
```

Or build for production and move all built code to `/docs` with:
```
yarn run build
```

### Run
You can run the React app locally wih the following:
```
yarn run start
```

### Deploy
Deploy to GitHub Pages with:
```
yarn run deploy
```

## Author
* Sean Reid
