export interface Summary {
    totalRevenue: number;
    totalBooking: {
        total: number;
        pending: number;
        completed: number;
        cancelled: number;
    };
    totalTour: {
        total: number;
        active: number;
        inactive: number;
        ended: number;
    };
    totalCustomers: number;
}
