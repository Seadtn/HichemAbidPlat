import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CarouselModule } from 'primeng/carousel';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'hero-widget',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule, 
        RippleModule, 
        CarouselModule,
        TranslateModule
    ],
    animations: [
        trigger('fadeInUp', [
            state('void', style({
                opacity: 0,
                transform: 'translateY(50px)'
            })),
            transition(':enter', [
                animate('600ms ease-out', style({
                    opacity: 1,
                    transform: 'translateY(0)'
                }))
            ])
        ]),
        trigger('buttonHover', [
            state('normal', style({
                transform: 'scale(1)'
            })),
            state('hover', style({
                transform: 'scale(1.05)'
            })),
            transition('normal <=> hover', animate('200ms ease-in-out'))
        ])
    ],
    template: `
        <div
            id="hero"
            class="flex flex-col pt-12 px-8 lg:px-24 overflow-hidden relative"
            style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 0, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(195, 227, 250) 0%, rgb(200, 239, 175) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
        >
            <div class="mx-8 md:mx-24 mt-0 md:mt-8 text-center md:text-left">
                <h1 
                    [@fadeInUp] 
                    class="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight"
                >
                    <span 
                        [@fadeInUp] 
                        class="font-light block text-gray-600"
                    >
                    {{ 'landingPage.topbar.auto' | translate }}
                    </span>
                    By Hichem Abid
                </h1>
                
                <p 
                    [@fadeInUp] 
                    class="font-normal text-xl md:text-2xl leading-normal mt-4 text-gray-700"
                >
                    Get Behind the Wheel with Confidence – Enroll Today and Start Your Journey to Safe, Skillful Driving!
                </p>
                
                <button 
                    pButton 
                    pRipple 
                    [@fadeInUp]
                    [@buttonHover]="buttonState"
                    (mouseenter)="buttonState = 'hover'"
                    (mouseleave)="buttonState = 'normal'"
                    [rounded]="true" 
                    type="button" 
                    label="Get Started" 
                    class="!text-xl mt-8 !px-6 !py-3 bg-primary text-white hover:bg-primary-dark transition duration-300 shadow-lg transform active:scale-95"
                ></button>
            </div>

            <div 
                [@fadeInUp] 
                class="flex justify-center md:justify-end mt-8"
            >
                <p-carousel 
                    [value]="images" 
                    [numVisible]="1" 
                    [numScroll]="1" 
                    circular="true" 
                    autoplay="true" 
                    autoplayInterval="3000" 
                    class="w-full md:w-6/12"
                >
                    <ng-template pTemplate="item" let-image>
                        <img 
                            [src]="image" 
                            alt="Slide Image" 
                            class="w-full rounded-xl shadow-lg transition-transform duration-500 transform hover:scale-105 object-cover" 
                        />
                    </ng-template>
                </p-carousel>
            </div>
        </div>
    `
})
export class HeroWidget {
    images = [
        '/assets/images/slider/slide1.jpg', 
        '/assets/images/slider/slide2.jpg', 
        '/assets/images/slider/slide3.jpg'
    ];

    buttonState: 'normal' | 'hover' = 'normal';
}