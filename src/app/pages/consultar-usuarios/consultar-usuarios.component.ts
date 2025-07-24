import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Pessoa } from '../../models/pessoa';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-consultar-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consultar-usuarios.component.html',
  styleUrl: './consultar-usuarios.component.css'
})
export class ConsultarUsuariosComponent {
  lista: Usuario[] = [];
  objeto!: Usuario;
  modalAberto = false;
  formGroup: FormGroup;
  pessoas: Pessoa[] = [];

  constructor(
    private service: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private pessoaService: PessoaService
  ) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      login: ['', Validators.required],
      senha: ['', Validators.required],
      tipo: ['', Validators.required],
      idPessoa: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarLista();
    this.carregarPessoas();
  }

  carregarLista(): void {
    this.service.listar().subscribe({
      next: (retornoJson) => {
        this.lista = retornoJson;
      },
      error: () => {
        alert('Erro ao carregar a lista de usuários.');
      }
    });
  }

  carregarPessoas(): void {
    this.pessoaService.listar().subscribe(pessoas => {
      this.pessoas = pessoas;
    });
  }

  obterNomePessoa(idPessoa: number): string {
    const pessoa = this.pessoas.find(p => p.id === idPessoa);
    return pessoa ? pessoa.nome : 'Pessoa não encontrada';
  }

  cadastrar(): void {
    this.router.navigate(['/cadastrar-usuario']);
  }

  editar(id: number): void {
    this.router.navigate(['/cadastrar-usuario', id]);
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.service.excluir(id).subscribe({
        next: () => {
          this.carregarLista();
        },
        error: () => {
          alert('Erro ao excluir o usuário. Tente novamente.');
        }
      });
    }
  }

  abrirModal(): void {
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;

      this.objeto.id = formValue.id;
      this.objeto.login = formValue.login;
      this.objeto.senha = formValue.senha;
      this.objeto.tipo = formValue.tipo;
      this.objeto.idPessoa = formValue.idPessoa;

      this.service.salvar(this.objeto).subscribe({
        next: () => {
          this.formGroup.reset();
          this.carregarLista();
          this.fecharModal();
        },
        error: () => {
          alert('Erro ao salvar o usuário. Tente novamente.');
        }
      });
    }
  }
}
