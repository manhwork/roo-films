import { ModelBase } from './ModeBase';

export interface User extends ModelBase {
    username: string;
    password: string;
    email: string;
    fullName?: string;
    avatar?: string;
    registerDate: string;
    lastLogin?: string;
    isActive: boolean;
    isAdmin: boolean;
}
