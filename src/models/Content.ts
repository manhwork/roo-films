import { ModelBase } from './ModeBase';

export interface Content extends ModelBase {
    title: string;
    originalTitle?: string;
    description?: string;
    type: 'movie' | 'tvshow';
    releaseDate?: string;
    imdbRating?: number;
    posterURL?: string;
    backdropURL?: string;
    trailerURL?: string;
    videoURL?: string;
    duration?: number;
    numberOfSeasons?: number;
    status?: 'Ongoing' | 'Completed' | 'Canceled';
    viewCount: number;
    country?: string;
    language?: string;
    createdAt: string;
    updatedAt: string;
}
