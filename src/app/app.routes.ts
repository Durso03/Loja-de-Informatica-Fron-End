import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConsultarCategoriasComponent } from './pages/consultar-categorias/consultar-categorias.component';
import { CadastrarPessoaComponent } from './pages/cadastrar-pessoa/cadastrar-pessoa.component';
import { ConsultarPessoasComponent } from './pages/consultar-pessoas/consultar-pessoas.component';
import { CadastrarProdutoComponent } from './pages/cadastrar-produto/cadastrar-produto.component';
import { ConsultarProdutosComponent } from './pages/consultar-produtos/consultar-produtos.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    // rotas para categoria
    { path: 'consultar-categorias', component: ConsultarCategoriasComponent },
    // rotas para pessoa
    { path: 'cadastrar-pessoa', component: CadastrarPessoaComponent }, // Rota para criar pessoa nova
    { path: 'cadastrar-pessoa/:id', component: CadastrarPessoaComponent }, // Rota para editar pessoa existente
    { path: 'consultar-pessoas', component: ConsultarPessoasComponent },
    // rotas para produtos
    { path: 'cadastrar-produto', component: CadastrarProdutoComponent },
    { path: 'cadastrar-produto/:id', component: CadastrarProdutoComponent },
    { path: 'consultar-produtos', component: ConsultarProdutosComponent }
];

