import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Produto } from '../../models/produto';
import { Pessoa } from '../../models/pessoa';
import { Vendaproduto } from '../../models/vendaproduto';
import { Venda } from '../../models/venda';

import { ProdutoService } from '../../services/produto.service';
import { PessoaService } from '../../services/pessoa.service';
import { VendaService } from '../../services/venda.service';
import { VendaprodutoService } from '../../services/vendaproduto.service';

@Component({
  selector: 'app-cadastrar-venda',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-venda.component.html',
  styleUrl: './cadastrar-venda.component.css'
})
export class CadastrarVendaComponent {
  formGroupVenda!: FormGroup;
  formGroupItem!: FormGroup;

  usuarios: Pessoa[] = [];
  produtos: Produto[] = [];
  vendaProdutos: Vendaproduto[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private produtoService: ProdutoService,
    private vendaService: VendaService,
    private vendaProdutoService: VendaprodutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroupVenda = this.formBuilder.group({
      idPessoaCliente: [null, Validators.required],
      idPessoaFuncionario: [null, Validators.required],
      observacao: ['']
    });

    this.formGroupItem = this.formBuilder.group({
      produto: [null, Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]]
    });

    this.carregarUsuarios();
    this.carregarProdutos();
  }

  carregarUsuarios(): void {
    this.pessoaService.listar().subscribe({
      next: (res) => this.usuarios = res,
      error: (e) => alert("Erro ao carregar usuários")
    });
  }

  carregarProdutos(): void {
    this.produtoService.listar().subscribe({
      next: (res) => this.produtos = res,
      error: (e) => alert("Erro ao carregar produtos")
    });
  }

  adicionarProduto(): void {
    const item: Vendaproduto = this.formGroupItem.value;
    this.vendaProdutos.push(item);
    this.formGroupItem.reset({ quantidade: 1 });
  }

  removerProduto(index: number): void {
    this.vendaProdutos.splice(index, 1);
  }

salvarVenda(): void {
    const formValue = this.formGroupVenda.value;

    const novaVenda: Venda = {
        ...formValue,
        idPessoaCliente: formValue.idPessoaCliente.id,
        idPessoaFuncionario: formValue.idPessoaFuncionario.id,
        valor: this.calcularValorTotal(),
        data: new Date()
    };

    this.vendaService.salvar(novaVenda).subscribe({
        next: (vendaSalva) => {
            this.vendaProdutos.forEach(vp => {
                vp.idVenda = vendaSalva.id;
                this.vendaProdutoService.salvar(vp).subscribe();
            });
            alert("Venda salva com sucesso!");
            this.formGroupVenda.reset();
            this.vendaProdutos = [];
            this.router.navigate(['/consultar-vendas']);
        },
        error: () => alert("Erro ao salvar venda")
    });
}



  calcularValorTotal(): number {
    return this.vendaProdutos.reduce((total, vp) => {
      return total + (vp.produto.valor * vp.quantidade);
    }, 0);
  }
}

