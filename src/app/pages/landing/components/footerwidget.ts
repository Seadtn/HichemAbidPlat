import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'footer-widget',
    standalone: true,
    imports: [RouterModule, CommonModule, ButtonModule],
    template: `
        <div class="footer-section py-16 px-8 lg:px-32 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Company Info -->
                <div>
                    <h3 class="text-2xl font-bold mb-4 text-teal-400">FIMO</h3>
                    <p class="text-gray-400">
                        Empowering learners with seamless booking technology.
                    </p>
                    <button
                        pButton
                        pRipple
                        label="Get Started"
                        class="mt-6 !px-8 !py-3 bg-teal-500 hover:bg-teal-600 text-white transition-all duration-300 hover:scale-105 active:scale-95"
                        (click)="navigateTo('/get-started')"
                    ></button>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="text-2xl font-bold mb-4 text-teal-400">Quick Links</h3>
                    <ul class="text-gray-400">
                        <li>
                            <button
                                (click)="router.navigate(['/'], { fragment: 'about-us' })"
                                class="hover:text-teal-400 transition-colors duration-300"
                                [@linkHover]="linkState"
                                (mouseenter)="linkState = 'hover'"
                                (mouseleave)="linkState = 'normal'"
                            >
                                About Us
                            </button>
                        </li>
                        <li>
                            <button
                                href="/courses"
                                class="hover:text-teal-400 transition-colors duration-300"
                                [@linkHover]="linkState"
                                (mouseenter)="linkState = 'hover'"
                                (mouseleave)="linkState = 'normal'"
                            >
                                Courses
                            </button>
                        </li>
                        <li>
                            <button
                                class="hover:text-teal-400 transition-colors duration-300"
                                [@linkHover]="linkState"
                                (mouseenter)="linkState = 'hover'"
                                (mouseleave)="linkState = 'normal'"
                                (click)="router.navigate(['/'], { fragment: 'contact-us' })"

                            >
                                Contact
                            </button>
                        </li>
                    </ul>
                </div>

                <!-- Social Media Links -->
                <div>
                    <h3 class="text-2xl font-bold mb-4 text-teal-400">Follow Us</h3>
                    <div class="flex space-x-4">
                        <a
                            href="#"
                            class="text-gray-400 hover:text-teal-400 transition-colors duration-300"
                            [@iconHover]="iconState"
                            (mouseenter)="iconState = 'hover'"
                            (mouseleave)="iconState = 'normal'"
                        >
                            <i class="pi pi-facebook text-2xl"></i>
                        </a>
                        <a
                            href="#"
                            class="text-gray-400 hover:text-teal-400 transition-colors duration-300"
                            [@iconHover]="iconState"
                            (mouseenter)="iconState = 'hover'"
                            (mouseleave)="iconState = 'normal'"
                        >
                            <i class="pi pi-twitter text-2xl"></i>
                        </a>
                        <a
                            href="#"
                            class="text-gray-400 hover:text-teal-400 transition-colors duration-300"
                            [@iconHover]="iconState"
                            (mouseenter)="iconState = 'hover'"
                            (mouseleave)="iconState = 'normal'"
                        >
                            <i class="pi pi-linkedin text-2xl"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Copyright -->
            <div class="text-center mt-12 pt-8 border-t border-gray-700">
                <p class="text-gray-400">
                    &copy; {{ currentYear }} FIMO. All rights reserved.
                </p>
            </div>
        </div>
    `,
    animations: [
        trigger('linkHover', [
            state('normal', style({
                transform: 'translateX(0)',
                color: '#9ca3af' // Gray color
            })),
            state('hover', style({
                transform: 'translateX(5px)',
                color: '#2dd4bf' // Teal color
            })),
            transition('normal <=> hover', animate('200ms ease-in-out'))
        ]),
        trigger('iconHover', [
            state('normal', style({
                transform: 'scale(1)',
                color: '#9ca3af' // Gray color
            })),
            state('hover', style({
                transform: 'scale(1.2)',
                color: '#2dd4bf' // Teal color
            })),
            transition('normal <=> hover', animate('200ms ease-in-out'))
        ])
    ]
})
export class FooterWidget {
    currentYear = new Date().getFullYear();
    linkState: 'normal' | 'hover' = 'normal';
    iconState: 'normal' | 'hover' = 'normal';

    constructor(public router: Router) {}

    navigateTo(route: string) {
        this.router.navigate([route]);
    }
}