import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-cadastrar-pessoa',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrl: './cadastrar-pessoa.component.css'
})
export class CadastrarPessoaComponent implements OnInit {

  formulario: FormGroup;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.pessoaService.buscarPorId(this.id).subscribe({
        next: (pessoa) => {
          this.formulario.patchValue(pessoa);
        },
        error: () => {
          alert('Pessoa não encontrada.');
          this.router.navigate(['/consultar-pessoas']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const acao = this.id ? 'atualizada' : 'cadastrada';

      this.pessoaService.salvar(this.formulario.value).subscribe(() => {
        alert(`Pessoa ${acao} com sucesso!`);
        this.formulario.reset();
        this.router.navigate(['/consultar-pessoas']);
      });
    }
  }
}
