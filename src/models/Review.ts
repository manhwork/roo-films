import { ModelBase } from './ModeBase';

export interface Review extends ModelBase {
    userID: string;
    contentID: string;
    rating?: number;
    comment?: string;
    reviewDate: string;
    likeCount: number;
}
