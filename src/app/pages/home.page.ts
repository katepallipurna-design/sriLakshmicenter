import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND } from '../core/config/brand.config';

type PackageCategory = 'all' | 'general' | 'lifestyle' | 'women' | 'offers';

interface HealthPackage {
  title: string;
  params: number;
  category: Exclude<PackageCategory, 'all'>;
}

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePageComponent {
  protected readonly brand = BRAND;

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
}
