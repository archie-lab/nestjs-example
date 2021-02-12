import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductModule } from "./product/product.module";
import { BarController } from './bar/bar.controller';

@Module({
  imports: [ProductModule],
  controllers: [AppController, BarController],
  providers: [AppService],
})
export class AppModule {}
