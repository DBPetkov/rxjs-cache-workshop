import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cacheable } from 'ts-cacheable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private readonly URL = 'https://world.openfoodfacts.org/api/v0/product/';

  constructor(private http: HttpClient) {
  }
  
  // using ts-cacheable
  @Cacheable()
  resolveProduct(code: string): Observable<any> {
    console.log('Request is sent!')
    return this.http.get(this.URL+code+'.json');
  }

  /*
  If we call this method by this.productService.resolveProduct(1), 
  its return value will be cached and returned, 
  up until the method is called with a different parameter.
  Then the old cache will be busted and a new one will take its place.
  */

}