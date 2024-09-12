export interface UserTypeGet {
    id?: number;
    email?: string;
    nickname?: string;
    avatar?: string;
}
export interface UserTypePost {
    id?: number;
    email: string;
    password: string;
    nickname?: string;
    avatar?: string;
}

