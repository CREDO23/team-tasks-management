import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationTokenGuard } from './guards/authorization-token.guard';
import { LogginMiddleware } from './middleware/logging.middleware';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizationTokenGuard,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogginMiddleware).forRoutes('*');
  }
}
