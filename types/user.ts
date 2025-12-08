// types/user.ts

export type UserId = string;

export type User = {
    id: UserId;
    name: string;
    email: string;
    photoURL?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
};
