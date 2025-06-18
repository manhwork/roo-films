import { ModelBase } from './ModeBase';

export interface TourBooking extends ModelBase {
    contact_info: {
        name: string;
        phone: string;
        email: string;
    };
    tour_id: {
        _id: string;
    };
    start_date: string;
    number_of_people: number;
    note: string;
    status: string;
    total_price: number;
    payment_status: string;
    payment_method: string;
    deleted: boolean;
    booking_date: string;
}
