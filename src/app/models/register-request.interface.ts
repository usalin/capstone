export interface RegisterResponseUserInterface extends RegisterRequestUserInterface {
   id: number;
}

export interface RegisterRequestUserInterface {
   username: string;
   password: string;
   email: string;
   cartId: string;
}