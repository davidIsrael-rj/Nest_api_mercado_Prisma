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
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    forwardRef(() => UserModule),
    ProductModule,
    CustomerModule,
    SectorModule,
    SupplierModule,
    forwardRef(() => AuthModule),
    MailerModule.forRoot({
      transport: 'smtps://mercedes.fisher@ethereal.email:46TbR35T3taT9vBnC6@smtp.ethereal.email',
      defaults: {
        from: '"David" <mercedes.fisher@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, {
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
