import { Observable } from 'rxjs';

export abstract class abstractProduct {
  abstract getProducts(): Observable<any>;
  abstract getProductDetails(productId: string): Observable<any>;
}
