import { Component, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RouterModule } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'about-us-widget',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonModule, RippleModule, RouterModule, CarouselModule],
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
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(50px)'
      })),
      transition('hide => show', animate('600ms ease-out'))
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
    <div id="about-us" class="flex flex-col w-full overflow-hidden">
      <!-- Hero Section -->
      <div
        class="hero-section bg-cover bg-center text-white h-[80vh] flex items-center justify-center parallax"
        style="background-image: url('/assets/images/hero-about-us.jpg');"
      >
        <div class="text-center px-8">
          <h1 [@scrollAnimation]="heroState" class="text-4xl lg:text-6xl font-bold mb-4">
            Get to Know Booking with FIMO
          </h1>
          <p [@scrollAnimation]="heroState" class="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            At FIMO, we connect people with seamless learning opportunities through smart and intuitive booking technology.
          </p>
          <button
            pButton
            pRipple
            [@scrollAnimation]="heroState"
            [@buttonHover]="buttonState"
            (mouseenter)="buttonState = 'hover'"
            (mouseleave)="buttonState = 'normal'"
            [rounded]="true"
            type="button"
            label="Get Started"
            class="!text-xl mt-8 !px-12 !py-6 bg-primary text-white hover:bg-primary-dark transition duration-300 shadow-lg transform active:scale-95"
            routerLink="/get-started"
          ></button>
        </div>
      </div>

      <!-- About Us Section -->
      <div [@scrollAnimation]="aboutState" class="about-us-section py-16 px-8 lg:px-32 bg-gray-50">
        <h2 class="text-3xl lg:text-4xl font-semibold text-center mb-12">
          Who We Are
        </h2>
        <div class="max-w-5xl mx-auto text-center text-gray-700 text-lg lg:text-xl leading-relaxed">
          We are a team of passionate innovators dedicated to empowering learners and institutions with tools that simplify training session management. Our mission is to inspire learning through state-of-the-art technology.
        </div>
      </div>

      <!-- Features Section -->
      <div class="features-section py-16 px-8 lg:px-32 bg-white">
        <h2 [@scrollAnimation]="featuresState" class="text-3xl lg:text-4xl font-semibold text-center mb-12">
          Why Choose Us?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div [@scrollAnimation]="featuresState" class="feature-item text-center hover:scale-105 transition-transform duration-300">
            <img
              [attr.data-src]="'/assets/images/services/expert_instructions.jpg'"
              alt="Expert Instructors"
              class="w-40 h-40 mx-auto rounded-full mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 lazy-load"
            />
            <h3 class="text-xl font-bold mb-4">Expert Instructors</h3>
            <p class="text-gray-700 leading-relaxed">
              Learn from industry experts with hands-on knowledge and years of experience.
            </p>
          </div>
          <div [@scrollAnimation]="featuresState" class="feature-item text-center hover:scale-105 transition-transform duration-300">
            <img
              [attr.data-src]="'/assets/images/services/schedule.jpg'"
              alt="Easy Booking"
              class="w-40 h-40 mx-auto rounded-full mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 lazy-load"
            />
            <h3 class="text-xl font-bold mb-4">Easy Booking</h3>
            <p class="text-gray-700 leading-relaxed">
              Effortlessly reserve sessions with our streamlined platform.
            </p>
          </div>
          <div [@scrollAnimation]="featuresState" class="feature-item text-center hover:scale-105 transition-transform duration-300">
            <img
              [attr.data-src]="'/assets/images/services/onsite-training.jpg'"
              alt="On-Site Learning"
              class="w-40 h-40 mx-auto rounded-full mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 lazy-load"
            />
            <h3 class="text-xl font-bold mb-4">On-Site Learning</h3>
            <p class="text-gray-700 leading-relaxed">
              Experience engaging, hands-on learning at our state-of-the-art facilities.
            </p>
          </div>
        </div>
      </div>

      <!-- Testimonials Section -->
      <div [@scrollAnimation]="testimonialsState" class="testimonials-section py-16 px-8 lg:px-32 bg-gray-100">
        <h2 class="text-3xl lg:text-4xl font-semibold text-center mb-12">
          What Our Learners Say
        </h2>
        <p-carousel
          [value]="testimonials"
          [numVisible]="1"
          [numScroll]="1"
          [responsiveOptions]="responsiveOptions"
          class="max-w-4xl mx-auto"
        >
          <ng-template let-testimonial pTemplate="item">
            <div class="text-center p-6 bg-white rounded-lg shadow-lg">
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

      <!-- Footer -->
      <div class="footer-section py-16 px-8 lg:px-32 bg-gray-800 text-white">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">FIMO</h3>
            <p class="text-gray-400">Empowering learners with seamless booking technology.</p>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Quick Links</h3>
            <ul class="text-gray-400">
              <li><a href="/about" class="hover:text-white">About Us</a></li>
              <li><a href="/courses" class="hover:text-white">Courses</a></li>
              <li><a href="/contact" class="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Follow Us</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white"><i class="pi pi-facebook"></i></a>
              <a href="#" class="text-gray-400 hover:text-white"><i class="pi pi-twitter"></i></a>
              <a href="#" class="text-gray-400 hover:text-white"><i class="pi pi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      .parallax {
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .lazy-load {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
      }

      .lazy-load.loaded {
        opacity: 1;
      }
    `,
  ],
})
export class AboutUsWidget implements AfterViewInit {
  buttonState: 'normal' | 'hover' = 'normal';
  heroState = 'hide';
  aboutState = 'hide';
  featuresState = 'hide';
  testimonialsState = 'hide';
  ctaState = 'hide';

  testimonials = [
    {
      text: "FIMO has transformed the way I learn. The platform is intuitive, and the instructors are top-notch!",
      name: "John Doe",
      role: "Software Engineer",
    },
    {
      text: "I love how easy it is to book sessions. FIMO has made learning so much more accessible.",
      name: "Jane Smith",
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

  constructor(private viewportScroller: ViewportScroller) {}

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100) this.heroState = 'show';
    if (scrollPosition > 500) this.aboutState = 'show';
    if (scrollPosition > 1000) this.featuresState = 'show';
    if (scrollPosition > 1500) this.testimonialsState = 'show';
    if (scrollPosition > 2000) this.ctaState = 'show';
  }

  ngAfterViewInit() {
    // Lazy load images
    const lazyImages = document.querySelectorAll('.lazy-load');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset['src'] || '';
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => observer.observe(img));
  }

  scrollToSection(sectionId: string) {
    this.viewportScroller.scrollToAnchor(sectionId);
  }
}