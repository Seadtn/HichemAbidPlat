import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'about-us-widget',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div
            id="about-us"
            class="flex flex-col pt-12 px-8 lg:px-24 overflow-hidden relative"
        >
        <div class="mx-8 md:mx-24 mt-20 md:mt-24 text-center md:text-left">
                <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl underline decoration-4 decoration-teal-500 hover:cursor-pointer hover:decoration-teal-600 underline-offset-4 transition-colors duration-300 rounded-lg">
                Get to know us.
                </div>
                <div class="max-w-4xl mx-auto text-center">
                <span class="text-muted-color text-2xl">We make online booking quick and easy.</span>
                </div>
                <span class="text-muted-color text-2xl">At FIMO, we aim to bridge the gap between knowledge and opportunity. Our goal is to make learning accessible, efficient, and inspiring through a seamless booking experience.</span>
            
  
            </div>
            <div class="features-section px-18 lg:px-54 py-30 bg-gray-100">
            <h2 class="max-w-2xl mx-auto text-center">
                Why Choose FIMO?
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="flex flex-col items-center text-center">
                    <img src="/assets/images/services/expert_instructions.jpg" alt="Expert Instructors" class="w-48 h-48 mb-8">
                    <h3 class="text-xl font-semibold">Expert Instructors</h3>
                    <p class="text-gray-700 mt-2">Learn from industry experts with years of experience.</p>
                </div>
                <div class="flex flex-col items-center text-center">
                    <img src="/assets/images/services/schedule.jpg" alt="Easy Booking" class="w-48 h-48 mb-8">
                    <h3 class="text-xl font-semibold">Easy Booking</h3>
                    <p class="text-gray-700 mt-2">Reserve your spot effortlessly with our platform.</p>
                </div>
                <div class="flex flex-col items-center text-center">
                    <img src="/assets/images/services/onsite-training.jpg" alt="On-Site Learning" class="w-48 h-48 mb-8">
                    <h3 class="text-xl font-semibold">On-Site Learning</h3>
                    <p class="text-gray-700 mt-2">Engage in interactive sessions at our academic center.</p>
                </div>
            </div>
        </div>
        </div>
    `
})
export class AboutUsWidget {}
