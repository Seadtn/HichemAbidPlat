import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'features-widget',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonModule, RippleModule, RouterModule],
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(50px)' })),
      transition(':enter', [
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('scrollAnimation', [
      state('show', style({ opacity: 1, transform: 'translateY(0)' })),
      state('hide', style({ opacity: 0, transform: 'translateY(50px)' })),
      transition('hide => show', animate('600ms ease-out'))
    ]),
    trigger('buttonHover', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hover', style({ transform: 'scale(1.1)' })),
      transition('normal <=> hover', animate('200ms ease-in-out'))
    ]),
    trigger('cardHover', [
      state('normal', style({ transform: 'scale(1)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' })),
      state('hover', style({ transform: 'scale(1.05)', boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)' })),
      transition('normal <=> hover', animate('200ms ease-in-out'))
    ])
  ],
  template: `
    <div id="features" class="w-full min-h-screen py-16 px-8 lg:px-32 bg-white flex flex-col justify-center">
      <div class="text-center mb-16">
        <h2 [@scrollAnimation]="titleState" class="text-3xl lg:text-4xl font-semibold mb-4">
          {{ 'landingPage.topbar.services' | translate }}
        </h2>
        <p [@scrollAnimation]="titleState" class="text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto">
          Discover the range of services we offer to help you succeed. From expert-led courses to seamless booking, we provide everything you need to achieve your goals.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div [@scrollAnimation]="cardState" [@cardHover]="cardHoverState[0]" (mouseenter)="cardHoverState[0] = 'hover'" (mouseleave)="cardHoverState[0] = 'normal'" class="transform transition-all duration-300">
          <div class="p-6 bg-surface-0 dark:bg-surface-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-center bg-yellow-200 mb-6 transition-transform duration-300 group-hover:rotate-12" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
              <i class="pi pi-fw pi-users !text-2xl text-yellow-700"></i>
            </div>
            <h5 class="text-xl font-semibold mb-4 text-surface-900 dark:text-surface-0">Explore Courses</h5>
            <p class="text-surface-600 dark:text-surface-200">Browse the list of available training sessions on-site at FIMO. Learn from industry experts with hands-on experience.</p>
            <button pButton pRipple [@buttonHover]="buttonState" (mouseenter)="buttonState = 'hover'"
              (mouseleave)="buttonState = 'normal'" label="Learn More"
              class="!mt-6 !px-8 !py-3 bg-primary text-white hover:bg-primary-dark transition duration-300 shadow-lg transform active:scale-95"
              routerLink="/courses"></button>
          </div>
        </div>

        <div [@scrollAnimation]="cardState" [@cardHover]="cardHoverState[1]" (mouseenter)="cardHoverState[1] = 'hover'" (mouseleave)="cardHoverState[1] = 'normal'" class="transform transition-all duration-300">
          <div class="p-6 bg-surface-0 dark:bg-surface-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-center bg-cyan-200 mb-6 transition-transform duration-300 group-hover:rotate-12" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
              <i class="pi pi-fw pi-palette !text-2xl text-cyan-700"></i>
            </div>
            <h5 class="text-xl font-semibold mb-4 text-surface-900 dark:text-surface-0">Book Your Spot</h5>
            <p class="text-surface-600 dark:text-surface-200">Secure your place in just a few clicks by selecting the desired course and session. Effortlessly reserve sessions with our streamlined platform.</p>
            <button pButton pRipple [@buttonHover]="buttonState" (mouseenter)="buttonState = 'hover'"
              (mouseleave)="buttonState = 'normal'" label="Book Now"
              class="!mt-6 !px-8 !py-3 bg-primary text-white hover:bg-primary-dark transition duration-300 shadow-lg transform active:scale-95"
              routerLink="/booking"></button>
          </div>
        </div>

        <div [@scrollAnimation]="cardState" [@cardHover]="cardHoverState[2]" (mouseenter)="cardHoverState[2] = 'hover'" (mouseleave)="cardHoverState[2] = 'normal'" class="transform transition-all duration-300">
          <div class="p-6 bg-surface-0 dark:bg-surface-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-center bg-indigo-200 mb-6 transition-transform duration-300 group-hover:rotate-12" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
              <i class="pi pi-fw pi-map !text-2xl text-indigo-700"></i>
            </div>
            <h5 class="text-xl font-semibold mb-4 text-surface-900 dark:text-surface-0">Attend & Learn</h5>
            <p class="text-surface-600 dark:text-surface-200">Visit the FIMO Academic Center on the scheduled date and time to attend your session. Engage in hands-on learning at our state-of-the-art facilities.</p>
            <button pButton pRipple [@buttonHover]="buttonState" (mouseenter)="buttonState = 'hover'"
              (mouseleave)="buttonState = 'normal'" label="View Schedule"
              class="!mt-6 !px-8 !py-3 bg-primary text-white hover:bg-primary-dark transition duration-300 shadow-lg transform active:scale-95"
              routerLink="/schedule"></button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host { display: block; width: 100%; height: 100%; }
      #features { width: 100%; min-height: 100vh; background-color: white; }
    `,
  ],
})
export class FeaturesWidget {
  // Animation states for sections
  titleState = 'hide';
  cardState = 'hide';

  // Button hover state
  buttonState: 'normal' | 'hover' = 'normal';

  // Card hover states
  cardHoverState: ('normal' | 'hover')[] = ['normal', 'normal', 'normal'];

  // Check scroll position and update animation states
  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.scrollY;
    this.titleState = scrollPosition > 100 ? 'show' : 'hide';
    this.cardState = scrollPosition > 300 ? 'show' : 'hide';
  }
}