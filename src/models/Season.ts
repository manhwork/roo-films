import { ModelBase } from './ModeBase';

export interface Season extends ModelBase {
    contentID: string;
    seasonNumber: number;
    title?: string;
    posterURL?: string;
    releaseDate?: string;
    episodeCount: number;
}
