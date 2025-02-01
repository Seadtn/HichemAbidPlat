import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Router, RouterModule } from '@angular/router';
import { AfterViewInit, Component, HostListener, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'about-us-widget',
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
    ])
  ],
  template: `
    <div id="about-us" class="flex flex-col w-full overflow-hidden" 
      style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 0, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(195, 227, 250) 0%, rgb(200, 239, 175) 100%); clip-path: ellipse(150% 87% at 93% 13%)">
      
      <div class="hero-section text-white h-[80vh] flex items-center justify-center parallax relative">
        <div class="text-center px-8">
          <h1 [@scrollAnimation]="heroState" class="text-4xl lg:text-6xl font-bold mb-4">
            Get to Know Booking with FIMO
          </h1>
          <p [@scrollAnimation]="heroState" class="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            At FIMO, we connect people with seamless learning opportunities through smart and intuitive booking technology.
          </p>
          <button pButton pRipple [@buttonHover]="buttonState" (mouseenter)="buttonState = 'hover'"
            (mouseleave)="buttonState = 'normal'" label="Get Started"
            class="!text-xl mt-8 !px-12 !py-6 bg-primary text-white hover:bg-primary-dark transition duration-300 shadow-lg transform active:scale-95"
            routerLink="/auth/login"></button>
        </div>
      </div>

      <div [@scrollAnimation]="aboutState" class="py-16 px-8 lg:px-32 bg-gray-50 text-center">
        <h2 class="text-3xl lg:text-4xl font-semibold mb-12">Who We Are</h2>
        <p class="max-w-5xl mx-auto text-lg lg:text-xl text-gray-700 leading-relaxed">
        We are a team of passionate innovators dedicated to empowering learners and institutions with tools that simplify training session management. FIMO, our academic center, provides a wide range of training sessions on various courses. Start your journey with FIMO and enroll in one of our available courses today!
        </p>
      </div>

      <div class="features-section py-16 px-8 lg:px-32 bg-white grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div [@scrollAnimation]="featuresState" class="hover:scale-105 transition-transform duration-300">
        <img
              src="/assets/images/services/expert_instructions.jpg"
              alt="Expert Instructors"
              class="w-40 h-40 mx-auto rounded-full mb-6 shadow-lg"
            />
          <p class="text-gray-700 leading-relaxed">Learn from industry experts with hands-on experience.</p>
        </div>
        <div [@scrollAnimation]="featuresState" class="hover:scale-105 transition-transform duration-300">
        <img
              src="/assets/images/services/schedule.jpg"
              alt="Easy Booking"
              class="w-40 h-40 mx-auto rounded-full mb-6 shadow-lg"
            />
          <p class="text-gray-700 leading-relaxed">Effortlessly reserve sessions with our streamlined platform.</p>
        </div>
        <div [@scrollAnimation]="featuresState" class="hover:scale-105 transition-transform duration-300">
        <img
              src="/assets/images/services/onsite-training.jpg"
              alt="On-Site Learning"
              class="w-40 h-40 mx-auto rounded-full mb-6 shadow-lg"
            />
          <p class="text-gray-700 leading-relaxed">Engage in hands-on learning at our state-of-the-art facilities.</p>
        </div>
      </div>

      <div [@scrollAnimation]="visionState" class="bg-teal-600 text-white py-16 px-8 lg:px-32 text-center">
        <h2 class="text-3xl lg:text-4xl font-semibold mb-8">Our Vision</h2>
        <p class="max-w-4xl mx-auto text-lg lg:text-xl leading-relaxed">
          At FIMO, we envision a world where education is accessible to everyone. Our booking solutions bridge the gap between aspirations and achievements.
        </p>
      </div>

      <div class="contact-section py-16 px-8 lg:px-32 bg-gray-50 text-center">
        <h2 [@scrollAnimation]="contactState" class="text-3xl lg:text-4xl font-semibold mb-8">Ready to Learn More?</h2>
        <button pButton pRipple [@buttonHover]="buttonState" (mouseenter)="buttonState = 'hover'"
          (mouseleave)="buttonState = 'normal'" label="Contact Us"
          class="!text-xl mt-8 !px-12 !py-6 bg-primary text-white hover:bg-primary-dark transition duration-300 shadow-lg transform active:scale-95"
          (click)="router.navigate(['/'], { fragment: 'contact-us' })"
          ></button>
          </div>
    </div>
  `,
  styles: [
    `
      :host { display: block; width: 100%; height: 100%; }
      .parallax { background-attachment: fixed; background-position: center; background-size: cover; }
    `,
  ],
})
export class AboutUsWidget implements AfterViewInit, OnDestroy {
    // Animation states for sections
    heroState = 'hide';
    aboutState = 'hide';
    featuresState = 'hide';
    visionState = 'hide';
    contactState = 'hide';
  
    // Button hover state
    buttonState: 'normal' | 'hover' = 'normal';
  
    private scrollTimeout: any = null;
    private observer!: IntersectionObserver;
  
    constructor(private renderer: Renderer2, public router: Router) {}
  
    // Debounced scroll listener to improve performance
    @HostListener('window:scroll', [])
    onScroll() {
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => this.checkScroll(), 100);
    }
  
    // Check scroll position and update animation states
    private checkScroll() {
      const scrollPosition = window.scrollY;
      this.heroState = scrollPosition > 100 ? 'show' : 'hide';
      this.aboutState = scrollPosition > 500 ? 'show' : 'hide';
      this.featuresState = scrollPosition > 1000 ? 'show' : 'hide';
      this.visionState = scrollPosition > 1500 ? 'show' : 'hide';
      this.contactState = scrollPosition > 2000 ? 'show' : 'hide';
    }
  
    // Lifecycle hook: After view initializes
    ngAfterViewInit(): void {
      const lazyImages = document.querySelectorAll<HTMLImageElement>('.lazy-load');
      
      this.observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const dataSrc = img.getAttribute('data-src');
  
            if (dataSrc) {
              this.renderer.setAttribute(img, 'src', dataSrc);
              img.classList.add('loaded');
            }
            observer.unobserve(img);
          }
        });
  
        // Disconnect observer once all images are loaded
        if ([...lazyImages].every(img => img.classList.contains('loaded'))) {
          observer.disconnect();
        }
      });
  
      lazyImages.forEach(img => this.observer.observe(img));
    }
  
    // Cleanup when component is destroyed
    ngOnDestroy(): void {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      if (this.observer) {
        this.observer.disconnect();
      }
    }
    navigateTo(fragment: string): void {
        this.router.navigate(['/'], { fragment });
      }
  }