import { ModelBase } from './ModeBase';

export interface WatchHistory extends ModelBase {
    userID: string;
    contentID: string;
    episodeID?: string;
    watchDate: string;
    durationWatched?: number;
    watchProgress?: number;
}
