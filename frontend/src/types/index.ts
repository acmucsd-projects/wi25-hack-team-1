export interface Post {
  _id: string;
  creator: User;
  flightDay: Date;
  time: Date;
  airport: string;
  luggage: {
    carryOn: number;
    checked: number;
  };
  numPassengers: number;
  passengers: string[];
  creatorGender: "Male" | "Female" | "Other";
}

export interface User {
  uid: string;
  name: string;
  uni: string; // <TODO> Will need to be validated
  email: string;
  phone: string;
  gender: string;
  photoURL: string; //Google profile picture
}
