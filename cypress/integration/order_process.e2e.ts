import { e2e_login_submit_empty_form, e2e_login_submit_valid_form } from "cypress/component-level-tests/e2e.login";
import { e2e_register_submit_empty_form, e2e_register_submit_valid_form } from "cypress/component-level-tests/e2e.register";


describe('[MAIN]: Create Register Component and start the workflow', () => {
   //you can use beforeEach and cy.intercept to intercept http requests..
   e2e_register_submit_empty_form();
   e2e_register_submit_valid_form();
});

describe('[MAIN]: Create Login Component and continue the workflow', () => {
   //you can use beforeEach and cy.intercept to intercept http requests..
   e2e_login_submit_empty_form();
   e2e_login_submit_valid_form();
});

