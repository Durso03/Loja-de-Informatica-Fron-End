import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConsultarCategoriasComponent } from './pages/consultar-categorias/consultar-categorias.component';
import { CadastrarPessoaComponent } from './pages/cadastrar-pessoa/cadastrar-pessoa.component';
import { ConsultarPessoasComponent } from './pages/consultar-pessoas/consultar-pessoas.component';
import { CadastrarProdutoComponent } from './pages/cadastrar-produto/cadastrar-produto.component';
import { ConsultarProdutosComponent } from './pages/consultar-produtos/consultar-produtos.component';
import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';
import { ConsultarUsuariosComponent } from './pages/consultar-usuarios/consultar-usuarios.component';
import { CadastrarVendaComponent } from './pages/cadastrar-venda/cadastrar-venda.component';
import { ConsultarVendasComponent } from './pages/consultar-vendas/consultar-vendas.component';

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
    { path: 'consultar-produtos', component: ConsultarProdutosComponent },
    // rotas para usario
    { path: 'cadastrar-usuario', component: CadastrarUsuarioComponent },
    { path: 'cadastrar-usuario/:id', component: CadastrarUsuarioComponent }, 
    { path: 'consultar-usuarios', component: ConsultarUsuariosComponent },
    // rotas para venda
    { path: 'cadastrar-venda', component: CadastrarVendaComponent },
    { path: 'cadastrar-venda/:id', component: CadastrarVendaComponent }, 
    { path: 'consultar-vendas', component: ConsultarVendasComponent },
];

