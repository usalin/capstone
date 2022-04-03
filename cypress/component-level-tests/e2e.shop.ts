

// then add item - make sure that it can navigate to cart page 
// check data: gg


export function e2e_validate_shop_component() {
   return describe('[SHOP COMPONENT]: Starting Shop Component Valid Tests', () => {

      console.log('Logging from inside the shop component..');

      it('should be able to get the element by id..', () => {
         cy.url().should('include', '/shop');
         
         cy.CC_GET_ByCyId('featured-header').contains('X99');
         cy.CC_GET_ByCyId('featured-description').contains('Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.');

      });

      it('should be able to navigate to product detail on click', () => {          

         cy.get(':nth-child(1) > .info-container > .button-container > .button-white').click().wait(500);
      });
   });
}
