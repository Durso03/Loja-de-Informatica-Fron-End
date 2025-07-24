import { Produto } from "./produto";

export class Vendaproduto {
    id!: number;
    quantidade!: number;
    idVenda!: number;
    produto!: Produto;
}
