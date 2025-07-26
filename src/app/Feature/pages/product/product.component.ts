import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { RouterLink } from '@angular/router';
import { sign } from 'crypto';
import { log } from 'console';
import { IProduct } from '../../../shared/interfaces/product';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { timeout } from 'rxjs';
@Component({
  selector: 'app-product',
  imports: [RouterLink, FormsModule, LoadingComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  private readonly products = inject(ProductService);
  translate: WritableSignal<boolean> = signal(false);
  productData: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  categories: WritableSignal<string[]> = signal<string[]>([]);
  selectCategory = new Set<string>();
  searchWord: WritableSignal<string> = signal<string>('');
  // Selected filters
  selectedFilters: WritableSignal<Set<string>> = signal(new Set<string>());
  filteredProducts: WritableSignal<IProduct[]> = signal([]);

  isCategoryChecked: boolean[] = [true, true, true, true];
  loading: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    this.getProductData();
  }
  getProductData(): void {
    this.products.getProducts().subscribe({
      next: (data) => {
        console.log('Product data coming successfully:', data);
        this.productData.set(data);

        this.filteredProducts.set(
          this.productData().sort((a, b) => {
            return a.title.localeCompare(b.title);
          })
        );

        this.categories.set([
          ...new Set(this.productData().map((p) => p.category)),
        ]);
        console.log('Categories:', this.categories());
      },
    });
  }

  // Toggle selected category and reapply filters after a short delay (simulating loading)
  toggleCategory(category: string, isChecked: boolean, index: number): void {
    isChecked
      ? this.selectCategory.add(category)
      : this.selectCategory.delete(category);
    this.isCategoryChecked[index] = !isChecked;
    this.applyFilters();
  }

  // Filter products by category, and search text
  private applyFilters(): void {
    this.loading.set(true);
    setTimeout(() => {
      this.filteredProducts.set(
        this.productData().filter((p) => {
          const matchSearch =
            this.searchWord().trim() === '' ||
            p.title.toLowerCase().includes(this.searchWord().toLowerCase());

          const matchCategory =
            this.selectCategory.size === 0 ||
            this.selectCategory.has(p.category);
          console.log(p.category);
          return matchSearch && matchCategory;
        })
      );
      this.loading.set(false);
    }, 2000);
  }

  // Extract selected value from <select> element
  getNameOption(value: any): string {
    return value.target.value;
  }
  // Sort products based on selected type (price or title)
  sortProducts(type: string) {
    this.filteredProducts.set(
      this.filteredProducts().sort((a, b) => {
        return type === 'asc'
          ? a.price - b.price
          : type === 'desc'
          ? b.price - a.price
          : type === 'a-z'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      })
    );
  }

  onSearchChange(): void {
    this.applyFilters(); // Filter products based on current search term
  }

  toggle(): void {
    this.translate.set(!this.translate());
  }
}
