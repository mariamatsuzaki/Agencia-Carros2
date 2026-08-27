import { ConcessionariaService } from './ConcenssionariaService';

describe('Servico CarroService', () => {
    let mockRepository: any;
    let concessionariaService: ConcessionariaService;

    beforeEach(() => {
        mockRepository = {
            salvar: jest.fn(),
            listarTodos: jest.fn(),
            buscarPorId: jest.fn(),
            atualizar: jest.fn(),
            excluir: jest.fn(),
        };
        concessionariaService = new ConcessionariaService(mockRepository);
    });

    describe('Testando validações do metodo cadastrar', () => {
        it('deve lançar erro se o nome tiver menos de 2 caracteres', async () => {
            await expect(concessionariaService.cadastrar('A', 'SUV'))
                .rejects.toThrow("O nome deve ter no mínimo 2 caracteres")
        });

        it('deve lançar erro se o tipo não for informado', async () => {
            await expect(concessionariaService.cadastrar('Honda civic'))
                .rejects.toThrow("O tipo da concessionaria é obrigatório")
        });

    });

    describe('Testando validações no método bscar por Id ', () => {
        it('deve lançar erro se o carro não existir no banco', async () => {

            mockRepository.buscarPorId.mockResolvedValue(null);

            await expect(concessionariaService.buscarPorId('Honda civic'))
                .rejects.toThrow("Concessionaria não encontrada");
        });
    });
});