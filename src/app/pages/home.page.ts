import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND } from '../core/config/brand.config';

type PackageCategory = 'all' | 'general' | 'lifestyle' | 'women' | 'offers';

interface HealthPackage {
  title: string;
  params: number;
  category: Exclude<PackageCategory, 'all'>;
}

interface HeroSlide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePageComponent {
  protected readonly brand = BRAND;
  private slideTimer?: ReturnType<typeof setInterval>;

  protected readonly slides: HeroSlide[] = [
    {
      title: "Get the matchless advantage of world's best MRI",
      description: 'Enhanced comfort, clarity, and child-friendly radiology support.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80'
    },
    {
      title: 'Movies. Music. MRI with better comfort',
      description: 'Relaxed scan environment designed to reduce stress and improve patient experience.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80'
    },
    {
      title: 'Built on care, grown with trust',
      description: 'From consultation to reports, every step is handled with attention and empathy.',
      image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1400&q=80'
    },
    {
      title: 'Accurate reports for timely treatment',
      description: 'Modern diagnostics, clear communication, and dependable quality standards.',
      image: 'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=1400&q=80'
    },
    {
      title: 'Comprehensive diagnostics under one roof',
      description: 'Pathology, radiology, preventive care, and a supportive patient-first team.',
      image: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=1400&q=80'
    }
  ];
  protected readonly activeSlide = signal(0);

  protected readonly radiology = [
    'CT Scan',
    'MRI Scan',
    'Ultrasound',
    'X-Ray',
    'PET CT',
    'MRI-3T',
    'Cardiology'
  ];

  protected readonly cities = [
    'Hyderabad',
    'Bengaluru',
    'Pune',
    'Visakhapatnam',
    'Tirupati',
    'Nizamabad',
    'Khammam',
    'Warangal',
    'Vijayawada',
    'Guntur'
  ];

  protected readonly filters: { id: PackageCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'general', label: 'General Wellness' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'women', label: 'Women Care' },
    { id: 'offers', label: 'Offers' }
  ];

  protected readonly packages: HealthPackage[] = [
    { title: 'Srilakshmi General Health Check — Basic', params: 11, category: 'general' },
    { title: 'Srilakshmi Master Health Checkup', params: 19, category: 'general' },
    { title: 'Srilakshmi Advanced Health Checkup', params: 16, category: 'lifestyle' },
    { title: 'Srilakshmi Cardiac Profile — Basic', params: 7, category: 'lifestyle' },
    { title: 'Srilakshmi Women Wellness Package', params: 14, category: 'women' },
    { title: 'Srilakshmi Executive Offer — Combo', params: 22, category: 'offers' }
  ];

  protected readonly activeFilter = signal<PackageCategory>('all');

  protected readonly visiblePackages = computed(() => {
    const f = this.activeFilter();
    if (f === 'all') return this.packages;
    return this.packages.filter((p) => p.category === f);
  });

  protected setFilter(id: PackageCategory): void {
    this.activeFilter.set(id);
  }

  protected setSlide(index: number): void {
    this.activeSlide.set(index);
    this.restartAutoSlide();
  }

  protected nextSlide(): void {
    this.activeSlide.set((this.activeSlide() + 1) % this.slides.length);
  }

  protected prevSlide(): void {
    this.activeSlide.set((this.activeSlide() - 1 + this.slides.length) % this.slides.length);
    this.restartAutoSlide();
  }

  ngOnInit(): void {
    this.slideTimer = setInterval(() => this.nextSlide(), 4500);
  }

  ngOnDestroy(): void {
    if (this.slideTimer) clearInterval(this.slideTimer);
  }

  private restartAutoSlide(): void {
    if (this.slideTimer) clearInterval(this.slideTimer);
    this.slideTimer = setInterval(() => this.nextSlide(), 4500);
  }
}
