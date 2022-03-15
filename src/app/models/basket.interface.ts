import { BasketItem } from "./product.interface";

export interface Basket {
   id: string;
   items: BasketItem[];
   deliveryMethodId?: number;
   shippingPrice?: number;
}