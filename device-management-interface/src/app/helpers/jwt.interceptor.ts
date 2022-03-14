import { Inject, Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenStorageService } from "../services/token-storage.service";
import { BASE_URL } from "src/environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private tokenStorage:TokenStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenStorage.getToken();
        const isApiUrl = req.url.startsWith(BASE_URL);
        if(token && isApiUrl)
        {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        return next.handle(req);
    }
}