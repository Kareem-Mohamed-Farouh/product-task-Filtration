import { ProductDetailsComponent } from './Feature/pages/product-details/product-details.component';
import { NotFoundComponent } from './Feature/pages/not-found/not-found.component';
import { Routes } from '@angular/router';
import { ProductComponent } from './Feature/pages/product/product.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () =>
      import('./Feature/pages/product/product.component').then(
        (c) => c.ProductComponent
      ),
    title: 'Products',
  },
  {
    path: 'productsdetails/:id',
    loadComponent: () =>
      import('./Feature/pages/product-details/product-details.component').then(
        (c) => c.ProductDetailsComponent
      ),
    title: 'Product Details',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./Feature/pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
    title: 'Page Not Found',
  },
];
