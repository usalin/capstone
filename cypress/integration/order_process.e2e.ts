import { e2e_login_submit_empty_form, e2e_login_submit_valid_form } from "cypress/component-level-tests/e2e.login";
import { e2e_add_item_to_cart, e2e_validate_product_detail_component } from "cypress/component-level-tests/e2e.product-detail";
import { e2e_register_submit_empty_form, e2e_register_submit_valid_form } from "cypress/component-level-tests/e2e.register";
import { e2e_validate_shop_component } from "cypress/component-level-tests/e2e.shop";


describe('[MAIN]: Create Register Component and start the workflow', () => {
   beforeEach(() => {
      cy.CC_LOGIN();
      });

   e2e_register_submit_empty_form();
   e2e_register_submit_valid_form();

   e2e_login_submit_empty_form();
   e2e_login_submit_valid_form();

   e2e_validate_shop_component();

   e2e_validate_product_detail_component();
   e2e_add_item_to_cart();
});
