import crypto from 'crypto';

import { PontoRepository } from '../../../application/repositories';
import { PontoType } from '../../../domain/types';

export class PontoMemoryRepository implements PontoRepository {
  pontos: PontoType[];

  constructor() {
    this.pontos = [];
  }

  async registrarEntrada(
    dadosPonto: Omit<PontoType, 'id' | 'dataSaida'>,
  ): Promise<void> {
    const ponto = {
      ...dadosPonto,
      id: crypto.randomUUID(),
    };
    this.pontos.push(ponto);
  }

  async registrarSaida(
    dadosPonto: Omit<PontoType, 'dataEntrada'>,
  ): Promise<void> {
    const pontosAtualizados = this.pontos.map(ponto =>
      ponto.id == dadosPonto.id
        ? {
            ...ponto,
            dataSaida: dadosPonto.dataSaida,
          }
        : ponto,
    );
    this.pontos = pontosAtualizados;
  }

  async buscarPorIdColaborador(
    idColaborador: string,
  ): Promise<PontoType | null> {
    const ponto = this.pontos.find(
      ponto => ponto.idColaborador == idColaborador,
    );
    if (!ponto) return null;
    return ponto;
  }

  async listarPaginado(filtros: {
    pagina: number;
    itensPorPagina: number;
  }): Promise<{
    totalRegistros: number;
    registros: PontoType[];
  }> {
    const { pagina, itensPorPagina } = filtros;
    const indiceInicial = pagina > 0 ? pagina * itensPorPagina : 0;
    const indiceFinal =
      pagina > 0 ? (pagina + 1) * itensPorPagina : itensPorPagina;
    const pontos = this.pontos.slice(indiceInicial, indiceFinal);
    return {
      totalRegistros: pontos.length,
      registros: pontos,
    };
  }

  async listar(): Promise<PontoType[]> {
    return this.pontos;
  }
}
