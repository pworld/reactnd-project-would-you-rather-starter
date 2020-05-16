# Chirper Project

This projects contain simple choice game between two options.
Default User:
1. username: sarahedo | password: password
2. username: tylermcginnis | password: password
3. username: johndoe | password: password

User can create User and login using that informations


## Project Setup

* clone the Project - `git@github.com:pworld/reactnd-project-would-you-rather-starter.git`
* install the dependencies - `npm install`
* for running - `npm start`


// TODO

This projects is full managements state and props React Redux without database. Fake database inserted as Plain Text with json in utils folder.
User can register, login, add question, choose question, view voting results and leaderboard using only managements state and props. 
Every reload, typing in URL browser will remove all stored state and props, as a results users will be redirected to Login or 404 page

Projects Structures:

├── public                  # Assets Publics
├── src                     # Source files
    ├── actions             # Actions Logic
    ├── components          # React Components
        ├── general         # React Components General Page
        ├── leaderboard     # React Components Leaderboard Page
        ├── questions       # React Components Questions Page
        ├── AppComponents   # React Routing Components
    ├── middleware          # Middleware React
    ├── reducers            # Redux Reducers
    ├── utils               # Helpers, API, Data Sources

└── README.md