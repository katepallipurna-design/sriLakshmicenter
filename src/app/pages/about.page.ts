import { Component } from '@angular/core';
import { BRAND } from '../core/config/brand.config';

export interface JourneyMilestone {
  year: string;
  title: string;
}

@Component({
  selector: 'app-about-page',
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss'
})
export class AboutPageComponent {
  protected readonly brand = BRAND;

  /** Safe tel: link for templates */
  protected readonly telHref = `tel:${BRAND.phone.replace(/\s/g, '')}`;

  /** Journey begins 2024 at Chekkapalli; highlights 2+ years of care */
  protected readonly milestones: JourneyMilestone[] = [
    {
      year: '2024',
      title: `${BRAND.shortName} opens in Chekkapalli — modern diagnostics rooted in care for our community.`
    },
    {
      year: '2025',
      title: 'Digital reports, appointment ease, and home sample support — making access simpler for families nearby.'
    },
    {
      year: '2026',
      title: '2+ years of trusted service — growing with every test, every report, and every patient story.'
    }
  ];

  protected readonly statHighlights = [
    { value: '2+', label: 'Years of experience', sub: 'Trusted care since 2024 in Chekkapalli' },
    { value: '1', label: 'Centre', sub: 'Chekkapalli, Nuzvidu (Andhra Pradesh)' },
    { value: '24/7', label: 'Support mindset', sub: 'Clear reports · Compassionate team' }
  ] as const;
}
