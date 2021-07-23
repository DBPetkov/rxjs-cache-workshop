import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    // Simple service, no caching

    private readonly URL = 'https://world.openfoodfacts.org/api/v0/product/';

    constructor(private http: HttpClient) {
    }

    resolveProduct(code: string): Observable<any> {
        console.log('Request is sent!')
        return this.http.get(this.URL + code + '.json');
    }

}