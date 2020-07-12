import { Body, Controller, Get, HttpStatus, Post, Res, Req, Param, NotFoundException, Put, Delete, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {

    }

    @Get()
    async findAll(@Body() createCustomerDTO: CreateCustomerDTO, @Res() res: Response) {
        const customers = await this.customerService.findAll();

        return res.status(HttpStatus.OK).json(customers);

    }

    @Get(':id')
    async findById(@Param() params, @Res() res: Response): Promise<Object> {
        let customerId: string = params.id
        const customer = await this.customerService.findById(customerId);
        if (!customer) throw new NotFoundException('Customer does not exist!');
        return res.status(HttpStatus.OK).json(customer);
    }

    @Post()
    async create(@Req() req: Request, @Body() createCustomerDTO: CreateCustomerDTO, @Res() res: Response) {
        const customer: CreateCustomerDTO = await this.customerService.post(createCustomerDTO);
        return res.status(HttpStatus.OK).json({
            message: 'created ok',
            data: customer
        })
    }

    @Put()
    async updateCustomer(@Res() res, @Query('customerID') customerID, @Body() createCustomerDTO: CreateCustomerDTO) {
        const customer = await this.customerService.putById(customerID, createCustomerDTO);
        if (!customer) throw new NotFoundException('Customer does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Customer has been successfully updated',
            customer: customer
        });
    }

    // Delete a customer
    @Delete()
    async deleteCustomer(@Res() res, @Query('customerID') customerID) {
        const customer = await this.customerService.deleteById(customerID);
        if (!customer) throw new NotFoundException('Customer does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Customer has been deleted',
            customer: customer
        })
    }
}
