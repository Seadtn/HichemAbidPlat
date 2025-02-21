export interface PendingDue {
    id: number;
    fullname: string;
    course: string;
    totalAmount: number;
    paidAmount: number;
    restAmount: number;
    dueDate: string;
    status: 'Overdue' | 'Pending' | 'Partially Paid' | 'Cleared';
    paymentDate: string;
    lastReminder: string;
}