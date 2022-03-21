
export function e2e_validate_product_detail_component() {
   return describe('[PRODUCT DETAIL COMPONENT]: Starting Product Detail Component Valid Tests', () => {

      console.log('Logging from inside the Product Detail component..');

      it('should have correct data..', () => {
         cy.url().should('include', '/products/1');
         cy.get(':nth-child(2) > h4').contains('Some mysterious reviewer');
      });


   });
}

export function e2e_add_item_to_cart() {
   return describe('[PRODUCT DETAIL COMPONENT]: Starting PRODUCT DETAIL COMPONENT Valid Tests', () => {

      console.log('Logging from inside the PRODUCT DETAIL COMPONENT..');

      it('should be able to add an item to cart', () => {
         cy.get(':nth-child(3) > button > img').click().wait(100);
         cy.get(':nth-child(3) > button > img').click().wait(100);
         cy.get('.button-orange').click().wait(200);
      });

      it('should be able to navigate to cart', () => {
         cy.CC_GET_ByCyId('cart-icon').click().wait(2000);
      });
   });
}
