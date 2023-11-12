import { IsInt, IsOptional, IsString } from "class-validator";
import { AddressEntity } from "../entities/address.entity";

export class ReturnAddressDto {

    complement: string;

    numberAddress: number;

    cep: string;

    cityId?: any;

    constructor(address: AddressEntity) {
        this.complement = address.complement;
        this.numberAddress = address.numberAddress;
        this.cep = address.cep;
    }

}