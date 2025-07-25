import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';
import { Usuario } from '../models/usuario';
import { appSettings } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${appSettings.apiBaseUrl}/usuarios`;

  constructor(private http: HttpClient) {}

    listar(): Observable<Usuario[]>{
      return this.http.get<Usuario[]>(this.apiUrl);
    }

    salvar(usuario: Usuario): Observable<Usuario>{
      if (usuario.id) {
        return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
      } else {
        return this.http.post<Usuario>(this.apiUrl, usuario);
      }
    }

    buscarPorId(id: number): Observable<Usuario> {
      return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }

    excluir(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
