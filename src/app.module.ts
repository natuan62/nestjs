import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:123@cluster0-wyxg3.mongodb.net/todo?retryWrites=true&w=majority', { useNewUrlParser: true }),
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


