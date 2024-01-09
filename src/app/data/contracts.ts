export interface IUserIn {
    email: string;
    password: string;
    username: string;
}

export interface ISleep {
    childId: string;
    duration?: number;
    details: ISleepDetails;
    startDate: Date;
    endDate: Date;
}

export interface ISleepDetails {
    how?: string;
    start?: string;
    end?: string;
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