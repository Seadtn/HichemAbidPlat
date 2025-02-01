import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li *ngIf="!item.separator" app-menuitem [item]="item" [index]="i" [root]="true" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{ exact: false }"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }]
            },
            {
                label: 'Overview',
                items: [
                    {
                        label: 'Learning Hub',
                        icon: 'pi pi-fw pi-book',
                        items: [
                            { label: 'Course Catalog', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Class Sessions', icon: 'pi pi-fw pi-clock' }
                        ]
                    },
                    { label: 'Classes', icon: 'pi pi-fw pi-briefcase', routerLink: ['/dashboard/Classes'] },
                    { label: 'Groups', icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/Groups'] },
                    { label: 'Calender', icon: 'pi pi-fw pi-calendar', routerLink: ['/dashboard/Calender'] }
                ]
            },
            {
                label: 'Users',
                items: [
                    {
                        label: 'Staff',
                        icon: 'pi pi-fw pi-star',
                        routerLink: ['/dashboard/users'],
                        routerLinkActive: 'active',
                        routerLinkActiveOptions: { exact: true } 
                    },
                    {
                        label: 'Candidates',
                        icon: 'pi pi-fw pi-users',
                        routerLink: '/dashboard/users',
                        queryParams: { type: 'Candidate' },
                        queryParamsHandling: 'merge',
                        routerLinkActive: 'active',
                        routerLinkActiveOptions: { exact: false }
                    },
                    {
                        label: 'Teachers',
                        icon: 'pi pi-fw pi-users',
                        routerLink: '/dashboard/users',
                        queryParams: { type: 'Teacher' },
                        queryParamsHandling: 'merge',
                        routerLinkActive: 'active',
                        routerLinkActiveOptions: { exact: false }
                    },
                    {
                        label: 'Visitors',
                        icon: 'pi pi-fw pi-users',
                        routerLink: '/dashboard/users',
                        queryParams: { type: 'Visitor' },
                        queryParamsHandling: 'merge',
                        routerLinkActive: 'active',
                        routerLinkActiveOptions: { exact: false }
                    }
                ]
            },
            {
                label: 'Fees Management',
                items: [
                    { label: 'Pending Dues', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/dashboard/PendingDues'] },
                    { label: 'Payment History', icon: 'pi pi-fw pi-clock', routerLink: ['/dashboard/PaymentHistory'] },
                    { label: 'Discounts & Offers', icon: 'pi pi-fw pi-tag', routerLink: ['/dashboard/Discounts'] },
                    { label: 'Reports', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/dashboard/Reports'] }
                ]
            },
            {
                label: 'Contact',
                items: [{ label: 'Messages', icon: 'pi pi-fw pi-envelope', routerLink: ['/dashboard/Messages'] }]
            },
            {
                label: 'UI Components',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/dashboard/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/dashboard/uikit/input'] },
                    { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/dashboard/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/dashboard/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/dashboard/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/dashboard/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/dashboard/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/dashboard/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/dashboard/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/dashboard/uikit/menu'] },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/dashboard/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/dashboard/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/dashboard/uikit/charts'] },
                    { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/dashboard/uikit/timeline'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/dashboard/uikit/misc'] }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/dashboard/pages/crud']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/dashboard/pages/empty']
                    }
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 1.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    },
                    {
                        label: 'Submenu 2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 2.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
