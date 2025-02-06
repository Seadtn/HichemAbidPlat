import { Routes } from '@angular/router';
import { PendingDuesComponent } from '../pendingDues';
import { PaymentHistoryComponent } from '../paymentHistory';
import { DiscountsComponent } from '../discountOffers';
import { ReportsComponent } from '../reports';

export default [
    { path: 'pending-dues', component: PendingDuesComponent },
    { path: 'payment-history', component: PaymentHistoryComponent },
    { path: 'discounts', component: DiscountsComponent },
    { path: 'reports', component: ReportsComponent }
] as Routes;
