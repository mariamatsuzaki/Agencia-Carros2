import { Carro } from "@/src/model/Carro";

export class CarroService {
    constructor(repository) {
        this.repository = repository;
    }
    async cadastrar(nome, tipo) {
        if (!nome || nome.length < 2)
            throw new Error("O nome deve ter no minimo 2 caracteres")

        if (!tipo)
            throw new Error("O tipo de veículo é obrigatório");
        return await this.repository.salvar(new Carro(nome, tipo));
    }
    async listar() {
        return await this.repository.listarTodos();
    }
    async buscarPorId(id) {
        const carro = await this.repository.buscarPorId(id);
        if (!carro) throw new Error("Veiculo não encontrado")
        return carro;
    }
    async atualizar(id, nome, tipo) {
        if (!id)
            throw new Error("Id é obrigatório para a atualização.");
        if (!nome || !tipo)
            throw new Error("Nome e tipo são obrigatórios");

        await this.buscarPorId(id);
        const carroAtualizado = new Carro(nome, tipo, id);
        return await this.repository.atualizar(id, carroAtualizado);
    }

    async excluir(id) {
        await this.buscarPorId(id);
        return await this.repository.excluir(id);
    }
}