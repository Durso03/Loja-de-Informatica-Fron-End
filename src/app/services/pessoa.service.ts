import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';
import { appSettings } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private apiUrl = `${appSettings.apiBaseUrl}/pessoas`;

  constructor(private http: HttpClient) {}

    listar(): Observable<Pessoa[]>{
      return this.http.get<Pessoa[]>(this.apiUrl);
    }

    salvar(pessoa: Pessoa): Observable<Pessoa>{
      if (pessoa.id) {
        return this.http.put<Pessoa>(`${this.apiUrl}/${pessoa.id}`, pessoa);
      } else {
        return this.http.post<Pessoa>(this.apiUrl, pessoa);
      }
    }

    buscarPorId(id: number): Observable<Pessoa> {
      return this.http.get<Pessoa>(`${this.apiUrl}/${id}`);
    }

    excluir(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
