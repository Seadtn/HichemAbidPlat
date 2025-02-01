import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'portfolio-widget',
    standalone: true,
    imports: [CommonModule, GalleriaModule, DialogModule, TranslateModule, ButtonModule, CarouselModule, RippleModule],
    template: `
        <div id="portfolio" class="min-h-screen flex flex-col justify-center items-center py-12 px-6 lg:px-20 bg-gray-50">
            <div class="text-center mb-12">
                <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl underline decoration-4 decoration-teal-500 hover:cursor-pointer hover:decoration-teal-600 underline-offset-4 transition-colors duration-300 rounded-lg">
                    {{ 'landingPage.topbar.portfolio' | translate }}
                </div>
                <span class="block text-muted-color text-2xl mt-4">Capturing Moments: A Visual Journey Through Creativity</span>
            </div>

            <!-- Custom Grid Carousel -->
            <div class="w-full md:w-8/12 mx-auto overflow-hidden relative">
                <!-- Grid Container -->
                <div class="grid grid-cols-2 gap-4" [style.transform]="'translateX(' + offset + 'px)'" [style.transition]="'transform 0.5s ease'">
                    <!-- Top Row -->
                    <div *ngFor="let image of visibleImagesTop" class="relative group">
                        <img 
                            [src]="image" 
                            alt="Portfolio Image" 
                            class="w-full h-48 lg:h-64 object-cover rounded-xl shadow-lg transition-transform duration-300 transform group-hover:scale-105 hover:cursor-pointer" 
                            (click)="openImage(image)"
                        />
                    </div>
                    <!-- Bottom Row -->
                    <div *ngFor="let image of visibleImagesBottom" class="relative group">
                        <img 
                            [src]="image" 
                            alt="Portfolio Image" 
                            class="w-full h-48 lg:h-64 object-cover rounded-xl shadow-lg transition-transform duration-300 transform group-hover:scale-105 hover:cursor-pointer" 
                            (click)="openImage(image)"
                        />
                    </div>
                </div>

                <!-- Navigation Buttons -->
                <button 
                    class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-300" 
                    (click)="scrollLeft()"
                >
                    <i class="pi pi-chevron-left text-xl"></i>
                </button>
                <button 
                    class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-300" 
                    (click)="scrollRight()"
                >
                    <i class="pi pi-chevron-right text-xl"></i>
                </button>
            </div>

            <!-- View More Button -->
            <div class="text-center mt-8">
                <button pButton pRipple label="View More" class="p-button px-8 py-4 text-xl" (click)="openGallery()"></button>
            </div>

            <!-- Image Preview Dialog -->
            <p-dialog header="Image Preview" [(visible)]="displayDialog" [modal]="true" [style]="{ width: '80vw', maxWidth: '800px' }" [contentStyle]="{ overflow: 'hidden' }">
                <img [src]="selectedImage" alt="Selected Image" class="w-full h-auto" />
            </p-dialog>

            <!-- Gallery Dialog -->
            <p-dialog header="Gallery" [(visible)]="displayGallery" [modal]="true" [style]="{ width: '90vw', maxWidth: '800px' }" [contentStyle]="{ overflow: 'hidden' }">
                <p-galleria 
                    [value]="images" 
                    [responsiveOptions]="responsiveOptions" 
                    [numVisible]="5" 
                    [circular]="true" 
                    [showItemNavigators]="true" 
                    [showThumbnails]="false"
                    [(activeIndex)]="activeIndex"
                >
                    <ng-template pTemplate="item" let-item>
                        <img [src]="item" alt="Gallery Image" class="w-full h-auto" />
                    </ng-template>
                </p-galleria>
            </p-dialog>
        </div>
    `,
    styles: [
        `
            :host {
                display: block;
                width: 100%;
                height: 100%;
            }
            #portfolio {
                min-height: 100vh; /* Ensure the component takes up the full viewport height */
                background-color: #f9fafb; /* Light gray background */
            }
        `
    ]
})
export class PortfolioWidget {
    // Images for the carousel (first 3 repeated to make 6 images)
    images = [
        'assets/images/slider/slide1.jpg', 
        'assets/images/slider/slide2.jpg', 
        'assets/images/slider/slide3.jpg',  
        'assets/images/slider/slide1.jpg', 
        'assets/images/slider/slide2.jpg', 
        'assets/images/slider/slide3.jpg',  
        'assets/images/slider/slide1.jpg', 
        'assets/images/slider/slide2.jpg', 
        'assets/images/slider/slide3.jpg',  
        'assets/images/slider/slide1.jpg', 
        'assets/images/slider/slide2.jpg', 
        'assets/images/slider/slide3.jpg',  
    ];

    // Visible images for top and bottom rows
    visibleImagesTop = this.images.slice(0, 3);
    visibleImagesBottom = this.images.slice(3, 6);

    // Scroll offset
    offset = 0;

    // Dialog and gallery states
    displayDialog = false;
    displayGallery = false;
    selectedImage: string | null = null;

    // Active index for the gallery
    activeIndex: number = 0;

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

    // Scroll left
    scrollLeft() {
        this.offset += 300; // Adjust the scroll distance as needed
        if (this.offset > 0) {
            this.offset = 0; // Prevent scrolling past the first set of images
        }
    }

    // Scroll right
    scrollRight() {
        this.offset -= 300; // Adjust the scroll distance as needed
        const maxOffset = -((this.images.length / 2 - 1) * 300); // Adjust based on the number of images
        if (this.offset < maxOffset) {
            this.offset = maxOffset; // Prevent scrolling past the last set of images
        }
    }
}