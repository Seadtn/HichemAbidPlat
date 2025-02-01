import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { Customer } from '../../service/customer.service';

@Component({
    selector: 'user-details-dialog',
    standalone: true,
    imports: [CommonModule, DialogModule, ButtonModule, BadgeModule, AvatarModule],
    template: `
        <p-dialog header="User Details" [(visible)]="visible" [modal]="true" [style]="{ width: '400px' }" [contentStyle]="{ overflow: 'hidden' }" [closable]="false" (onHide)="close()">
            <div class="flex flex-col items-center p-6">
                <p-avatar size="large" shape="circle" class="mb-4 bg-blue-500">
                    <img [src]="getAvatar(user?.fullname)" class="rounded-full" alt="User Avatar" (error)="setFallbackAvatar($event)" />
                </p-avatar>

                <h2 class="text-2xl font-bold">{{ user?.fullname }}</h2>
                <p class="text-gray-600">{{ user?.position }} - {{ user?.department }}</p>

                <p-badge [value]="user?.status ?? ''" [severity]="getSeverity(user?.status ?? '')" class="my-3"></p-badge>

                <div class="w-full mt-4 text-left">
                    <p class="text-lg"><strong>CIN:</strong> {{ user?.cin }}</p>
                    <p class="text-lg"><strong>Email:</strong> {{ user?.email }}</p>
                    <p class="text-lg"><strong>Phone:</strong> {{ user?.phone }}</p>
                    <p class="text-lg"><strong>Date of Birth:</strong> {{ formatDate(user?.dateOfBirth) }}</p>
                </div>

                <button pButton pRipple label="Close" icon="pi pi-times" (click)="close()" class="p-button-danger mt-4"></button>
            </div>
        </p-dialog>
    `
})
export class UserDetailsDialogComponent {
    @Input() visible: boolean = false;
    @Input() user: Customer | null = null;
    @Output() closeDialog = new EventEmitter<void>();

    close() {
        this.closeDialog.emit();
    }

    formatDate(dateString?: string): string {
        if (!dateString) return 'N/A';
        return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(dateString));
    }

    getAvatar(name?: string): string {
        if (!name || name.trim() === '') return 'https://via.placeholder.com/100';
    
        const initials = name
            .split(' ')
            .filter(n => n)
            .map(n => n[0].toUpperCase()) 
            .join('');
    
        return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff`;
    }
    setFallbackAvatar(event: Event) {
        (event.target as HTMLImageElement).src = 'https://via.placeholder.com/100';
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
}
