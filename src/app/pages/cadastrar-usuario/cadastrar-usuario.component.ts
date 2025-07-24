import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from '../../models/pessoa';
import { PessoaService } from '../../services/pessoa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastrar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.css'
})
export class CadastrarUsuarioComponent {
  pessoas: Pessoa[] = [];

  formulario: FormGroup;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoaService
  ) {
    this.formulario = this.fb.group({
      id: [''],
      login: ['', Validators.required],
      senha: ['', Validators.required],
      tipo: ['', Validators.required],
      idPessoa: ['', Validators.required]
    });
  }

ngOnInit(): void {
  this.pessoaService.listar().subscribe({
    next: (dados) => this.pessoas = dados
  });

  const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    this.id = Number(idParam);
    this.usuarioService.buscarPorId(this.id).subscribe({
      next: (usuario) => this.formulario.patchValue(usuario),
      error: () => {
        alert('Usuario não encontrado.');
        this.router.navigate(['/consultar-usuarios']);
      }
    });
  }
}

  onSubmit(): void {
    if (this.formulario.valid) {
      const acao = this.id ? 'atualizada' : 'cadastrada';

      this.usuarioService.salvar(this.formulario.value).subscribe(() => {
        alert(`Usuario ${acao} com sucesso!`);
        this.formulario.reset();
        this.router.navigate(['/consultar-usuarios']);
      });
    }
  }
}
