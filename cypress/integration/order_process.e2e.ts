import { e2e_login_submit_empty_form, e2e_login_submit_valid_form } from "cypress/component-level-tests/e2e.login";
import { e2e_add_item_to_cart, e2e_validate_product_detail_component } from "cypress/component-level-tests/e2e.product-detail";
import { e2e_register_submit_empty_form, e2e_register_submit_valid_form } from "cypress/component-level-tests/e2e.register";
import { e2e_validate_shop_component } from "cypress/component-level-tests/e2e.shop";


describe('[MAIN]: Create Register Component and start the workflow', () => {
   //NOTE TO SELF: You can use beforeEach and cy.intercept to intercept http requests..
   e2e_register_submit_empty_form();
   e2e_register_submit_valid_form();
});

describe('[MAIN]: Create Login Component and continue the workflow', () => {
   e2e_login_submit_empty_form();
   e2e_login_submit_valid_form();
});


describe('[MAIN]: Shop Component intro', () => {
   e2e_validate_shop_component();
});


describe('[MAIN]: Product Detail Component intro', () => {
   e2e_validate_product_detail_component();
   e2e_add_item_to_cart();
});
