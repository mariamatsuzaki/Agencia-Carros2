import { CarroService } from './CarroService';

describe('Servico CarroService', () => {
    let mockRepository: any;
    let carroService: CarroService;

    beforeEach(() => {
        mockRepository = {
            salvar: jest.fn(),
            listarTodos: jest.fn(),
            buscarPorId: jest.fn(),
            atualizar: jest.fn(),
            excluir: jest.fn(),
        };
        carroService = new CarroService(mockRepository);
    });

describe('Testando validações do metodo cadastrar', () => {
    it('deve lançar erro se o nome tiver menos de 2 caracteres', async () => {
        await expect(carroService.cadastrar('A', 'SUV'))
            .rejects.toThrow("O nome deve ter no minimo 2 caracteres")
    });

    it('deve lançar erro se o tipo não for informado', async () => {
        await expect(carroService.cadastrar('Honda civic'))
            .rejects.toThrow("O tipo do veículo é obrigatório")
    });
describe('Testando validações no método bscar por Id ',() =>{
    it('deve lançar erro se o carro não existir no banco', async() =>{
        
    mockRepository.buscarPorId.mockResolvedValue(null);

    await expect(carroService.buscarPorId('Honda civic'))
            .rejects.toThrow("veiculo não encontrado");
})
})
});

});