This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## My Summary

This app is created by bootstrapping Create React App and adding no additional dependencies besides for Moment.js for date formatting. Given the size of the app and the time constraints I used pure React with Hooks instead of opting for a Redux based solution, however with more time that might have been an appropriate route. CSS is pure CSS and relatively minimal, so no styled components, though I'm familiar with them. App is minimally responsive in that the text sizes shrink on page shrink and everything remains predictably laid out using basic flexbox. There is a basic Jest snapshot test as well, though it isn't that useful without making requests first. All of the persistence is done using the browsers sessionStorage API to save all the variables collected through user input.