import { PontoType } from '../../domain/types';

export interface PontoRepository {
  registrarEntrada: (
    dadosPonto: Omit<PontoType, 'id' | 'dataSaida'>,
  ) => Promise<void>;
  registrarSaida: (dadosPonto: Omit<PontoType, 'dataEntrada'>) => Promise<void>;
  buscarPorIdColaborador: (idColaborador: string) => Promise<PontoType | null>;
  listar: () => Promise<PontoType[]>;
}