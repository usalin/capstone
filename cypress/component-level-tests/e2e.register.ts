

/**
 * 
 * @returns Failing Test - Makes sure user gets the errors
 */
export function e2e_register_submit_empty_form() {
   return describe('[REGISTER COMPONENT]: Starting Register Component Failing Tests', () => {

      console.log('Logging from inside the register component..');

      it('should be able to get the element by id..', () => {
         cy.visit('/register');
         cy.wait(2000);
         cy.CC_GET_ByCyId('subheader').contains('Register to use this amazing app!');
      });

      it('should submit the form without supplying any info', () => {
         cy.CC_GET_FormContinueButton().click().wait(200);
         cy.get('.error').should('have.length', 3);
      })
   });
}

export function e2e_register_submit_valid_form() {
   return describe('[REGISTER COMPONENT]: Starting Register Component Valid Tests', () => {

      console.log('Logging from inside the register component..');

      it('should be able to get the element by id..', () => {
         cy.visit('/register');
         cy.wait(2000);
         cy.CC_GET_ByCyId('subheader').contains('Register to use this amazing app!');
      });

      it('should submit the form after supplying relevant data', () => {
            
         
         cy.CC_GET_ByCyId('usernameInput').type('gaga');
         cy.CC_GET_ByCyId('passwordInput').type('123');
         cy.CC_GET_ByCyId('passwordConfirmationInput').type('123');

         cy.CC_GET_FormContinueButton().click().wait(200);
         cy.get('.error').should('have.length', 0);
         cy.url().should('include', '/login');
      });
   });
}
