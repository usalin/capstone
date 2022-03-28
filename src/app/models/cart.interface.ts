import { CartItem } from './product.interface';

export interface Cart {
   id: string;
   items: CartItem[];
   shippingPrice?: number;
   username: string;
}

export interface CartCostDivision {
   subtotal: number;
   shipping: number;
   vat: number;
}
