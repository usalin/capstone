 
 export interface CartItem extends Product {
    quantity: number;
 }
 
 export interface Product {
    id: string;
    shortDescription: string;
    longDescription: string;
    productName: string;
    category: string;
    imageUrl: string;
    price: number,
    reviews?: Review[];
    productId: string;
 }

 export interface Review {
    reviewId: number;
    productId: number;
    review: string;
    author: string;
 }
