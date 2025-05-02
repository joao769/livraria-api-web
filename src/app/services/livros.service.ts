import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from './types/types';

/*export interface Ipost {
  id: number;
  codigo: string;
  nome: string;
  preco: number;
  createAt: Date;
  updateAt: Date;
}*/

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  private readonly API = 'http://localhost:3000/livros'

  constructor(private http:HttpClient) {}

  //private readonly _httpClient = inject(HttpClient);

  listar(): Observable<Livro[]> {

    return this.http.get<Livro[]>(this.API);

    //return this._httpClient.get<Ipost[]>('http://localhost:3000/livros');
  }

  adicionar(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.API, livro);
  }

  excluir(id: number): Observable<Livro> {
    return this.http.delete<Livro>(this.API + `/${id}`)
  }

  buscarPorId(id:number): Observable<Livro | undefined> {
    return this.http.get<Livro>(this.API + `/${id}`);
  }

  editar(livro: Livro):Observable<Livro> {
    const url = `${this.API}/${livro.id}`;
    return this.http.put<Livro>(url, livro)
  }
}
