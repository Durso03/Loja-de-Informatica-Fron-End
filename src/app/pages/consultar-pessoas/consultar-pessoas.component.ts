import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pessoa } from '../../models/pessoa';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-consultar-pessoas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consultar-pessoas.component.html',
  styleUrl: './consultar-pessoas.component.css'
})
export class ConsultarPessoasComponent {
  lista: Pessoa[] = [];
  objeto!: Pessoa;
  modalAberto = false;
  formGroup: FormGroup;

  constructor(private service: PessoaService, private formBuilder: FormBuilder, private router: Router) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.carregarLista();
  }

  carregarLista(): void {
    this.service.listar().subscribe({
      next: (retornoJson) => {
        this.lista = retornoJson;
      },
      error: () => {
        alert('Erro ao carregar a lista de pessoas.');
      }
    });
  }

  cadastrar(): void {
    this.router.navigate(['/cadastrar-pessoa']);
  }

  editar(id: number): void {
    this.router.navigate(['/cadastrar-pessoa', id]);
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.service.excluir(id).subscribe({
        next: () => {
          this.carregarLista();
        },
        error: () => {
          alert('Erro ao excluir a pessoa. Tente novamente.');
        }
      });
    }
  }

  // editar(id: number): void {
  //   this.service.buscarPorId(id).subscribe({
  //     next: (retorno) => {
  //       this.objeto = retorno;
  //       this.formGroup.patchValue(this.objeto);
  //       this.abrirModal();
  //     },
  //     error: () => {
  //       alert('Erro ao buscar os dados da pessoa.');
  //     }
  //   });
  // }

  // cadastrar(): void {
  //   this.objeto = new Pessoa();
  //   this.abrirModal();
  //   this.formGroup.reset();
  // }

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
      this.objeto.nome = formValue.nome;
      this.objeto.cpf = formValue.cpf;
      this.objeto.endereco = formValue.endereco;
      this.objeto.telefone = formValue.telefone;
      this.objeto.email = formValue.email;

      this.service.salvar(this.objeto).subscribe({
        next: () => {
          this.formGroup.reset();
          this.carregarLista();
          this.fecharModal();
        },
        error: () => {
          alert('Erro ao salvar a pessoa. Tente novamente.');
        }
      });
    }
  }
}
