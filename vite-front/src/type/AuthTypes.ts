export interface LoginRequestProps {
    user_id: string;
    user_password: string;
}

export interface LoginResponseProps {
    message?: string;
    token: string;
    Auth: boolean;
}
