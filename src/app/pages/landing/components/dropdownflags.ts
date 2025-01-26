import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { DropdownModule } from "primeng/dropdown";

@Component({
    standalone: true,
    selector: 'dropdown-flags',
    imports: [
      FormsModule,
      DropdownModule
    ],
    template: `
      <p-dropdown 
        [options]="languages" 
        [(ngModel)]="selectedLanguage" 
        (onChange)="changeLanguage($event)" 
        optionLabel="name" 
        [style]="{ width: '150px' }">
        <ng-template let-language pTemplate="selectedItem">
            <div class="flex items-center">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="' mr-3 flag flag-' + language.flag" width="30" />
                <div>{{ language.name }}</div>
            </div>
        </ng-template>
        <ng-template let-language pTemplate="item">
            <div class="flex items-center">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'mr-3 flag flag-' + language.flag" width="30" />
            <div>{{ language.name }}</div>
            </div>
        </ng-template>
      </p-dropdown>
    `
})
export class DropdownFlagsComponent {
    languages = [
      { name: 'Français', flag: 'fr' , code: 'fr' },
      { name: 'German', flag: 'de' , code: 'de' },
      { name: 'English', flag: 'uk' , code: 'en' },
    ];

    selectedLanguage = this.languages[0]; // Default to French

    constructor(private translate: TranslateService) {
        // Load language preference from localStorage if it exists
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            this.selectedLanguage = this.languages.find(lang => lang.code === savedLanguage) || this.selectedLanguage;
        }
        this.translate.setDefaultLang(this.selectedLanguage.code);
        this.translate.use(this.selectedLanguage.code);
    }

    changeLanguage(event: any) {
        const selectedLangCode = event.value.code;
        this.translate.use(selectedLangCode);

        // Save the selected language to localStorage
        localStorage.setItem('selectedLanguage', selectedLangCode);
    }
}
