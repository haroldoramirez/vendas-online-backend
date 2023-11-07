import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache, 
      ) {}

    async getCache<T>(key: string, functionRequest : () => Promise<T>): Promise<T> {

        //Verifica se existe dados no cache pela chave
        const allCacheData: T = await this.cacheManager.get(key);

        //Caso exista, retorna os dados que estao no cache sem buscar na base de dados
        if (allCacheData) {
            return allCacheData;
        }

        //Faz a busca na base de dados caso nao exista no cache utilizando a funcao generica que devolve o resultado
        const allData: T = await functionRequest();

        //Salvar os dados no cache novamente
        await this.cacheManager.set(key, allData);

        //retorna os dados buscados no banco de dados
        return allData;
    }

}
