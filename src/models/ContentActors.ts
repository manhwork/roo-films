import { ModelBase } from './ModeBase';

export interface ContentActors extends ModelBase {
    contentID: string;
    actorID: string;
    role?: string;
    isMainCast: boolean;
}
