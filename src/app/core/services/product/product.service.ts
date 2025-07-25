import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../base/environments/baseurl.environment';
import { Product } from '../../base/enums/produt.end';
import { Observable } from 'rxjs';
import { abstractProduct } from '../../base/Abstractions/product.abstraction';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements abstractProduct {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${environment.baseUrl}${Product.products}`);
  }
  getProductDetails(productId: string): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}${Product.productDetails}${productId}`
    );
  }
}
