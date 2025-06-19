import { ModelBase } from './ModeBase';

export interface Watchlist extends ModelBase {
    userID: string;
    contentID: string;
    addedDate: string;
}
