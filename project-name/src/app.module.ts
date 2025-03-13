import { MiddlewareConsumer, Module, RequestMethod,NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FirstMiddleware } from './middleware/firstMiddlewate';
import { ConfigModule,ConfigService } from '@nestjs/config';

@Module({
  imports: [    UsersModule,
                ProductsModule,
                ConfigModule.forRoot(),
                MongooseModule.forRootAsync({
                  imports: [ConfigModule],
                  inject: [ConfigService],
                  useFactory: async (configService: ConfigService) => ({
                    uri: configService.get('MONGO_URI')
                  })
                })
    ],
})
export class AppModule implements NestModule  {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware).forRoutes({path: '*',method: RequestMethod.ALL});
  }
}
