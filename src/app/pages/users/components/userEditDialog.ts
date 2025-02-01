import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Customer } from '../../service/customer.service';
import { FormsModule } from '@angular/forms';
import { Accordion, AccordionModule } from 'primeng/accordion';
import { Tag } from 'primeng/tag';

@Component({
    selector: 'edit-user-dialog',
    standalone: true,
    imports: [CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule, Tag, AccordionModule],
    template: `
        <p-dialog header="Edit User" [(visible)]="visible" [modal]="true" [style]="{ width: '50vw' }" [contentStyle]="{ overflow: 'auto', 'max-height': '60vh' }" [closable]="true" (onHide)="close()">
            <div>
                <div class="flex">
                    <h2 class="text-start text-2xl mt-2">{{ user?.fullname }}</h2>
                    <div class="ml-2">
                        <p-tag [value]="user?.status" [severity]="user?.status === 'active' ? 'success' : 'danger'"></p-tag>
                    </div>
                </div>

                <p class="text-start text-sm text-500">{{ user?.position }} - {{ user?.department }}</p>
            </div>
            <div class="p-4 ">
                <div class="flex justify-content-between align-items-center w-100">
                    <div class="mr-2 w-[25%] space-y-4 mt-4">
                        <button pButton label="Edit Account" icon="pi pi-pencil" class="p-button w-full p-button-sm" (click)="editAccount()" [disabled]="isEditable"></button>

                        <button *ngIf="user?.status === 'inactive'" pButton label="Enable Account" icon="pi pi-lock-open" class="p-button-warn w-full p-button-sm" (click)="disableAccount()"></button>

                        <button *ngIf="user?.status === 'active'" pButton label="Disable Account" icon="pi pi-lock" class="p-button-warn w-full p-button-sm" (click)="disableAccount()"></button>
                        <button pButton label="Forgot Password" icon="pi pi-key" class="p-button-info w-full p-button-sm" (click)="forgotPassword()"></button>
                    </div>

                    <div class="ml-2 w-[75%]">
                        <form (ngSubmit)="save()" #editUserForm="ngForm">
                            <div class="flex gap-4">
                                <div class="mb-3 flex-1">
                                    <label for="fullname" class="p-mb-2">Full Name</label>
                                    <input
                                        id="fullname"
                                        type="text"
                                        pInputText
                                        [(ngModel)]="userCopy.fullname"
                                        name="fullname"
                                        required
                                        class="p-inputtext-md w-full"
                                        [ngClass]="{ 'p-invalid': editUserForm.submitted && !user?.fullname }"
                                        [disabled]="!isEditable"
                                    />
                                    <small *ngIf="editUserForm.submitted && !user?.fullname" class="p-error">Full name is required</small>
                                </div>

                                <div class="mb-3 flex-1">
                                    <label for="email" class="p-mb-2">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        pInputText
                                        [(ngModel)]="userCopy.email"
                                        name="email"
                                        required
                                        class="p-inputtext-md w-full"
                                        [ngClass]="{ 'p-invalid': editUserForm.submitted && !user?.email }"
                                        [disabled]="!isEditable"
                                    />
                                    <small *ngIf="editUserForm.submitted && !user?.email" class="p-error">Email is required</small>
                                </div>

                                <div class="mb-3 flex-1">
                                    <label for="cin" class="p-mb-2">Cin</label>
                                    <input id="cin" type="text" pInputText [(ngModel)]="userCopy.cin" name="cin" required class="p-inputtext-md w-full" [ngClass]="{ 'p-invalid': editUserForm.submitted && !user?.cin }" [disabled]="!isEditable" />
                                    <small *ngIf="editUserForm.submitted && !user?.cin" class="p-error">Cin is required</small>
                                </div>
                            </div>

                            <div class="flex gap-4">
                                <div class="mb-3 flex-1">
                                    <label for="position" class="p-mb-2">Position</label>
                                    <input
                                        id="position"
                                        type="text"
                                        pInputText
                                        [(ngModel)]="userCopy.position"
                                        name="position"
                                        required
                                        class="p-inputtext-md w-full"
                                        [ngClass]="{ 'p-invalid': editUserForm.submitted && !user?.position }"
                                        [disabled]="!isEditable"
                                    />
                                    <small *ngIf="editUserForm.submitted && !user?.position" class="p-error">Position is required</small>
                                </div>

                                <div class="mb-3 flex-1">
                                    <label for="department" class="p-mb-2">Department</label>
                                    <input
                                        id="department"
                                        type="text"
                                        pInputText
                                        [(ngModel)]="userCopy.department"
                                        name="department"
                                        required
                                        class="p-inputtext-md w-full"
                                        [ngClass]="{ 'p-invalid': editUserForm.submitted && !user?.department }"
                                        [disabled]="!isEditable"
                                    />
                                    <small *ngIf="editUserForm.submitted && !user?.department" class="p-error">Department is required</small>
                                </div>

                                <div class="mb-3 flex-1">
                                    <label for="phone" class="p-mb-2">Phone</label>
                                    <input
                                        id="phone"
                                        type="text"
                                        pInputText
                                        [(ngModel)]="userCopy.phone"
                                        name="phone"
                                        required
                                        class="p-inputtext-md w-full"
                                        [ngClass]="{ 'p-invalid': editUserForm.submitted && !user?.phone }"
                                        [disabled]="!isEditable"
                                    />
                                    <small *ngIf="editUserForm.submitted && !user?.phone" class="p-error">Phone is required</small>
                                </div>
                            </div>

                            <div class="flex gap-4">
                                <div class="mb-3 flex-1">
                                    <label for="dateOfBirth" class="p-mb-2">Date Of Birth</label>
                                    <input
                                        id="dateOfBirth"
                                        type="text"
                                        pInputText
                                        [(ngModel)]="userCopy.dateOfBirth"
                                        name="dateOfBirth"
                                        required
                                        class="p-inputtext-md w-full"
                                        [ngClass]="{ 'p-invalid': editUserForm.submitted && !user?.dateOfBirth }"
                                        [disabled]="!isEditable"
                                    />
                                    <small *ngIf="editUserForm.submitted && !user?.dateOfBirth" class="p-error">Date Of Birth is required</small>
                                </div>

                                <div class="mb-3 flex-1">
                                    <label for="status" class="p-mb-2">Status</label>
                                    <select id="status" pInputText [(ngModel)]="userCopy.status" name="status" required class="p-inputtext-md w-full" [ngClass]="{ 'p-invalid': editUserForm.submitted && !user?.status }" [disabled]="!isEditable">
                                        <option value="active" [selected]="userCopy.status === 'active'">Active</option>
                                        <option value="inactive" [selected]="userCopy.status === 'inactive'">Inactive</option>
                                    </select>
                                    <small *ngIf="editUserForm.submitted && !user?.status" class="p-error">Status is required</small>
                                </div>
                            </div>
                        </form>

                        <p-accordion [multiple]="true" [activeIndex]="activeIndex">
                            <p-accordionTab [header]="'Active Sessions'">
                                <div class="grid">
                                    <div class="col-12 p-1" *ngFor="let session of tokens">
                                        <div class="surface-50 p-3 border-round">
                                            <div class="flex justify-content-between align-items-center mb-3">
                                                <div class="flex align-items-center">
                                                    <i class="pi {{ getDeviceIcon(session.platform) }} mr-2 text-xl"></i>
                                                    <div>
                                                        <div class="font-bold">
                                                            {{ parsePlatformInfo(session?.platform).browser }}
                                                            <span class="text-500 ml-2">{{ parsePlatformInfo(session?.platform).browserVersion }}</span>
                                                        </div>
                                                        <div class="text-sm text-500">
                                                            {{ parsePlatformInfo(session?.platform).os }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="grid">
                                                <div class="col-12 md:col-6">
                                                    <div class="text-sm">
                                                        <div class="mb-2">
                                                            <i class="pi pi-clock mr-2"></i>
                                                            <span class="text-500">Created: </span>
                                                            <span>{{ session.createdAt | date: 'medium' }}</span>
                                                        </div>
                                                        <div>
                                                            <i class="pi pi-calendar mr-2"></i>
                                                            <span class="text-500">Expires: </span>
                                                            <span [ngClass]="{ 'text-red-500': isExpired(session.expiresAt) }">
                                                                {{ session.expiresAt | date: 'medium' }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12 md:col-6">
                                                    <div class="text-sm">
                                                        <div class="mb-2">
                                                            <i class="pi pi-circle-fill mr-2" [ngClass]="{ 'text-green-500': !isExpired(session.expiresAt), 'text-red-500': isExpired(session.expiresAt) }"> </i>
                                                            <span class="text-500">Status: </span>
                                                            <p-tag [severity]="isExpired(session.expiresAt) ? 'danger' : 'success'" [value]="isExpired(session.expiresAt) ? 'Expired' : 'Active'"> </p-tag>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </p-accordionTab>
                        </p-accordion>
                    </div>
                </div>
            </div>

            <div class="text-right mt-4">
                <button pButton pRipple label="Save" icon="pi pi-check" type="submit" class="p-button mr-3" [disabled]="editUserForm.invalid"></button>
                <button pButton pRipple label="Cancel" icon="pi pi-times" (click)="close()" class="p-button p-button-danger"></button>
            </div>
        </p-dialog>
    `,
    styles: [
        `
            .p-invalid {
                border-color: #f44336 !important;
            }
            .p-error {
                color: #f44336;
            }
            .p-button-danger {
                background-color: #f44336;
                border-color: #f44336;
            }
            .p-button-info {
                background-color: #2196f3;
                border-color: #2196f3;
            }
        `
    ]
})
export class EditUserDialogComponent {
    @Input() visible: boolean = false;
    @Input() user: Customer | null = null;
    @Output() saveDialog = new EventEmitter<Customer>();
    @Output() closeDialog = new EventEmitter<void>();
    isEditable: boolean = false;
    activeIndex: number[] = [];

