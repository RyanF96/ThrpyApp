// Angular Modules
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class Constants {
    public readonly HTTPS_API_ENDPOINT: string = 'https://localhost:7042/api/';
    public readonly HTTP_API_ENDPOINT: string = 'http://localhost:5024/api/';
} 
