import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
    selector: 'partial-payment-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule, DialogModule, ButtonModule, BadgeModule, AvatarModule, InputNumberModule, RadioButtonModule],
    template: `
        <p-dialog [(visible)]="displayPaymentDialog" header="Enter Payment Amount" [modal]="true" [closable]="false">
            <div class="flex flex-col gap-4">
                <label for="paymentType">Choose Payment Type:</label>
                <div>
                    <p-radioButton name="paymentType" value="full" [(ngModel)]="paymentType" inputId="full"></p-radioButton>
                    <label for="full" class="ml-2">Pay Full Amount</label>
                </div>
                <div>
                    <p-radioButton name="paymentType" value="partial" [(ngModel)]="paymentType" inputId="partial"></p-radioButton>
                    <label for="partial" class="ml-2">Pay Partial Amount</label>
                </div>

                <div *ngIf="paymentType === 'partial'">
                    <label for="partialAmount">Amount to Pay (TND):</label>
                    <p-inputNumber id="partialAmount" [(ngModel)]="partialPaymentAmount" [min]="1" ></p-inputNumber>
                    <div *ngIf="invalidAmount" class="text-red-500">Please enter a valid amount.</div>
                </div>
            </div>

            <div class="flex justify-end gap-2 mt-4">
                <button pButton label="Cancel" class="p-button-secondary" (click)="cancelPayment()"></button>
                <button pButton label="Confirm Payment" class="p-button-success" (click)="onProcessPartialPayment()"></button>
            </div>
        </p-dialog>
    `
})
export class PartialPaymentDialogComponent {
    @Input() displayPaymentDialog: boolean = false;
    @Input() selectedDue: {paidAmount:number ,totalAmount: number, status?: string, paymentDate?: string } | null = null;
    @Output() paymentProcessed: EventEmitter<void> = new EventEmitter();
    @Output() dialogClosed: EventEmitter<void> = new EventEmitter();
    @Output() processPartialPayment: EventEmitter<number> = new EventEmitter();
    @Output() processPayment: EventEmitter<void> = new EventEmitter();

    paymentType: 'full' | 'partial' = 'full';
    partialPaymentAmount: number = 0;
    invalidAmount: boolean = false;
    cancelPayment() {
        this.displayPaymentDialog = false;
        this.dialogClosed.emit();
    }


    onProcessPartialPayment() {
        this.invalidAmount = false;
        if (this.paymentType === 'partial' && this.partialPaymentAmount > 0) {
            if (this.selectedDue && this.partialPaymentAmount > this.selectedDue.totalAmount - this.selectedDue.paidAmount) {
                console.log('Payment amount exceeds the due amount. Please enter a valid amount.');
                this.invalidAmount = true;
            } else {
                console.log('Processing partial payment of', this.partialPaymentAmount);
                this.processPartialPayment.emit(this.partialPaymentAmount );
            }

        } else if (this.paymentType === 'full') {
            this.processPayment.emit();
        } else {
            this.invalidAmount = true;
        }
    }

}