    tokens: any[] = [
        {
            refreshToken: 'abcd1234',
            refreshTokenAssociatedPlatform: 'chrome_windows',
            createdAt: '2025-01-20T12:00:00Z',
            expiresAt: '2025-02-20T12:00:00Z',
            platform: 'Chrome on Windows'
        },
        {
            refreshToken: 'efgh5678',
            refreshTokenAssociatedPlatform: 'firefox_mac',
            createdAt: '2025-01-25T08:00:00Z',
            expiresAt: '2025-02-25T08:00:00Z',
            platform: 'Firefox on macOS'
        },
        {
            refreshToken: 'ijkl9012',
            refreshTokenAssociatedPlatform: 'safari_ios',
            createdAt: '2025-01-15T09:30:00Z',
            expiresAt: '2025-02-15T09:30:00Z',
            platform: 'Safari on iOS'
        },
        {
            refreshToken: 'mnop3456',
            refreshTokenAssociatedPlatform: 'edge_linux',
            createdAt: '2025-01-28T14:45:00Z',
            expiresAt: '2025-01-28T14:45:00Z',
            platform: 'Edge on Linux'
        }
    ];

    get userCopy(): Customer {
        return this.user ?? { fullname: '', email: '', phone: '', position: '', department: '' };
    }

    
    close() {
        this.isEditable = false;
        this.activeIndex = [];
        this.closeDialog.emit();
    }

    save() {
        this.saveDialog.emit(this.userCopy);
        this.close();
    }
    editAccount() {
        this.isEditable = !this.isEditable;
    }
    disableAccount() {
        // TODO Logic to disable the user account
    }

    forgotPassword() {
        // TODO Logic to handle password reset
    }

    isExpired(expiry: string): boolean {
        return new Date(expiry) < new Date();
    }

    parsePlatformInfo(platform: string) {
        // Return platform-specific info
        return { browser: 'Chrome', os: 'Windows', browserVersion: '89.0.4389.114' };
    }

    getDeviceIcon(platform: string): string {
        // Map platform to device icon class
        return 'pi-desktop'; // Placeholder
    }
}
