import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
@Component({
    selector: 'contact-us-widget',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, InputTextarea],
    template: `
        <div id="contact-us" class="py-12 px-6 lg:px-20 mx-0 lg:mx-20">
            <div class="col-span-12 text-center mt-20 mb-6">
                <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl underline decoration-4 decoration-teal-500 hover:cursor-pointer hover:decoration-teal-600 underline-offset-4 transition-colors duration-300 rounded-lg">
                    Let's Chat!
                </div>
                <span class="text-muted-color text-2xl">We'd love to hear from you!</span>
            </div>
            <div class="max-w-3xl mx-auto">
                <form class="grid grid-cols-1 gap-6">
                    <input type="text" pInputText placeholder="Your Name" class="w-full p-3 rounded-lg shadow-md" />
                    <input type="email" pInputText placeholder="Your Email" class="w-full p-3 rounded-lg shadow-md" />
                    <textarea pInputTextarea rows="5" placeholder="Your Message" class="w-full p-3 rounded-lg shadow-md"></textarea>
                    <button pButton pRipple label="Send Message" class="p-button px-8 py-4 text-xl"></button>
                </form>
            </div>
        </div>
    `
})
export class ContactUsWidget {}
