
# Project MusicPalace

This is the Capstone Project for Orion Innovation Turkey Angular Bootcamp.
I had two goals in this project: 

    * To practise concepts I have learnt through the program
    * Experiment with interesting technology 


## Features

- ECommerce App Core Functionalities
  * User Authentication 
    Utilizes a async validator to check if certain username is already used in register process
  * Restricted access to access the products
  * Displaying products
  * Searching products by product name -  Only allows searches with at least 3 characters long
  * Filtering products by category -  Available through navigation bar
  * Adding products to basket
  * Creating order after reviewing the basket

UI Demo - Pt1

https://user-images.githubusercontent.com/29346524/159333395-975d2c10-d8ad-486a-bcfd-d37aa16b8868.mp4

Demo - Pt2

https://user-images.githubusercontent.com/29346524/159334280-4027f5a8-9496-41e2-b08a-81b66d286981.mp4

- e2e testing with Cypress

Cypress Demo - Initial Setup


## Tech Stack

**Client-side:** Angular, Typescript, SCSS,  RxJS, Cypress, Angular Material

## Structure - Architectural Decisions

  For styling, SASS(SCSS) is used. All style files are inside shared folder to be fully reusable. That is also why no Angular component has a seperate styling file. The structure of the SCSS is based on 7-1 SASS pattern to certain extent. SCSS part utilizes mixins to rid of repeated code.

  For testing, Cypress is used. In the final version, all subject components will have their e2e files.
  General Methodology at component level:
   #1- Write failing tests
   #2 -Write passing tests to navigate to next step

   Extended custom commands in Cypress to make test functions, selectors more reusable


  In Angular side, aim is to make components reusable much as possible. Stick to clean code to as much as possible.
  Writing testable code. Still need to refactor to achieve this.


## Instructions to Use the App and Use e2e Testing with Cypress

Installation

```bash
 #1- Clone the project with git clone + repo-link
 #2- npm install -> to install dependencies
 #3- npm install -g json-server -> globally install jsonServer

```
Running the Project
```bash
#1- ng serve at project level
#2- json-server --watch db.json -> at src folder to be able to use existing mock data
#3- npm run cypress:open 
to able to run both application and e2e testing, all these steps must be run concurrently.
```
    
## Next Steps
              * UI fixes / Improvements
              * Work on NEST server
              * Experiment a11y library && Accessibility Improvements
              * Cypress %100 coverage
              * Extending Cypress Custom Commands

    * To practise concepts I have learnt through the program
    * Experiment with interesting technology 
