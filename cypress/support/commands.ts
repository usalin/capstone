// https://on.cypress.io/custom-commands
// https://github.com/cypress-io/add-cypress-custom-command-in-typescript


export { }

export type HtmlTag = 'input' | 'div' | 'span' | 'i' | 'button';


// STEP 1: DEFINE TYPE
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * @CustomCommand Selects the element with `button[data-cy-id="{id}"]`
       */
      CC_GET_Button(id: string): Chainable<JQuery<HTMLElement>>;

      /**
       * @CustomCommand Selects the element with `[data-cy-id="{id}"]`
       * @param id 
       * @param htmlTag optional, this can improve readablility of test
       */
      CC_GET_ByCyId(id: string, htmlTag?: HtmlTag): Chainable<JQuery<HTMLElement>>;

      /**
       * @CustomCommand Selects the element with `button[data-cy-id="continue"]`
       */
      CC_GET_FormContinueButton(): Chainable<JQuery<HTMLElement>>;

      /**
       * @CustomCommand Selects the element with `[data-cy-id="field:{id}"]`
       * @param id 
       */
      CC_GET_FormControlById(id: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Test to check string contains only Alphabetetical characters. 
       * @param inputName 
       */
      CC_TEST_NameField(inputName: string): void;
    }
  }
}

// STEP 2: DEFINE IMPLEMENTATION
// STEP 2.1: GET COMMANDS

function CC_GET_Button(id: string) {
  return cy.CC_GET_ByCyId(id, 'button');
}

function CC_GET_ByCyId(id: string, htmlTag?: HtmlTag) {
  if (htmlTag) return cy.get(`${htmlTag}[data-cy-id="${id}"]`);
  else return cy.get(`[data-cy-id="${id}"]`);
}

function CC_GET_FormContinueButton() {
  return cy.CC_GET_Button('continue');
}

function CC_GET_FormControlById(id: string) {
  return cy.get(`[data-cy-id="field:${id}"]`);
}



// STEP 3: ADD IT TO THE CYPRESS GLOBAL OBJECT
// STEP 3.1: GET COMMANDS
Cypress.Commands.add("CC_GET_Button", CC_GET_Button);
Cypress.Commands.add("CC_GET_ByCyId", CC_GET_ByCyId);
Cypress.Commands.add("CC_GET_FormContinueButton", CC_GET_FormContinueButton);
Cypress.Commands.add("CC_GET_FormControlById", CC_GET_FormControlById);
// STEP 3.2: TEST COMMANDS
