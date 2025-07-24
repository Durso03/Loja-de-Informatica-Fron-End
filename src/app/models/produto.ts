import { Categoria } from "./categoria";

export class Produto {
    id!: number;
    descricao!: string;
    valor!: number;
    estoque!: number;
    idCategoria!: Categoria;
}
