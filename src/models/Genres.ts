import { ModelBase } from './ModeBase';

export interface Genres extends ModelBase {
    genreName: string;
    description?: string;
}
