import { Routes } from '@angular/router';
import { usersTable } from '../../users/users';
import { Dashboard } from '../dashboard';


export default [
    {path: '', component: Dashboard },
    { path: 'users', component: usersTable },
    { path: 'fees', loadChildren: () => import('../../fees/routes/fees.routes') },
    //{ path: 'error', component: Error },
    //{ path: 'login', component: Login }
] as Routes;