import { CustomerSchema } from './schemas/customer.schema';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICustomer } from './interfaces/customer.interface';

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly customerModel: Model<ICustomer>) { }

    async findAll(): Promise<ICustomer[]> {
        return await this.customerModel.find().exec();
    }

    async findById(customerId): Promise<ICustomer> {
        return await this.customerModel.findById(customerId).exec();
    }

    async post(createCustomerDTO: CreateCustomerDTO): Promise<ICustomer> {
        return await this.customerModel(createCustomerDTO).save();
    }

    async putById(customerId, createCustomerDTO: CreateCustomerDTO): Promise<ICustomer> {
        return await this.customerModel.findByIdAndUpdate(customerId, createCustomerDTO, { new: true });
    }

    async deleteById(customerId): Promise<any> {
        return await this.customerModel.findByIdAndRemove(customerId);
    }

}

