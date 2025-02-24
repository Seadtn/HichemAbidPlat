import { Routes } from '@angular/router';
import { PendingDuesComponent } from '../pendingDues';
import { DiscountsComponent } from '../discountOffers';
import { ReportsComponent } from '../reports';

export default [
    { path: 'pending-dues', component: PendingDuesComponent },
    { path: 'discounts', component: DiscountsComponent },
    { path: 'reports', component: ReportsComponent }
] as Routes;
