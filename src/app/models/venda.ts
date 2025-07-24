import { Pessoa } from "./pessoa";

export class Venda {
  id!: number;                   
  data!: Date;                   
  valor!: number;          
  observacao?: string;         
  idPessoaCliente!: Pessoa;      
  idPessoaFuncionario!: Pessoa;  
}
