 /**
  * CANNOT EXTEND PRODUCT DUE TO CONFLICT IN THE BACKEND
  */
 export interface CartItem  {
   id?: string;
   shortDescription: string;
   longDescription?: string;
   productName: string;
   category: string;
   price: number,
   productId?: string; 
   quantity: number;
   imageUrl: string;
}
 
 export interface Product {
    id: string;
    shortDescription: string;
    longDescription?: string;
    productName: string;
    category: string;
    imageUrl: string;
    price: number,
    reviews?: Review[];
    productId?: string;
 }

 export interface Review {
    reviewId: number;
    productId: number;
    review: string;
    author: string;
 }
