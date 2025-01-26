import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'about-us-widget',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div id="about-us" class="py-12 px-6 lg:px-20 mx-0 lg:mx-20">

            <div class="col-span-12 text-center mt-20 mb-6">
                <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl underline decoration-4 decoration-teal-500 hover:cursor-pointer hover:decoration-teal-600 underline-offset-4 transition-colors duration-300 rounded-lg">
                    About Us
                </div>
                <span class="text-muted-color text-2xl">Learn more about our mission and values</span>
            </div>
            <div class="max-w-4xl mx-auto text-center">
                <p class="text-lg leading-relaxed text-surface-600 dark:text-surface-200">We are dedicated to providing the best service possible. Our team is passionate about helping you achieve your goals.</p>
            </div>
        </div>
    `
})
export class AboutUsWidget {}
