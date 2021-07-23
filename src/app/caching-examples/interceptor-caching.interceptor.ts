import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { of, Observable } from "rxjs"
import { tap } from "rxjs/operators"

@Injectable()
class CacheInterceptor implements HttpInterceptor {

    private cache: Map<HttpRequest<any>, HttpResponse<any>> = new Map()
    /* 
        Key	                                            Value
        HttpRequest {url: "/api/dogs" ,…}	            HttpResponse {data: ["alsatians"],…}
        HttpRequest {url: "/api/dogs/name='bingo'" ,…}	HttpResponse {data: [{name:"bingo",…}],…}
        HttpRequest {url: "/api/cats" ,…}	            HttpResponse {data: [“serval”],…}
    */

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if req is not a GET method do nothing
        if (req.method !== "GET") {
            return next.handle(req)
        }
        // if req headers are reset, delete the cache map
        if (req.headers.get("reset")) {
            this.cache.delete(req)
        }

        // check for cached data for this req
        const cachedResponse = this.cache.get(req);

        // check if there is cached data for the req and 
        // if there is none continue or else send the cached req
        if (cachedResponse) {
            return of(cachedResponse.clone())
        } else {
            return next.handle(req)
                .pipe(
                    tap(stateEvent => {
                        if (stateEvent instanceof HttpResponse) {
                            this.cache.set(req, stateEvent.clone())
                        }
                    })
                )
        }
    }
}