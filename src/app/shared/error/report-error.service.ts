import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportErrorService {

  constructor() { }

  reportError(error:any) {
    this.setError(error)

  }


  setError(error: any) {
    if (error instanceof Error) {
    }
  }
}
