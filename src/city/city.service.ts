import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity) 
        private readonly cityRepository: Repository<CityEntity>,
        private readonly cacheService: CacheService,
      ) {}

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {

        //Chama o getCache passando a entity e a funcao a ser executada
        return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`, 
            () => this.cityRepository.find({
                where: {
                    //stateId: estadoId
                    //O typescript entende dessa forma tambem caso o parametro tiver o mesmo nome 
                    stateId, 
                },
            }),
        );

    }

}
