

/**
 * 
 * @returns Failing Test - Makes sure user gets the errors
 */
export function e2e_login_submit_empty_form() {
   return describe('[LOGIN COMPONENT]: Starting Login Component Failing Tests', () => {

      console.log('Logging from inside the login component..');

      it('should be able to get the element by id..', () => {
         cy.visit('/login');
         cy.wait(2000);
         cy.CC_GET_ByCyId('subheader').contains('Sign in and use this amazing app!');
      });

      it('should submit the form without supplying any info', () => {
         cy.CC_GET_FormContinueButton().click().wait(200);
         cy.get('.error').should('have.length', 2);
      })
   });
}

export function e2e_login_submit_valid_form() {
   return describe('[LOGIN COMPONENT]: Starting LOGIN Component Valid Tests', () => {

      console.log('Logging from inside the login component..');

      it('should be able to get the element by id..', () => {
         cy.visit('/login');
         cy.wait(2000);
         cy.CC_GET_ByCyId('subheader').contains('Sign in and use this amazing app!');
      });

      it('should submit the form after supplying relevant data', () => {
            
         
         cy.CC_GET_ByCyId('usernameInput').type('ugur.ss');
         cy.CC_GET_ByCyId('passwordInput').type('asdsadsadsasda12.3As');

         cy.CC_GET_FormContinueButton().click().wait(2000);
         cy.get('.error').should('have.length', 0);
         cy.url().should('include', '/shop');
      });

      it('should get authenticated', () => {
         cy.CC_LOGIN();
      })
   });
}
