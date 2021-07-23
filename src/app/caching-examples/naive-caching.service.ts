import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    // Naive caching

    private readonly URL = 'https://world.openfoodfacts.org/api/v0/product/';

    constructor(private http: HttpClient) {
    }

    // we use a simple object to store req data
    cache: any = {};

    resolveProduct(code: string): Observable<any> {
        if (this.cache[code]) {
            console.log('Returning cached value!')
            return of(this.cache[code])
        }
        console.log('Do the request again')
        return this.http.get(this.URL + code + '.json').pipe(
            tap(resolvedValue => {
                this.cache[code] = resolvedValue;
            }));
    }

    /* NOTE: 
    We put the value into the cache asynchronously,
    and all asynchronous code will be executed after the synchronous code.
    What if we call the resolve function in a for loop
    or in *ngFor or just have several components using it within the same template?
    It turns out that our cache doesn’t do the job.
    */

}