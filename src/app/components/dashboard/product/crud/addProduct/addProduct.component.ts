import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardHeaderComponent } from '../../../dashboardHeader/dashboardHeader.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../../services/products/product.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../../../interfaces/Product';

@Component({
  selector: 'app-addProduct',
  standalone: true,
  imports: [DashboardHeaderComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './addProduct.component.html',
  styleUrls: ['./addProduct.component.css']
})
export class AddProductComponent implements OnInit {
  title: string = 'Agregar Producto';
  private subs: Array<Subscription> = [];
  private activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductService);
  public userId = signal('');
  public onEdit = signal(false);
  private formBuilder = inject(FormBuilder);
  public accountForm: FormGroup;
  
  constructor() {
    this.accountForm = new FormGroup({})
   }

  ngOnInit() {
    this.subs.push(
      this.activatedRoute.paramMap.subscribe((data: any) => {
        if (data.params.id) {
          this.userId.set(data.params.id);
          this.onEdit.set(true);
          this.productService.getProductsId(data.params.id)
            .subscribe(product => this.setValues(product));
          this.accountForm = this.formBuilder.group({
            name: ['', Validators.required],
            lastName: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            enterprise: ['', Validators.required],
            birthday: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
          });
        } else {
          this.onEdit.set(false);
          this.accountForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            birthday: ['', Validators.required],
            phoneNumber: ['', [Validators.required, Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)]],
            gender: [''],
            civiledo: [''],
            job: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
          });
        }
      })
    );
  }


  private setValues(user: any): void {
    const values = this.productService.mapRequiredValues(user);
    const { controls } = this.accountForm;

    for (const value in values) {
      if (controls.hasOwnProperty(value)) {
        this.accountForm.controls[value].setValue(values[value]);
      }
    }
  }
}
