'use client';

import { useState, useCallback } from 'react';
import api from '../lib/api';
import { Concessionaria } from '@/app/types/concessionaria';
import Swal from 'sweetalert2';

export function useConcessionaria(){
    const [concessionaria, setConcessionaria] = useState<Concessionaria[]>([]);
    const [loading, setLoading] = useState(false);

    // Função blindada para extrair mensagens de erro do backend
    const extrairErro = (error: any, mensagemPadrao: string) => {
        const data = error.response?.data;

        if (data) {
            if (data.erro) return String(data.erro);
            if (data.message) return String(data.message);
            if (data.error) return String(data.error);
        }
        return error.message || mensagemPadrao;
    };

    const listarConcessionaria = useCallback(async () => {
        setLoading(true);
        try {
            const resposta = await api.get('/concessionaria');
            setConcessionaria(resposta.data);
        } catch (error: any) {
            Swal.fire('Erro!', extrairErro(error, "Erro ao buscar Concessionaria"), 'error');
        } finally {
            setLoading(false);
        }
    }, []);

    const excluir = async (id: number) => {
        const confirmacao = await Swal.fire({
            title: 'Excluir concessionaria?',
            text: "Esta ação não poderá ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#9ca3af',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        });

        if (confirmacao.isConfirmed) {
            try {
                await api.delete(`/concessionaria/${id}`);
                Swal.fire('Excluído!', 'A concessionaria foi removida.', 'success');
                listarConcessionaria();
            } catch (error: any) {
                Swal.fire('Erro!', extrairErro(error, "Erro ao excluir"), 'error');
            }
        }
    };

    return { concessionaria, loading, listarConcessionaria, excluir };
}