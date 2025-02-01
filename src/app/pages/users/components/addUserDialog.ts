import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
    selector: 'add-user-dialog',
    standalone: true,
    imports: [CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule, DropdownModule],
    template: `
        <p-dialog header="Add New User" [(visible)]="visible" [modal]="true" [style]="{ width: '500px' }" [closable]="false">
            <div class="p-fluid">
                <div class="mb-3">
                    <label for="fullname">Full Name</label>
                    <input id="fullname" type="text" pInputText [(ngModel)]="newUser.fullname" required class="p-inputtext-md w-full" />
                </div>

                <div class="mb-3">
                    <label for="email">Email</label>
                    <input id="email" type="email" pInputText [(ngModel)]="newUser.email" required class="p-inputtext-md w-full" />
                </div>

                <div class="mb-3">
                    <label for="cin">CIN</label>
                    <input id="cin" type="text" pInputText [(ngModel)]="newUser.cin" required class="p-inputtext-md w-full" />
                </div>

                <div class="mb-3">
                    <label for="position">Position</label>
                    <input id="position" type="text" pInputText [(ngModel)]="newUser.position" required class="p-inputtext-md w-full" />
                </div>

                <div class="mb-3">
                    <label for="department">Department</label>
                    <input id="department" type="text" pInputText [(ngModel)]="newUser.department" required class="p-inputtext-md w-full" />
                </div>

                <div class="mb-3">
                    <label for="phone">Phone</label>
                    <input id="phone" type="text" pInputText [(ngModel)]="newUser.phone" required class="p-inputtext-md w-full" />
                </div>

                <div class="mb-3">
                    <label for="dateOfBirth">Date Of Birth</label>
                    <input id="dateOfBirth" type="date" pInputText [(ngModel)]="newUser.dateOfBirth" required class="p-inputtext-md w-full" />
                </div>

                <div class="mb-3">
                    <label for="status">Status</label>
                    <select id="status" pInputText [(ngModel)]="newUser.status" class="p-inputtext-md w-full">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div class="flex justify-end gap-3 mt-4">
                <button pButton label="Cancel" icon="pi pi-times" class="p-button-secondary" (click)="close()"></button>
                <button pButton label="Save" icon="pi pi-check" class="p-button-primary" (click)="saveUser()"></button>
            </div>
        </p-dialog>
    `
})
export class AddUserDialogComponent {
    @Input() visible: boolean = false;
    @Output() closeDialog = new EventEmitter<void>();
    @Output() userAdded = new EventEmitter<any>();

    newUser = {
        fullname: '',
        email: '',
        cin: '',
        position: '',
        department: '',
        phone: '',
        dateOfBirth: '',
        status: 'active'
    };

    close() {
        this.closeDialog.emit();
    }

    saveUser() {
        if (!this.newUser.fullname || !this.newUser.email || !this.newUser.cin) {
            return;
        }
        this.userAdded.emit({ ...this.newUser });
        this.close();
    }
}
