import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity) private readonly cityRepository: Repository<CityEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache, 
      ) {}

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {

        //Verifica se existe cidades no cache pelo id do estado
        const citiesCache: CityEntity[] = await this.cacheManager.get(
            `state_${stateId}`,
        );

        //Caso exista retorna eles sem buscar na base de dados
        if (citiesCache) {
            return citiesCache;
        }

        //Faz a busca na base de dados pelas cidades por aquele estado caso nao exista cache
        const cities = await this.cityRepository.find({
            where: {
                //stateId: estadoId
                //O typescript entende dessa forma tambem caso o parametro tiver o mesmo nome 
                stateId, 
            },
        });

        //Salvar as cidades no cache novamente
        await this.cacheManager.set(`state_${stateId}`, cities);

        //retorna as cidades
        return cities;
    }

}
