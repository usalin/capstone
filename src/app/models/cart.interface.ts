import * as uuid from 'uuid';
import { CartItem } from './product.interface';

export interface Cart {
   id?: string;
   items: CartItem[];
   shippingPrice?: number;
}

export class   CartClass implements Cart {
   items: CartItem[] = [];
}

export interface CartCostDivision {
   subtotal: number;
   shipping: number;
   vat: number;
}
