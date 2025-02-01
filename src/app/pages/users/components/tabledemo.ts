import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { Representative, CustomerService, Customer } from '../../service/customer.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { ActivatedRoute } from '@angular/router';
import { UserDetailsDialogComponent } from './userDetailsDialog';
import { EditUserDialogComponent } from './userEditDialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AddUserDialogComponent } from "./addUserDialog";

@Component({
    selector: 'app-table-demo',
    standalone: true,
    imports: [
    TableModule,
    MultiSelectModule,
    SelectModule,
    InputIconModule,
    TagModule,
    InputTextModule,
    SliderModule,
    ProgressBarModule,
    ToggleButtonModule,
    ToastModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    RatingModule,
    RippleModule,
    BreadcrumbModule,
    DropdownModule,
    IconFieldModule,
    UserDetailsDialogComponent,
    EditUserDialogComponent,
    ConfirmDialogModule,
    AddUserDialogComponent
],
    template: `
        <div class="card">
            <p-breadcrumb [model]="items"></p-breadcrumb>
            <p-table
                #dt1
                [value]="users"
                dataKey="id"
                [rows]="10"
                [loading]="loading"
                [rowHover]="true"
                [showGridlines]="true"
                [paginator]="true"
                [globalFilterFields]="['name', 'position', 'department', 'email', 'phone', 'status']"
                responsiveLayout="scroll"
            >
                <ng-template #caption>
                    <div class="flex justify-between items-center flex-column sm:flex-row">
                        <button pButton label="Clear" class="p-button-outlined mb-2" icon="pi pi-filter-slash" (click)="clear(dt1)"></button>
                        <div class="flex">
                            <p-iconfield iconPosition="left" class="ml-auto">
                                <input pInputText type="text" (input)="onGlobalFilter(dt1, $event)" placeholder="Search keyword" />
                                <p-inputIcon class="pi pi-search"></p-inputIcon>
                            </p-iconfield>
                            <button pButton [label]="getUserType()" class="p-button w-[180px] ml-4" icon="pi pi-plus" (click)="openAddUser()"></button>
                        </div>
                    </div>
                </ng-template>
                <ng-template #header>
                    <tr>
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Full Name
                                <p-columnFilter type="text" field="fullname" display="menu" placeholder="Search by name" [showAddButton]="false"></p-columnFilter>
                            </div>
                        </th>
                        <th style="min-width: 12rem" *ngIf="type == 'Staff'">
                            <div class="flex justify-between items-center">
                                Position
                                <p-columnFilter type="text" field="position" display="menu" placeholder="Search by position" [showAddButton]="false"></p-columnFilter>
                            </div>
                        </th>
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Cin
                                <p-columnFilter type="text" field="cin" display="menu" placeholder="Search by cin" [showAddButton]="false"></p-columnFilter>
                            </div>
                        </th>
                        <th style="min-width: 14rem" *ngIf="type == 'Staff'">
                            <div class="flex justify-between items-center">
                                Department
                                <p-columnFilter type="text" field="department" display="menu" placeholder="Search by department" [showAddButton]="false"></p-columnFilter>
                            </div>
                        </th>
                        <th style="min-width: 14rem">
                            <div class="flex justify-between items-center">
                                Email
                                <p-columnFilter type="text" field="email" display="menu" placeholder="Search by email" [showAddButton]="false"></p-columnFilter>
                            </div>
                        </th>
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Phone
                                <p-columnFilter type="numeric" field="phone" display="menu" placeholder="Search by phone" [showAddButton]="false"></p-columnFilter>
                            </div>
                        </th>
                        <th style="min-width: 10rem">
                            <div class="flex justify-between items-center">
                                Status
                                <p-columnFilter field="status" matchMode="equals" display="menu" [showAddButton]="false">
                                    <ng-template #filter let-value let-filter="filterCallback">
                                        <p-dropdown [ngModel]="value" [options]="statuses" (onChange)="filter($event.value)" placeholder="Any">
                                            <ng-template let-option #item>
                                                <span class="p-badge p-badge-{{ option.value }}">{{ option.label }}</span>
                                            </ng-template>
                                        </p-dropdown>
                                    </ng-template>
                                </p-columnFilter>
                            </div>
                        </th>
                        <th style="min-width: 8rem">
                            <div class="flex justify-between items-center">Actions</div>
                        </th>
                    </tr>
                </ng-template>
                <ng-template #body let-user>
                    <tr class="cursor-pointer group" (click)="onRowSelect(user)">
                        <td>{{ user.fullname }}</td>
                        <ng-container *ngIf="type === 'Staff'">
                            <td>{{ user.position }}</td>
                            <td>{{ user.department }}</td>
                        </ng-container>
                        <td>{{ user.cin }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.phone }}</td>
                        <td>
                            <p-tag [value]="user.status" [severity]="getSeverity(user.status)" styleClass="dark:!bg-surface-900" />
                        </td>
                        <td class="text-center">
                            <button pButton icon="pi pi-pencil" class="p-button-success p-button-sm mr-2" (click)="editStaff(user); $event.stopPropagation()"></button>
                            <button pButton icon="pi pi-trash" class="p-button-danger p-button-sm" (click)="confirmDelete(user, $event); $event.stopPropagation()"></button>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #loadingbody>
                    <tr>
                        <td colspan="7">Loading {{ type }} data. Please wait...</td>
                    </tr>
                </ng-template>
            </p-table>
            <p-confirmDialog></p-confirmDialog>

            <user-details-dialog [visible]="displayDialog" [user]="selectedUser" (closeDialog)="displayDialog = false"> </user-details-dialog>
            <edit-user-dialog [visible]="displayEditDialog" [user]="selectedUser" (closeDialog)="displayEditDialog = false"> </edit-user-dialog>
            <add-user-dialog [visible]="displayAddDialog" (closeDialog)="displayAddDialog = false" (userAdded)="addUser($event)"> </add-user-dialog>
        </div>
    `,
    styles: `
        .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        .p-datatable-scrollable .p-frozen-column {
            font-weight: bold;
        }
    `,
    providers: [ConfirmationService, MessageService, CustomerService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableDemo implements OnInit {
    items: MenuItem[] = [];

    selectedUser: Customer | null = null;

    users: Customer[] = [];

    statuses: any[] = [];

    displayDialog: boolean = false;

    displayEditDialog: boolean = false;

    displayAddDialog : boolean = false;
    rowGroupMetadata: any;

    expandedRows: { [key: string]: boolean } = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    balanceFrozen: boolean = false;

    loading: boolean = true;

    type: string = '';
    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private customerService: CustomerService,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.subscribeToQueryParams();

        this.customerService.getCustomersXLarge(this.type).then((data) => {
            this.users = data;
            this.loading = false;
        });

        this.statuses = [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' }
        ];
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes['type']) {
            this.subscribeToQueryParams();
        }
    }
    getUserType(): string {
        switch (this.type) {
            case 'Teacher':
                return 'New Teacher';
            case 'Candidate':
                return 'New Candidate';
            case 'Visitor':
                return 'New Visitor';
            default:
                return 'New Staff Member';
        }
    }
    private subscribeToQueryParams() {
        this.route.queryParams.subscribe((params) => {
            this.loading = true;
            this.type = params['type'] || 'Staff';
            this.items = [
                { label: 'Dashboard', url: '/dashboard' },
                { label: 'Users', url: this.type === 'Staff' ? '/dashboard/users' : `/dashboard/users?type=${this.type}` },
                {
                    label: this.type === 'Staff' ? 'Staff' : `${this.type}s`
                }
            ];

            this.customerService.getCustomersXLarge(this.type).then((data) => {
                this.users = data;
                this.loading = false;
            });
        });
    }
    onRowSelect(user: Customer) {
        this.selectedUser = user;
        this.displayDialog = true;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    getSeverity(status: string) {
        switch (status) {
            case 'active':
            case 'instock':
            case 'INSTOCK':
            case 'DELIVERED':
            case 'delivered':
                return 'success';

            case 'negotiation':
            case 'lowstock':
            case 'LOWSTOCK':
            case 'PENDING':
            case 'pending':
                return 'warn';

            case 'unqualified':
            case 'inactive':
            case 'OUTOFSTOCK':
            case 'CANCELLED':
            case 'cancelled':
                return 'danger';

            default:
                return 'info';
        }
    }
    confirmDelete(user: any, event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: `Are you sure you want to delete <b>${user.fullname}</b>? This action cannot be undone.`,
            header: 'Confirm Deletion',
            icon: 'pi pi-trash',
            rejectLabel: 'Cancel',
            acceptLabel: 'Yes, Delete',
            rejectButtonStyleClass: 'p-button p-button-secondary',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.deleteStaff(user);
            }
        });
    }
    openAddUser(){
        this.displayAddDialog = true
    }
    addUser(user :any){
        this.users.push(user);
    }
    editStaff(user: Customer) {
        this.selectedUser = user;
        console.log('Editing staff:', user);
        this.displayEditDialog = true;
        // TODO Add logic to edit staff details
    }

    deleteStaff(staff: Customer) {
        this.users = this.users.filter((val) => val.id !== staff.id);
        // TODO Add logic to delete  staff
    }
}
