import { Component, computed } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropdownFlagsComponent } from './dropdownflags';
import { LayoutService } from '../../../layout/service/layout.service';
import { CommonModule } from '@angular/common';
import { AppConfigurator } from "../../../layout/component/app.configurator";

@Component({
    selector: 'topbar-widget',
    imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule, TranslateModule, DropdownFlagsComponent, CommonModule, AppConfigurator],
    template: `<a class="flex items-center" href="#">
            <img src="assets/images/logo.svg" alt="logo" class="w-32 h-16" />
            <span class="text-surface-900 dark:text-surface-0 font-medium text-xl leading-normal mr-20">
                {{ 'landingPage.topbar.auto' | translate }}<br />
                <small class="inline">Hichem&nbsp;Abid</small>
            </span>
        </a>
        <app-configurator />
        <a pButton [text]="true" severity="secondary" [rounded]="true" pRipple class="lg:!hidden" pStyleClass="@next" enterClass="hidden" leaveToClass="hidden" [hideOnOutsideClick]="true">
            <i class="pi pi-bars !text-2xl"></i>
        </a>

        <div class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border">
            <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8">
                <li>
                    <a (click)="router.navigate(['/'], { fragment: 'home' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span>{{ 'landingPage.topbar.home' | translate }}</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/'], { fragment: 'features' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span>{{ 'landingPage.topbar.services' | translate }}</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/'], { fragment: 'highlights' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span>{{ 'landingPage.topbar.portfolio' | translate }}</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/'], { fragment: 'highlights' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span>{{ 'landingPage.topbar.contact' | translate }}</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/'], { fragment: 'pricing' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span>{{ 'landingPage.topbar.about' | translate }}</span>
                    </a>
                </li>
            </ul>
            <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
                <p-button type="button" (onClick)="toggleDarkMode()" [rounded]="true" [icon]="isDarkTheme() ? 'pi pi-moon' : 'pi pi-sun'" severity="secondary" />

                <button pButton pRipple class="w-32 bg-primary" [label]="'landingPage.topbar.login' | translate" routerLink="/auth/login" [rounded]="true"></button>
                <dropdown-flags></dropdown-flags>
            </div>
        </div> `
})
export class TopbarWidget {
    constructor(
        public router: Router,
        public translate: TranslateService,
        public layoutService: LayoutService
    ) {}
    changeLanguage(language: string) {
        this.translate.use(language);
    }
    isDarkTheme = computed(() => this.layoutService.layoutConfig().darkTheme);

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
