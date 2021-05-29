import { Module } from "@nestjs/common";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ApiKeyGuard } from "./guard/api-key.guard";
import { ConfigModule } from "@nestjs/config";
import { WrapResponseInterceptor } from "./interceptors/wrap-response.interceptor";

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: WrapResponseInterceptor
    }
  ]
})
export class CommonModule {}
