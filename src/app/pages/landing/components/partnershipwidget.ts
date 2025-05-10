import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'partnership-widget',
    standalone: true,
    imports: [CommonModule, GalleriaModule, DialogModule, TranslateModule, ButtonModule, CarouselModule, RippleModule],
    template: `

        <div id="partnership" class="py-12 px-6 lg:px-20 mx-0 lg:mx-20">
            <div class="col-span-12 text-center mt-20 mb-6">
                <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl underline decoration-4 decoration-teal-500 hover:cursor-pointer hover:decoration-teal-600 underline-offset-4 transition-colors duration-300 rounded-lg">
                    {{ 'Our Partners and Stakeholders' | translate }}
                </div>
                <p class="block text-muted-color text-2xl mt-4">We are grateful to our partners and stakeholders who have contributed to our success.</p>
                <p class="block text-muted-color text-2xl mt-4">Their support and collaboration have been instrumental in our journey.</p>
            </div>

            <!-- Carousel with 6 photos (first 3 repeating) -->
            <p-carousel 
                [value]="images" 
                [numVisible]="3" 
                [numScroll]="1" 
                [circular]="true" 
                [autoplayInterval]="3000" 
                class="w-full md:w-6/12 mx-auto"
            >
                <ng-template pTemplate="item" let-image>
                    <img 
                        [src]="image" 
                        alt="Slide Image" 
                        class="w-full rounded-xl shadow-lg transition-transform duration-500 transform hover:scale-105 object-cover" 
                    />
                </ng-template>
            </p-carousel>

            <div class="text-center mt-8">
                <button pButton pRipple label="View More" class="p-button px-8 py-4 text-xl" (click)="openGallery()"></button>
            </div>

            <!-- Image Preview Dialog -->
            <p-dialog header="Image Preview" [(visible)]="displayDialog" [modal]="true" [style]="{ width: '80vw', maxWidth: '800px' }" [contentStyle]="{ overflow: 'hidden' }">
                <img [src]="selectedImage" alt="Selected Image" class="w-full h-auto" />
            </p-dialog>

            <!-- Gallery Dialog -->
            <p-dialog header="Gallery" [(visible)]="displayGallery" [modal]="true" [style]="{ width: '90vw', maxWidth: '800px' }" [contentStyle]="{ overflow: 'hidden' }">
                <p-galleria [value]="images" [responsiveOptions]="responsiveOptions" [numVisible]="5" [circular]="true" [showItemNavigators]="true" [showThumbnails]="false">
                    <ng-template pTemplate="item" let-item>
                        <img [src]="item" alt="Gallery Image" class="w-full h-auto" />
                    </ng-template>
                </p-galleria>
            </p-dialog>

            <!-- Our Partners and Stakeholders Section -->
            <div class="mt-16 text-center">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div *ngFor="let stakeholder of stakeholders" class="p-6 bg-surface-0 dark:bg-surface-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="flex items-center justify-center bg-teal-200 mb-6 transition-transform duration-300 group-hover:rotate-12" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-users !text-2xl text-teal-700"></i>
                        </div>
                        <h5 class="text-xl font-semibold mb-4 text-surface-900 dark:text-surface-0">{{ stakeholder.name }}</h5>
                        <p class="text-surface-600 dark:text-surface-200">{{ stakeholder.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class PartnershipWidget {
    // Images for the carousel (first 3 will repeat)
    images = [
        '/assets/images/slider/slide1.jpg', 
        '/assets/images/slider/slide2.jpg', 
        '/assets/images/slider/slide3.jpg',  
        '/assets/images/slider/slide1.jpg', // Repeat first 3
        '/assets/images/slider/slide2.jpg', 
        '/assets/images/slider/slide3.jpg',  
    ];

    // Stakeholders data
    stakeholders = [
        { name: 'Industry Experts', description: 'Providing valuable insights and expertise to our training programs.' },
        { name: 'Educational Institutions', description: 'Collaborating with us to offer comprehensive learning experiences.' },
        { name: 'Technology Partners', description: 'Enabling us with cutting-edge tools and platforms.' }
    ];

    // Dialog and gallery states
    displayDialog = false;
    displayGallery = false;
    selectedImage: string | null = null;

    // Responsive options for the gallery
    responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    // Open image in dialog
    openImage(image: string) {
        this.selectedImage = image;
        this.displayDialog = true;
    }

    // Open gallery dialog
    openGallery() {
        this.displayGallery = true;
    }
}