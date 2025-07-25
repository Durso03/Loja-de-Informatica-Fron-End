import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venda } from '../models/venda';
import { Vendaproduto } from '../models/vendaproduto';
import { appSettings } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private apiUrl = `${appSettings.apiBaseUrl}/vendas`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.apiUrl);
  }

  salvar(venda: Venda): Observable<Venda> {
    if (venda.id) {
      return this.http.put<Venda>(`${this.apiUrl}/${venda.id}`, venda);
    } else {
      return this.http.post<Venda>(this.apiUrl, venda);
    }
  }

  buscarPorId(id: number): Observable<Venda> {
    return this.http.get<Venda>(`${this.apiUrl}/${id}`);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  listarItens(idVenda: number): Observable<Vendaproduto[]> {
    return this.http.get<Vendaproduto[]>(`${this.apiUrl}/${idVenda}/itens`);
  }

  adicionarItem(idVenda: number, item: Vendaproduto): Observable<Vendaproduto> {
    return this.http.post<Vendaproduto>(`${this.apiUrl}/${idVenda}/itens`, item);
  }

  removerItem(idVenda: number, idItem: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idVenda}/itens/${idItem}`);
  }
}
