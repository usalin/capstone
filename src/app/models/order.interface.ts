
export interface Order {
   basketID: string;
   id: number;
   billingDetails: BillingDetails;
   shippingAddress: Address;
   paymentDetails: 'eMoney' | 'cashOnDelivery';
}

export interface BillingDetails {
   name: string;
   emailAddress: string;
   phoneNumber: string;
}

export interface Address {
   mailAdres: string;
   zipcode: string;
   city: string;
   country: string;
}


