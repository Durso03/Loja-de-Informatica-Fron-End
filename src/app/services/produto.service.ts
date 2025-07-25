import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { Observable } from 'rxjs';
import { appSettings } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = `${appSettings.apiBaseUrl}/produtos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  salvar(produto: Produto): Observable<Produto> {
    if (produto.id) {
      return this.http.put<Produto>(`${this.apiUrl}/${produto.id}`, produto);
    } else {
      return this.http.post<Produto>(this.apiUrl, produto);
    }
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
