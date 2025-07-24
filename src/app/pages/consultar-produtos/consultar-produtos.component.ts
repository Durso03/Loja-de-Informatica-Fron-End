import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-consultar-produtos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consultar-produtos.component.html',
  styleUrl: './consultar-produtos.component.css'
})
export class ConsultarProdutosComponent {
  lista: Produto[] = [];
  objeto!: Produto;
  modalAberto = false;
  formGroup: FormGroup;
  categorias: Categoria[] = [];

  constructor(private service: ProdutoService, private formBuilder: FormBuilder, private router: Router, private categoriaService: CategoriaService) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      descricao: ['', Validators.required],
      valor: [null, Validators.required],
      estoque: [null, Validators.required],
      idCategoria: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarLista();
    this.carregarCategorias();
  }

  carregarLista(): void {
    this.service.listar().subscribe({
      next: (retornoJson) => {
        this.lista = retornoJson;
      },
      error: () => {
        alert('Erro ao carregar a lista de produtos.');
      }
    });
  }

  carregarCategorias(): void {
    this.categoriaService.listar().subscribe(resposta => {
      this.categorias = resposta;
    });
  }

  obterDescCategoria(categoria: Categoria): string {
    const catEncontrada = this.categorias.find(cat => cat.id === categoria.id);
    return catEncontrada ? catEncontrada.descricao : 'Categoria não encontrada';
  }


  cadastrar(): void {
    this.router.navigate(['/cadastrar-produto']);
  }

  editar(id: number): void {
    this.router.navigate(['/cadastrar-produto', id]);
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.service.excluir(id).subscribe({
        next: () => {
          this.carregarLista();
        },
        error: () => {
          alert('Erro ao excluir o produto. Tente novamente.');
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
      this.objeto.descricao = formValue.descricao;
      this.objeto.valor = formValue.valor;
      this.objeto.estoque = formValue.estoque;
      this.objeto.idCategoria = formValue.idCategoria;

      this.service.salvar(this.objeto).subscribe({
        next: () => {
          this.formGroup.reset();
          this.carregarLista();
          this.fecharModal();
        },
        error: () => {
          alert('Erro ao salvar o produto. Tente novamente.');
        }
      });
    }
  }
}
