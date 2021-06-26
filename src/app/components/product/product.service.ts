import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { Product } from './product.model';
import {catchError, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:3001/products';
  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string,isError:boolean=false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass:isError ? ['msg-error']:['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj=>obj),
      catchError(e=> this.handlerError(e))
      )
  }
  read():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj=>obj),
      catchError(e=> this.handlerError(e))
      )
  }
  readById(id:string): Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url);
  }
  update(product:Product): Observable <Product>{
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url,product).pipe(
      map(obj=>obj),
      catchError(e=> this.handlerError(e))
      )
  }
  delete(product:Product): Observable<Product>{ 
    const url = `${this.baseUrl}/${product.id}`
    console.log(url)
    return  this.http.delete<Product>(url).pipe(
      map(obj=>obj),
      catchError(e=> this.handlerError(e))
      ) 
  }
  handlerError(e:any):Observable<any> {
    this.showMessage('Ocorreu um erro!',true);
    return EMPTY;
  }
}
