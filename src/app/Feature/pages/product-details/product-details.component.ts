import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { IProduct, Rating } from '../../../shared/interfaces/product';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  productData: WritableSignal<IProduct> = signal<IProduct>({} as IProduct);
  products: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  productrating: WritableSignal<Rating> = signal<Rating>({} as Rating);

  productId: WritableSignal<string> = signal<string>('');
  ngOnInit(): void {
    this.route.paramMap.subscribe((P) => {
      this.productId.set(P.get('id')!);
      if (this.productId()) {
        this.productService.getProductDetails(this.productId()).subscribe({
          next: (data) => {
            console.log('Product details fetched successfully:', data);
            this.productData.set(data);
            this.productrating.set(this.productData().rating);
          },
          error: (err) => {
            console.error('Error fetching product details:', err);
          },
        });
      }
    });

    this.getProducts();
  }
  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('Products fetched successfully:', data);
        this.products.set(data);
      },
      error: (err) => {
        console.error('Error fetching product details:', err);
      },
    });
  }
}
