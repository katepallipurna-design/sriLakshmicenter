import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BRAND } from '../../core/config/brand.config';

@Component({
  selector: 'app-footer',
  imports: [ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected readonly brand = BRAND;
  protected submitted = false;
  protected readonly newsForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
}
