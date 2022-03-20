 
 export interface CartItem extends Product {
    quantity: number;
 }
 
 export interface Product {
    id: number;
    shortDescription: string;
    longDescription: string;
    productName: string;
    category: string;
    imageUrl: string;
    price: number,
    reviews?: Review[];
 }

 export interface Review {
    reviewId: number;
    productId: number;
    review: string;

 }