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
    imports: [CommonModule, GalleriaModule, DialogModule, TranslateModule, ButtonModule,CarouselModule, RippleModule],
    template: `
        <div id="partnership" class="py-12 px-6 lg:px-20  mx-0 lg:mx-20">
            <div class="col-span-12 text-center mt-20 mb-6">
                <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl underline decoration-4 decoration-teal-500 hover:cursor-pointer hover:decoration-teal-600 underline-offset-4 transition-colors duration-300 rounded-lg">
                    {{ 'landingPage.topbar.partnership' | translate }}
                </div>
                <span class="block text-muted-color text-2xl mt-4">Capturing Moments: A Visual Journey Through Creativity</span>
            </div>
            <!-- <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div *ngFor="let image of images.slice(0, 6)" class="relative group">
                    <img [src]="image" alt="partnership Image" class="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 transform group-hover:scale-105 group-hover:shadow-xl hover:cursor-pointer" (click)="openImage(image)" />
                </div>
            </div> -->
            <p-carousel 
                    [value]="images" 
                    [numVisible]="3" 
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
                            class="w-full ml-3 rounded-xl shadow-lg transition-transform duration-500 transform hover:scale-105 object-cover" 
                        />
                    </ng-template>
                </p-carousel>
            <div class="text-center mt-8">
                <button pButton pRipple label="View More" class="p-button px-8 py-4 text-xl" (click)="openGallery()"></button>
            </div>
            <p-dialog header="Image Preview" [(visible)]="displayDialog" [modal]="true" [style]="{ width: '80vw', maxWidth: '800px' }" [contentStyle]="{ overflow: 'hidden' }">
                <img [src]="selectedImage" alt="Selected Image" class="w-full h-auto" />
            </p-dialog>
            <p-dialog header="Gallery" [(visible)]="displayGallery" [modal]="true" [style]="{ width: '90vw', maxWidth: '800px' }" [contentStyle]="{ overflow: 'hidden' }">
                <p-galleria [value]="images" [responsiveOptions]="responsiveOptions" [numVisible]="5" [circular]="true" [showItemNavigators]="true" [showThumbnails]="false">
                    <ng-template pTemplate="item" let-item>
                        <img [src]="item" alt="Gallery Image" class="w-full h-auto" />
                    </ng-template>
                </p-galleria>
            </p-dialog>
        </div>
    `
})
export class PartnershipWidget {
    images = [
        '/assets/images/slider/slide1.jpg', 
        '/assets/images/slider/slide2.jpg', 
        '/assets/images/slider/slide3.jpg',  
    ];

    displayDialog = false;
    displayGallery = false;
    selectedImage: string | null = null;

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

    openImage(image: string) {
        this.selectedImage = image;
        this.displayDialog = true;
    }

    openGallery() {
        this.displayGallery = true;
    }
}
