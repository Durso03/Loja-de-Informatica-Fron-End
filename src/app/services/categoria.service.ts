import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';
import { Observable } from 'rxjs';
import { appSettings } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = `${appSettings.apiBaseUrl}/categorias`;

  constructor(private http: HttpClient) {}

    listar(): Observable<Categoria[]>{
      return this.http.get<Categoria[]>(this.apiUrl);
    }

    salvar(categoria: Categoria): Observable<Categoria>{
      if (categoria.id) {
        return this.http.put<Categoria>(`${this.apiUrl}/${categoria.id}`, categoria);
      } else {
        return this.http.post<Categoria>(this.apiUrl, categoria);
      }
    }

    buscarPorId(id: number): Observable<Categoria> {
      return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
    }

    excluir(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
