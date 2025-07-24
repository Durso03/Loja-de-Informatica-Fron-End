import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';


@Component({
  selector: 'app-cadastrar-produto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastrar-produto.component.html',
  styleUrl: './cadastrar-produto.component.css'
})
export class CadastrarProdutoComponent {
  categorias: Categoria[] = [];

  formulario: FormGroup;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService
  ) {
    this.formulario = this.fb.group({
      id: [''],
      descricao: ['', Validators.required],
      valor: ['', Validators.required],
      estoque: ['', Validators.required],
      idCategoria: ['', Validators.required]
    });
  }

ngOnInit(): void {
  this.categoriaService.listar().subscribe({
    next: (dados) => this.categorias = dados
  });

  const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    this.id = Number(idParam);
    this.produtoService.buscarPorId(this.id).subscribe({
      next: (produto) => this.formulario.patchValue(produto),
      error: () => {
        alert('Produto não encontrado.');
        this.router.navigate(['/consultar-produtos']);
      }
    });
  }
}

  onSubmit(): void {
    if (this.formulario.valid) {
      const acao = this.id ? 'atualizada' : 'cadastrada';

      this.produtoService.salvar(this.formulario.value).subscribe(() => {
        alert(`Produto ${acao} com sucesso!`);
        this.formulario.reset();
        this.router.navigate(['/consultar-produtos']);
      });
    }
  }
}
