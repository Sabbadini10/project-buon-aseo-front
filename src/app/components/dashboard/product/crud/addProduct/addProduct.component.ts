import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { DashboardHeaderComponent } from '../../../dashboardHeader/dashboardHeader.component';
import {  Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../../services/products/product.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../../../interfaces/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addProduct',
  standalone: true,
  imports: [DashboardHeaderComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './addProduct.component.html',
  styleUrls: ['./addProduct.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy  {
  title: string = 'Agregar Producto';
  private subs: Array<Subscription> = [];
  private activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductService);
  public productId = signal('');
  public onEdit = signal(false);
  private formBuilder = inject(FormBuilder);
  public accountForm: FormGroup;
  public isLoading = signal(true);
  public loadMessage = signal(true);
  public loadMessageError = signal(true);
  
  constructor() {
    this.accountForm = new FormGroup({})
   }

  ngOnInit() {
    this.subs.push(
      this.activatedRoute.paramMap.subscribe((data: any) => {
        this.productId.set(data.params.id);
        console.log(this.productId())
        if (this.productId()) {
          this.onEdit.set(true);
          this.productService.getProductsId(data.params.id)
            .subscribe(product => this.setValues(product));
          this.accountForm = this.formBuilder.group({
            name: ['', Validators.required],
            idCode: ['', Validators.required],
            price: ['', Validators.required],
            discount: ['', Validators.required],
            stock: ['', Validators.required],
            image: ['', Validators.required],
            volume: ['', Validators.required],
            smell: ['', Validators.required],
            description: ['', Validators.required],
          });
        } else {
          this.onEdit.set(false);
          this.accountForm = this.formBuilder.group({
            name: ['', Validators.required],
            idCode: ['', Validators.required],
            price: ['', Validators.required],
            discount: ['', Validators.required],
            stock: ['', Validators.required],
            image: ['', Validators.required],
            volume: ['', Validators.required],
            smell: ['', Validators.required],
            description: ['', Validators.required],
          });
        }
      })
    );
  }


  private setValues(product: Product[]): void {
    const values = this.productService.mapRequiredValues(product);
    const { controls } = this.accountForm;
    for (const value in values) {
      if (controls.hasOwnProperty(value)) {
        this.accountForm.controls[value].setValue(values[value]);
      }
    }
  }

  private buildProduct(){
    return {
      name: this.accountForm.controls['name'].value,
      idCode: this.accountForm.controls['idCode'].value,
      price: this.accountForm.controls['price'].value,
      discount: this.accountForm.controls['discount'].value,
      stock: this.accountForm.controls['stock'].value,
      image: this.accountForm.controls['image'].value,
      volume: this.accountForm.controls['volume'].value,
      smell: this.accountForm.controls['smell'].value,
      description: this.accountForm.controls['description'].value,
  }
}

private buildUpdateProduct(){
  return {
    name: this.accountForm.controls['name'].value,
    idCode: this.accountForm.controls['idCode'].value,
    price: this.accountForm.controls['price'].value,
    discount: this.accountForm.controls['discount'].value,
    stock: this.accountForm.controls['stock'].value,
    image: this.accountForm.controls['image'].value,
    volume: this.accountForm.controls['volume'].value,
    smell: this.accountForm.controls['smell'].value,
    description: this.accountForm.controls['description'].value,
}
}

createProduct() {
  const product = [this.buildProduct()];
  console.log(product);
    this.subs.push(
      this.productService.addProducts(product).subscribe({
        next: (data) => {
          console.log(data)
          if(data){
            this.loadMessage.update(value => value != value)
          }
        },
        error: (error) => {
          this.loadMessageError.update(value => value != value)
          console.error('Error:', error);
        },
      })
    );
   
}

updateProduct() {
  const product = [this.buildUpdateProduct()];
  console.log(product);
    this.subs.push(
      this.productService.editProducts(this.productId(), product).subscribe({
        next: (data) => {
          console.log(data)
          if(data){
            this.loadMessage.update(value => value != value)
          }
        },
        error: (error) => {
          this.loadMessageError.update(value => value != value)
          console.error('Error:', error);
        },
      })
    );
   
}


onSubmit() {
  if (this.accountForm.invalid) {
    return;
  }
  if (this.onEdit()) {
    this.updateProduct();
  } else {
    this.createProduct();
  }
  this.clickLoading()
}

clickLoading(){
  this.isLoading.update(value => value  = !value);
  console.log(this.isLoading())
}


  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
