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
            <span class="text-[#002855] font-bold text-xl leading-normal mr-20 bg-white px-2 rounded">
                {{ 'F.I.M.O' | translate }}<br />
                <small class="inline-block mt-0">{{ 'landingPage.topbar.auto' | translate }}<br /></small>
            </span>

        </a>
        <app-configurator />
        <a pButton [text]="true" severity="secondary" [rounded]="true" pRipple class="lg:!hidden" pStyleClass="@next" enterClass="hidden" leaveToClass="hidden" [hideOnOutsideClick]="true">
            <i class="pi pi-bars !text-2xl"></i>
        </a>

        <div class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border">
            <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8">
                <li>
                    <a (click)="router.navigate(['/'], { fragment: 'home' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary">
                        <span>{{ 'landingPage.topbar.home' | translate }}</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/'], { fragment: 'about-us' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary">
                        <span>{{ 'landingPage.topbar.about' | translate }}</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/'], { fragment: 'features' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary">
                        <span>{{ 'landingPage.topbar.services' | translate }}</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/'], { fragment: 'partnership' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary">
                        <span>{{ 'landingPage.topbar.partnership' | translate }}</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/'], { fragment: 'portfolio' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary">
                        <span>{{ 'landingPage.topbar.portfolio' | translate }}</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/'], { fragment: 'contact-us' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary">
                        <span>{{ 'landingPage.topbar.contact' | translate }}</span>
                    </a>
                </li>

            </ul>
            <div class="flex items-center gap-4">
            <!-- Dark Mode Toggle -->
            <p-button type="button" (onClick)="toggleDarkMode()" [rounded]="true" 
                [icon]="isDarkTheme() ? 'pi pi-moon' : 'pi pi-sun'" severity="secondary" />

            <!-- Login Button -->
            <button pButton pRipple class="w-32 bg-primary text-white py-2 rounded-md shadow-md hover:bg-primary-dark transition"
                [label]="'landingPage.topbar.login' | translate" routerLink="/auth/login"></button>

            <!-- Language Dropdown -->
            <dropdown-flags></dropdown-flags>

            <!-- Mobile Menu Button -->
            <a pButton class="lg:hidden text-xl" pRipple (click)="toggleMenu()">
            <i class="pi pi-bars"></i>
            </a>

            <!-- Mobile Navigation Menu -->
            <ul
            *ngIf="isMobileMenuOpen"
            class="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col gap-4 p-4 text-lg font-medium text-gray-800"
            >
            <li>
                <a (click)="navigateTo('home')" pRipple class="hover:text-primary">
                {{ 'landingPage.topbar.home' | translate }}
                </a>
            </li>
            <li>
                <a (click)="navigateTo('about-us')" pRipple class="hover:text-primary">
                {{ 'landingPage.topbar.about' | translate }}
                </a>
            </li>
            <li>
                <a (click)="navigateTo('services')" pRipple class="hover:text-primary">
                {{ 'landingPage.topbar.services' | translate }}
                </a>
            </li>
            <li>
                <a (click)="navigateTo('features')" pRipple class="hover:text-primary">
                {{ 'landingPage.topbar.features' | translate }}
                </a>
            </li>
            <li>
                <a (click)="navigateTo('contact-us')" pRipple class="hover:text-primary">
                {{ 'landingPage.topbar.contact' | translate }}
                </a>
            </li>
            </ul>

        </div>
        </div> `
})
export class TopbarWidget {
    isMobileMenuOpen: boolean = false;
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
    toggleMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  navigateTo(fragment: string): void {
    this.router.navigate(['/'], { fragment });
    this.isMobileMenuOpen = false; // Close the menu after navigation
  }
}
