import { CartItem } from "./product.interface";

export interface Order extends OrderInformation {
   cartItems: CartItem[];
   id: number;
}

export interface OrderInformation {
   name: string;
   email: string;
   phoneNumber: string;
   address: string;
   zipcode: string;
   city: string;
   country: string;
   paymentMethod: string;
}

