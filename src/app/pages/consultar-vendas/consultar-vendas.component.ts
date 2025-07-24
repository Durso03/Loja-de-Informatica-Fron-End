import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { Venda } from '../../models/venda';
import { Pessoa } from '../../models/pessoa';

import { VendaService } from '../../services/venda.service';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-consultar-vendas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './consultar-vendas.component.html',
  styleUrl: './consultar-vendas.component.css'
})
export class ConsultarVendasComponent {
  vendas: Venda[] = [];
  pessoas: Pessoa[] = [];

  constructor(
    private vendaService: VendaService,
    private pessoaService: PessoaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarVendas();
    this.carregarPessoas();
  }

  carregarVendas(): void {
    this.vendaService.listar().subscribe({
      next: (res) => this.vendas = res,
      error: () => alert('Erro ao carregar vendas.')
    });
  }

  carregarPessoas(): void {
    this.pessoaService.listar().subscribe({
      next: (res) => this.pessoas = res,
      error: () => alert('Erro ao carregar pessoas.')
    });
  }

  obterNomePessoa(id: number | null): string {
    if (!id) return '';
    const pessoa = this.pessoas.find(p => p.id === id);
    return pessoa ? pessoa.nome : 'Desconhecido';
  }

  editar(id: number): void {
    this.router.navigate(['/cadastrar-venda', id]);
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta venda?')) {
      this.vendaService.excluir(id).subscribe({
        next: () => this.carregarVendas(),
        error: () => alert('Erro ao excluir a venda.')
      });
    }
  }
}
