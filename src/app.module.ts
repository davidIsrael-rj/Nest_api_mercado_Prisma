import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { SectorModule } from './sector/sector.module';
import { SupplierModule } from './supplier/supplier.module';
import { IdCheckMiddleware } from './middlewares/id-check.middleware';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl:60,
      limit:10,
    }),
    forwardRef(()=>UserModule),
    ProductModule,
    CustomerModule,
    SectorModule,
    SupplierModule,
    forwardRef(()=>AuthModule),
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdCheckMiddleware).forRoutes(
      { path: 'product/:id', method: RequestMethod.ALL },
      { path: 'sector/:id', method: RequestMethod.ALL },
      { path: 'customer/:id', method: RequestMethod.ALL },
      { path: 'supplier/:id', method: RequestMethod.ALL }
    )
  }
}
