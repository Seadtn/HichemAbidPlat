import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    fullname?: string;
    cin?: string;
    position?: string;
    department?: string;
    email?: string;
    dateOfBirth?: string;
    phone?: string;
    status?: string;
    creationDate?: number;
    active?: boolean;
  }
  

@Injectable()
export class CustomerService {
    getData(type?: string): Customer[] {
        const staffData: Customer[] = [
            { id: 1, fullname: "John Doe", cin: "123456789", position: "Software Engineer", department: "Engineering", email: "john.doe@example.com", dateOfBirth: "1990-05-15", phone: "123-456-7890", status: "active", creationDate: 1672531199000, active: true },
            { id: 2, fullname: "Jane Smith", cin: "987654321", position: "Product Manager", department: "Product", email: "jane.smith@example.com", dateOfBirth: "1985-08-22", phone: "987-654-3210", status: "inactive", creationDate: 1609459200000, active: false },
            { id: 3, fullname: "Alice Johnson", cin: "567890123", position: "HR Specialist", department: "HR", email: "alice.johnson@example.com", dateOfBirth: "1992-02-10", phone: "567-890-1234", status: "active", creationDate: 1657891200000, active: true },
            { id: 4, fullname: "Bob Williams", cin: "456789012", position: "Finance Analyst", department: "Finance", email: "bob.williams@example.com", dateOfBirth: "1988-07-05", phone: "456-789-0123", status: "inactive", creationDate: 1580515200000, active: false }
        ];
    
        const teacherData: Customer[] = [
            { id: 5, fullname: "Michael Brown", cin: "112233445", position: "Math Teacher", department: "Mathematics", email: "michael.brown@example.com", dateOfBirth: "1975-09-30", phone: "112-233-4455", status: "active", creationDate: 1506816000000, active: true },
            { id: 6, fullname: "Emily Davis", cin: "223344556", position: "Science Teacher", department: "Science", email: "emily.davis@example.com", dateOfBirth: "1980-11-12", phone: "223-344-5566", status: "inactive", creationDate: 1559347200000, active: false },
            { id: 7, fullname: "Chris Wilson", cin: "334455667", position: "History Teacher", department: "History", email: "chris.wilson@example.com", dateOfBirth: "1983-04-18", phone: "334-455-6677", status: "active", creationDate: 1590969600000, active: true },
            { id: 8, fullname: "Sophia Martinez", cin: "445566778", position: "English Teacher", department: "English", email: "sophia.martinez@example.com", dateOfBirth: "1991-01-25", phone: "445-566-7788", status: "inactive", creationDate: 1622505600000, active: false }
        ];
    
        const candidateData: Customer[] = [
            { id: 9, fullname: "William Anderson", cin: "556677889", position: "Candidate", department: "Engineering", email: "william.anderson@example.com", dateOfBirth: "1995-06-14", phone: "556-677-8899", status: "pending", creationDate: 1683033600000, active: false },
            { id: 10, fullname: "Olivia Thompson", cin: "667788990", position: "Candidate", department: "Marketing", email: "olivia.thompson@example.com", dateOfBirth: "1997-03-21", phone: "667-788-9900", status: "pending", creationDate: 1696118400000, active: false },
            { id: 11, fullname: "James White", cin: "778899001", position: "Candidate", department: "Finance", email: "james.white@example.com", dateOfBirth: "1994-12-07", phone: "778-899-0011", status: "pending", creationDate: 1709203200000, active: false },
            { id: 12, fullname: "Emma Harris", cin: "889900112", position: "Candidate", department: "Operations", email: "emma.harris@example.com", dateOfBirth: "1996-09-02", phone: "889-900-1122", status: "pending", creationDate: 1722288000000, active: false }
        ];
    
        const visitorData: Customer[] = [
            { id: 13, fullname: "Daniel Clark", cin: "990011223", position: "Visitor", department: "Guest", email: "daniel.clark@example.com", dateOfBirth: "1982-10-10", phone: "990-011-2233", status: "visiting", creationDate: 1735372800000, active: false },
            { id: 14, fullname: "Ava Rodriguez", cin: "001122334", position: "Visitor", department: "Guest", email: "ava.rodriguez@example.com", dateOfBirth: "1990-05-29", phone: "001-122-3344", status: "visiting", creationDate: 1748457600000, active: false },
            { id: 15, fullname: "Ethan Lewis", cin: "112233445", position: "Visitor", department: "Guest", email: "ethan.lewis@example.com", dateOfBirth: "1987-12-14", phone: "112-233-4455", status: "visiting", creationDate: 1761542400000, active: false },
            { id: 16, fullname: "Mia Walker", cin: "223344556", position: "Visitor", department: "Guest", email: "mia.walker@example.com", dateOfBirth: "1993-07-08", phone: "223-344-5566", status: "visiting", creationDate: 1774627200000, active: false }
        ];
    
        switch (type) {
            case 'Teacher':
                return teacherData;
            case 'Candidate':
                return candidateData;
            case 'Visitor':
                return visitorData;
            default:
                return staffData;
        }
    }

    constructor(private http: HttpClient) {}

    getCustomersMini() {
        return Promise.resolve(this.getData().slice(0, 5));
    }

    getCustomersSmall() {
        return Promise.resolve(this.getData().slice(0, 10));
    }

    getCustomersMedium() {
        return Promise.resolve(this.getData().slice(0, 50));
    }

    getCustomersLarge(type:string) {
        return Promise.resolve(this.getData(type).slice(0, 200));
    }

    getCustomersXLarge(type:string) {
        return Promise.resolve(this.getData(type));
    }

    getCustomers(params?: any) {
        return this.http.get<any>('https://www.primefaces.org/data/customers', { params: params }).toPromise();
    }
}
