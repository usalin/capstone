 
 export interface BasketItem extends Product {
    quantity: number;
 }
 
 export interface Product {
    id?: number;
    shortDescription: string;
    longDescription: string;
    productName: string;
    category: string;
    smallImageUrl: string;
    price: number,
    largerImageUrl: string;
    reviews?: Review[];
 }

 export interface Review {
    id: number;
    productId: number;
    review: string;
    
 }