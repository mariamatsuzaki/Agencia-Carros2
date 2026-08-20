export class Carro{
id: number | any;
nome: String;
tipo: String;

constructor ( nome:string, tipo:string, id:any = null){
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
}
}