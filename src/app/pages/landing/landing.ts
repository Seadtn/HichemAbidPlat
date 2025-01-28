import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TopbarWidget } from './components/topbarwidget.component';
import { HeroWidget } from './components/herowidget';
import { FeaturesWidget } from './components/featureswidget';
import { HighlightsWidget } from './components/highlightswidget';
import { PricingWidget } from './components/pricingwidget';
import { FooterWidget } from './components/footerwidget';
import { PortfolioWidget } from "./components/protfoliowidget";
import { ContactUsWidget } from "./components/contactuswidget";
import { AboutUsWidget } from "./components/aboutuswidget";
import { PartnershipWidget } from "./components/partnershipwidget";

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [RouterModule, TopbarWidget, HeroWidget, FeaturesWidget, FooterWidget, RippleModule, StyleClassModule, ButtonModule, DividerModule, PortfolioWidget, ContactUsWidget, AboutUsWidget, PartnershipWidget],
    template: `
        <div class="bg-surface-0 dark:bg-surface-900">
            <div id="home" class="landing-wrapper overflow-hidden">
                <topbar-widget class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static" />
                <hero-widget />
                <about-us-widget/>
                <features-widget />
                <partnership-widget/>
                <portfolio-widget/>
                <!-- <highlights-widget /> -->
                <!-- <pricing-widget /> -->
                <contact-us-widget/>
                <footer-widget />
            </div>
        </div>
    `
})
export class Landing {}
