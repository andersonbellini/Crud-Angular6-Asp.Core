import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {
    HttpClientModule, HttpClient, HttpHeaders,
    HttpParams, HttpEvent, HttpRequest, HttpHandler, HttpInterceptor
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ServiceHelpersService {
    constructor(private _http: HttpClient) { }

    public post<T>(api: string, url: string, data: any, addToken: boolean = true,
        contentType: ContentTypeEnum = ContentTypeEnum.JSON): Observable<T> {
        return this._http.post<T>(this.joinEndPoint(api, url), data, {withCredentials: addToken})
            .pipe(map(this.extractData),catchError(this.handleError.bind(this)));
    }
    public postLogin<T>(api: string, url: string, data: any, addToken: boolean = true,
        contentType: ContentTypeEnum = ContentTypeEnum.JSON): Observable<T> {
        return this._http.post<T>(this.joinEndPoint(api, url), data, this.getOptions(data, contentType, addToken))
            .pipe(map(this.extractData),catchError(this.handleError.bind(this)));
    }

    public get<T>(api: string, url: string, params: HttpParams, withCredentials: boolean = true): Observable<T> {
        return this._http.get<T>(this.joinEndPoint(api, url), { withCredentials: withCredentials })
            .pipe(map(this.extractData),catchError(this.handleError.bind(this)));
    }

    public getNoParams<T>(api: string, url: string): Observable<T> {
        return this._http.get<T>(this.joinEndPoint(api, url), { withCredentials: true });
    }

    public put<T>(api: string, url: string, data: any, addToken: boolean = true,
        contentType: ContentTypeEnum = ContentTypeEnum.JSON): Observable<T> {
        return this._http.put<T>(this.joinEndPoint(api, url), data, this.getOptions(data, contentType, addToken));
    }

    public getOptions(params: HttpParams, contentType: ContentTypeEnum, addToken: boolean): {} {
        let headers;
        headers = new HttpHeaders()
            .append('Accept', 'application/json')
            .append('Content-Type', 'application/json');       
        return [{ headers: headers, params: params }];
    }

    public getOptionsNoParams(contentType: ContentTypeEnum, addToken: boolean): {} {
        const headers = new HttpHeaders({
            'Accept': 'application/json'
        });

        switch (contentType) {
            case ContentTypeEnum.JSON: {
                headers.append('Content-Type', 'application/json');
                break;
            }
            case ContentTypeEnum.FORM: {
                headers.append('Content-Type', 'application/x-www-form-urlencoded');
                break;
            }
        }
        return [{ headers: headers }];
    }

    private joinEndPoint(api: string, url: string): string {
        return Location.joinWithSlash(api, url);
    }

    private extractData(res: any): any {
        const body = res;
        return body || {};
    }

    private handleError(error: any) {
        if (error.status === 401) {
            throw error;
        } else {
            throw error;
        }
    }
}

export enum ContentTypeEnum {
    JSON = 1,
    FORM = 2
}
