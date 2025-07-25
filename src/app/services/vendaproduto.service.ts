import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendaproduto } from '../models/vendaproduto';
import { appSettings } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class VendaprodutoService {

  private apiUrl = `${appSettings.apiBaseUrl}/vendaprodutos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Vendaproduto[]> {
    return this.http.get<Vendaproduto[]>(this.apiUrl);
  }

  listarPorVenda(idVenda: number): Observable<Vendaproduto[]> {
    const url = `${this.apiUrl}/venda/${idVenda}`;
    return this.http.get<Vendaproduto[]>(url);
  }

  salvar(vendaproduto: Vendaproduto): Observable<Vendaproduto> {
    if (vendaproduto.id) {
      return this.http.put<Vendaproduto>(`${this.apiUrl}/${vendaproduto.id}`, vendaproduto);
    } else {
      return this.http.post<Vendaproduto>(this.apiUrl, vendaproduto);
    }
  }

  buscarPorId(id: number): Observable<Vendaproduto> {
    return this.http.get<Vendaproduto>(`${this.apiUrl}/${id}`);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
