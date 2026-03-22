import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MockSubmitService } from '../core/services/mock-submit.service';
import { BRAND } from '../core/config/brand.config';

type PageKey =
  | 'about'
  | 'book-test'
  | 'home-sample-collection'
  | 'buy-health-checkup'
  | 'upload-prescription'
  | 'corporate-wellness'
  | 'investors'
  | 'locate-centre'
  | 'download-report';

const PAGE_CONTENT: Record<PageKey, { title: string; desc: string }> = {
  about: { title: 'About Us', desc: 'Trusted diagnostics with accurate reports and patient-first care.' },
  'book-test': { title: 'Book a Test', desc: 'Schedule lab tests online with quick confirmations.' },
  'home-sample-collection': { title: 'Home Sample Collection', desc: 'Convenient doorstep sample collection slots.' },
  'buy-health-checkup': { title: 'Buy Health Checkup', desc: 'Preventive packages for every age group.' },
  'upload-prescription': { title: 'Upload Prescription', desc: 'Upload your prescription and we will suggest tests.' },
  'corporate-wellness': { title: 'Corporate Wellness', desc: 'Health programs and annual checkups for teams.' },
  investors: { title: 'Investors', desc: 'Corporate information, governance, and updates.' },
  'locate-centre': { title: 'Locate Centre', desc: 'Find nearest branches and service timings.' },
  'download-report': { title: 'Download Report', desc: 'Access your diagnostic reports securely.' }
};

@Component({
  selector: 'app-generic-page',
  imports: [ReactiveFormsModule],
  templateUrl: './generic.page.html',
  styleUrl: './generic.page.scss'
})
export class GenericPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(MockSubmitService);
  protected readonly brand = BRAND;
  protected readonly loading = signal(false);
  protected readonly success = signal('');

  protected readonly key = computed(() => (this.route.snapshot.data['pageKey'] as PageKey) ?? 'about');
  protected readonly content = computed(() => PAGE_CONTENT[this.key()]);
  protected readonly formTitle = computed(() =>
    this.key() === 'book-test' ? 'Book Appointment Form' :
    this.key() === 'download-report' ? 'Get Report Form' :
    this.key() === 'locate-centre' ? 'Enquiry Form' : 'Request Form'
  );

  protected readonly form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    date: new FormControl('', Validators.required),
    prescription: new FormControl(''),
    message: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  protected isPrescriptionPage(): boolean {
    return this.key() === 'upload-prescription';
  }

  protected submit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.success.set('');
    this.service.submit(this.form.value).subscribe((res) => {
      this.loading.set(false);
      if (res.ok) {
        this.success.set(res.id);
        this.form.reset();
      }
    });
  }
}
