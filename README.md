
# Project Music Palace

This is the Capstone Project for Orion Innovation Turkey Angular Bootcamp.
I had two goals in this project: 

    * To practise concepts I have learnt through the program
    * Experiment with interesting technology 


## Features

- ECommerce App Core Functionalities
  * User Authentication 
    Utilizes an async validator to check if certain username is already used in register process
  * Restricted access to access the products
  * Displaying products
  * Searching products by product name -  Only allows searches with at least 3 characters long
  * Filtering products by category -  Available through navigation bar
  * Adding products to basket
  * Creating order after reviewing the basket
  * Switching Products View Card / Table Based on User Preference
  * RBAC 
  * Admin Panel
  * Multiple Filtering
  * Prevent Unsaved Changes Guard 
  * and more

UI Demo - Pt1 - User View
https://user-images.githubusercontent.com/29346524/162282869-e316577a-bdf5-4a43-89bc-4e9154fd569b.mp4

UI Demo - Pt2 - Admin View
https://user-images.githubusercontent.com/29346524/162282943-882be601-d9b3-480d-b648-c2df92f82a21.mp4


UI Demo - Pt3 - Cypress View
// Need to re-record with UI Changes

- e2e testing with Cypress

Cypress Demo - Initial Setup (Note that this setup doesn't cover the entire process at the moment.)

https://user-images.githubusercontent.com/29346524/159342189-61a452f7-0b32-4906-ac4d-d28f9f575419.mp4

## Tech Stack

**Client-side:** Angular, Typescript, SCSS,  RxJS, Cypress, Angular Material
**Server-side:** Nest.JS, PostgreSQL, FirebaseStorage


## Structure - Architectural Decisions

  For styling, SASS(SCSS) is used. All style files are inside shared folder to be fully reusable. That is also why no Angular component has a seperate styling file. The structure of the SCSS is based on 7-1 SASS pattern to certain extent. SCSS part utilizes mixins to rid of repeated code.

  For testing, Cypress is used. In the final version, all subject components will have their e2e files.
  General Methodology at component level:
   #1- Write failing tests
   #2 -Write passing tests to navigate to next step

   Extended custom commands in Cypress to make test functions, selectors more reusable


  In Angular side, aim is to make components reusable much as possible. Stick to clean code to as much as possible.
  Writing testable code. Still need to refactor to achieve this.

  -FirebaseStorage is used to upload Product Photos
  -This app currently uses NEST.JS server for server side . Swagger Documentation can be found here.

  https://music-palace.herokuapp.com/api/#/

  ![Swagger Image](https://firebasestorage.googleapis.com/v0/b/ecommerceaudio.appspot.com/o/uploads%2Fswagger.png?alt=media&token=650f8c4d-ab26-4707-8480-e1211286aa86 "Swagger Image")



## Instructions to Use the App and Use e2e Testing with Cypress

Installation

```bash
 #1- Clone the project with git clone + repo-link
 #2- npm install -> to install dependencies
```
Running the Project
```bash
#1- ng serve at project root level
#2- npm run cypress:open 
to able to run both application and e2e testing, these steps must be run concurrently.
```
    
## Next Steps
              * UI fixes / Improvements
              * Cypress %100 coverage
              * Extending Cypress Custom Commands
              * Extending core functionality
              
