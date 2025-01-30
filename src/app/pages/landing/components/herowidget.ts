import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CarouselModule } from 'primeng/carousel';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'hero-widget',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule, 
        RippleModule, 
        CarouselModule,
        TranslateModule,
        RouterModule
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
            class="flex flex-col pt-2 px-8 lg:px-24 overflow-hidden relative"
            style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 0, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(195, 227, 250) 0%, rgb(200, 239, 175) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
        >
            <div class="mx-8 md:mx-24 mt-20 md:mt-24 text-center md:text-left">
                <h1 
                    [@fadeInUp] 
                    class="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight"
                >
                    <span>
                    Welcome to FIMO Session Booking
                    </span>
                </h1>
                
                <p 
                    [@fadeInUp] 
                    class="font-normal text-xl md:text-2xl leading-normal mt-4 text-gray-700"
                    style="white-space: pre-line;"
                >
                    Simplify your learning experience with our online platform! 
                </p>
                <p 
                    [@fadeInUp] 
                    class="font-normal text-xl md:text-2xl leading-normal mt-4 text-gray-700"
                    style="white-space: pre-line;"
                >
                    Book sessions for courses to attend on-site at the FIMO Academic Center with ease! 
                </p>
                <p 
                    [@fadeInUp] 
                    class="font-normal text-xl md:text-2xl leading-normal mt-4 text-gray-700"
                    style="white-space: pre-line;"
                >
                    Empowering your education journey is just a click away!
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
                    class="!text-xl mt-8 !px-12 !py-6 bg-primary text-white hover:bg-primary-dark transition duration-300 shadow-lg transform active:scale-95"
                    routerLink="/auth/login"
                    
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

        
    `,
})
export class HeroWidget {
    testimonials = [
        { quote: "This platform has transformed my learning experience!", name: "John Doe", role: "Student" },
        { quote: "FIMO's sessions are insightful and easy to book.", name: "Jane Smith", role: "Professional" },
        { quote: "I love the on-site learning experience provided by FIMO.", name: "Alex Johnson", role: "Learner" }
    ];

    images = [
        '/assets/images/slider/slide1.jpg', 
        '/assets/images/slider/slide2.jpg', 
        '/assets/images/slider/slide3.jpg'
    ];

    buttonState: 'normal' | 'hover' = 'normal';
}
