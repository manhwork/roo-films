import { ModelBase } from './ModeBase';

export interface Episode extends ModelBase {
    seasonID: string;
    episodeNumber: number;
    title: string;
    description?: string;
    duration?: number;
    videoURL?: string;
    thumbnailURL?: string;
    releaseDate?: string;
    viewCount: number;
}
