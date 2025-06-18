import { ModelBase } from './ModeBase';

export interface TourCategory extends ModelBase {
    title: string;
    image: string;
    description: string;
    status: string;
    position: number;
    deleted: boolean;
}
