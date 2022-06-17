import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { GroupModule } from './group/group.module';
import { UserModule } from './user/user.module';
import ormconfig from './ormconfig';
import { AuthMiddleware } from './user/middlewares/auth.middleware';

@Module({
  imports: [GroupModule, TypeOrmModule.forRoot(ormconfig), UserModule],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
