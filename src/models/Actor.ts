import { ModelBase } from './ModeBase';

export interface Actor extends ModelBase {
    name: string;
    originalName?: string;
    bio?: string;
    birthDate?: string;
    nationality?: string;
    photoURL?: string;
}
