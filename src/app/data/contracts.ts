export interface IUserIn {
    email: string;
    firebaseId: string;
    username: string;
    password: string;
}

export interface ISleep {
    childId: string;
    duration?: number;
    details: ISleepDetails;
    startDate: Date;
    endDate: Date;
}

export interface ISleepDetails {
    howItHappenedIds?: string[];
    sleepStartIds?: string[];
    endOfSleepIds?: string[];
    notes?: string;
}

export interface IChild {
    id: string,
    name: string
}

export interface ISetting {
    key: string;
    value: string;
}

export interface ISleepDetailOptions {
    howSleepHappened: { [key: string]: string };
    startOfSleepDetails: { [key: string]: string };
    endOfSleepDetails: { [key: string]: string };
}

export interface IDetails {
    id: string;
    description: string;
}

export interface IFood {
    childId: string;
    duration: number;
    notes?: string;
    startDate: Date;
    endDate: Date;
    foodType: string;
}

export interface IPumping {
    childId: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    total: number;
    left?: number;
    right?: number;
    notes?: string;
}

export interface ISolids {
    childId: string;
    startTime: Date;
    food: string[];
    reactions?: string[];
    notes?: string;
}

export interface ISolidFoodOptions {
    Id: string;
    Name: string;
}

export interface IDiaperDetails {
    type: string;
    startTime: Date;
    childId: string;
    diaperType?: string;
    diaperSize?: string;
    peeSize?: string;
    diaperColor?: string;
    diaperDescription?: string;
    pottyDetails?: string;
    diaperRash?: boolean;
    notes?: string;
}
