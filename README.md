# Client - v1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.3.

## Installation Notes

Run `npm install` to install project dependencies.
Install json server globally with:  `npm install -g json-server`
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 
Concurrently run `json-server -


-watch db.json` under src directory to use existing mock data file db.json.


## UI Snapshots
https://user-images.githubusercontent.com/29346524/157937216-717cb72b-8c07-4da8-a4c0-03533b885057.mp4


## Custom Validators
  * passwordMatchValidator - validates that user inputs password - and password confirm fields match in the register form. Needed it to make sure that user doesn't accidentally create an account.
  * validateUsernameNotTaken - validates that a username doesn't already exist. Needed for integrity of the mock database.



To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
