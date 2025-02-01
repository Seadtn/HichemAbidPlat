import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CarouselModule } from 'primeng/carousel'; // Import CarouselModule

@Component({
    selector: 'contact-us-widget',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        InputTextarea,
        TranslateModule,
        CarouselModule, // Add CarouselModule here
    ],
    template: `
        <div id="contact-us" class="py-12 px-6 lg:px-20 mx-0 lg:mx-20">
            <div class="col-span-12 text-center mt-20 mb-6">
                <div 
                    class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl underline decoration-4 decoration-teal-500 hover:cursor-pointer hover:decoration-teal-600 underline-offset-4 transition-colors duration-300 rounded-lg"
                    [@titleAnimation]="titleState"
                    (mouseenter)="titleState = 'hover'"
                    (mouseleave)="titleState = 'normal'"
                >
                    Let's Chat!
                </div>
                <span class="text-muted-color text-2xl">We'd love to hear from you!</span>
            </div>
            <div class="max-w-3xl mx-auto">
                <form class="grid grid-cols-1 gap-6">
                    <input 
                        type="text" 
                        pInputText 
                        placeholder="Your Name" 
                        class="w-full p-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500" 
                    />
                    <input 
                        type="email" 
                        pInputText 
                        placeholder="Your Email" 
                        class="w-full p-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500" 
                    />
                    <textarea 
                        pInputTextarea 
                        rows="5" 
                        placeholder="Your Message" 
                        class="w-full p-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    ></textarea>
                    <button 
                        pButton 
                        pRipple 
                        label="Send Message" 
                        class="p-button px-8 py-4 text-xl transition-all duration-300 hover:scale-105 active:scale-95"
                        [@buttonAnimation]="buttonState"
                        (mouseenter)="buttonState = 'hover'"
                        (mouseleave)="buttonState = 'normal'"
                        (click)="onSubmit()"
                    ></button>
                </form>
            </div>
            <div [@scrollAnimation]="testimonialsState" class="testimonials-section py-16 px-8 lg:px-32">
                <h2 class="text-3xl lg:text-4xl font-semibold text-center mb-12">
                    What Our Learners Say
                </h2>
                <p-carousel
                    [value]="testimonials"
                    [numVisible]="1"
                    [numScroll]="1"
                    [responsiveOptions]="responsiveOptions"
                    class="max-w-4xl mx-auto bg-gray-100"
                >
                    <ng-template let-testimonial pTemplate="item">
                        <div class="text-center p-6 bg-white rounded-lg shadow-lg  bg-gray-100">
                            <p class="text-gray-700 italic">"{{ testimonial.text }}"</p>
                            <p class="mt-4 font-semibold">{{ testimonial.name }}</p>
                            <p class="text-sm text-gray-600">{{ testimonial.role }}</p>
                        </div>
                    </ng-template>
                </p-carousel>
            </div>

            <!-- CTA Banner -->
            <div [@scrollAnimation]="ctaState" class="cta-banner bg-teal-600 text-white py-16 px-8 lg:px-32 text-center">
                <h2 class="text-3xl lg:text-4xl font-semibold mb-8">
                    Ready to Get Started?
                </h2>
                <p class="max-w-4xl mx-auto text-lg lg:text-xl leading-relaxed mb-8">
                    Join thousands of learners who have transformed their careers with FIMO.
                </p>
                <button
                    pButton
                    pRipple
                    [@buttonHover]="buttonState"
                    (mouseenter)="buttonState = 'hover'"
                    (mouseleave)="buttonState = 'normal'"
                    [rounded]="true"
                    type="button"
                    label="Sign Up Now"
                    class="!text-xl mt-8 !px-12 !py-6 bg-primary text-white hover:bg-primary-dark transition duration-300 shadow-lg transform active:scale-95"
                    routerLink="/signup"
                ></button>
            </div>
        </div>
    `,
    animations: [
        trigger('titleAnimation', [
            state('normal', style({
                transform: 'scale(1)',
                color: '#1e293b' // Default text color
            })),
            state('hover', style({
                transform: 'scale(1.05)',
                color: '#0d9488' // Teal color for hover
            })),
            transition('normal <=> hover', animate('200ms ease-in-out'))
        ]),
        trigger('buttonAnimation', [
            state('normal', style({
                transform: 'scale(1)',
                backgroundColor: '#0d9488' // Default button color
            })),
            state('hover', style({
                transform: 'scale(1.05)',
                backgroundColor: '#0f766e' // Darker teal for hover
            })),
            transition('normal <=> hover', animate('200ms ease-in-out'))
        ])
    ]
})
export class ContactUsWidget {
    titleState: 'normal' | 'hover' = 'normal';
    buttonState: 'normal' | 'hover' = 'normal';
    testimonialsState = 'hide';
    ctaState = 'hide';

    testimonials = [
        {
            text: "FIMO has transformed the way I learn. The platform is intuitive, and the instructors are top-notch!",
            name: "Dhouha",
            role: "Software Engineer",
        },
        {
            text: "I love how easy it is to book sessions. FIMO has made learning so much more accessible.",
            name: "ALI",
            role: "Graphic Designer",
        },
    ];

    responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 1,
            numScroll: 1,
        },
        {
            breakpoint: '768px',
            numVisible: 1,
            numScroll: 1,
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1,
        },
    ];

    onSubmit() {
        alert('Thank you for your message! We will get back to you soon.');
    }
}