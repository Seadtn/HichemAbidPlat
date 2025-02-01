import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TableDemo } from "./components/tabledemo";

@Component({
    standalone: true,
    selector: 'app-users-table',
    imports: [CommonModule, ButtonModule, MenuModule, TableDemo],
    template: ` <app-table-demo></app-table-demo> `
})
export class usersTable {
    menu = null;

    items = [
        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
        { label: 'Remove', icon: 'pi pi-fw pi-trash' }
    ];
}
