import { BasketItem } from "./product.interface";
import * as uuid from 'uuid';

export interface Basket {
   id?: string;
   items: BasketItem[];
   shippingPrice?: number;
}

export class BasketClass implements Basket {
   id =  uuid.v4();
   items: BasketItem[] = [];
}


export interface BasketCostDivision {
   subtotal: number;
   shipping: number;
   vat: number;
}
