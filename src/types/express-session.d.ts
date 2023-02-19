export type SessionUser = {
    refresh_token: string;
    access_token: string;
};

declare module 'express-session' {
    interface SessionData {
        user: SessionUser;
    }
}
