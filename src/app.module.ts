import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { SectorModule } from './sector/sector.module';

@Module({
  imports: [
    UserModule, 
    ProductModule, 
    CustomerModule,
    SectorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
