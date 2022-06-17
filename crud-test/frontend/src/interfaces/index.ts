export interface IResRegisterOrLogin {
    user: {
        email: string;
        id: number;
        name: string;
    };
    token: string;
};


export interface IResUser {
    id: number;
    name: string;
    email: string;
};



export interface IResProfile {
    user: {
        createGroup: object[];
        email: string;
        id: number;
        name: string;
    };
    followGroup: string[];
    friends: string[];
}