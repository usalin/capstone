import { CartItem } from './product.interface';

export interface Cart {
   id: string;
   items: CartItem[];
   shippingPrice?: number;
   username: string;
   total: number;
}
