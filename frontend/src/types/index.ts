export interface Post {
    _id: string;
    creatorId: User;
    flightDay: Date;
    time: Date;
    airport: string;
    luggage: {
        carryOn: number;
        checked: number;
    };
    numPassengers: number;
    passengers: string[];
}

export interface User {
    uid: string;
    firstName: string;
    lastName: string;
    uni: string; // <TODO> Will need to be validated
    email: string;
    phone: string
    gender: string;
    photoURL: string; //Google profile picture
}