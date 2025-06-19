import { ModelBase } from './ModeBase';

export interface Comment extends ModelBase {
    userID: string;
    contentID: string;
    episodeID?: string;
    parentCommentID?: string;
    content: string;
    commentDate: string;
    likeCount: number;
}
