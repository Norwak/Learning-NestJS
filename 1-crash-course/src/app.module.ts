import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ItemsModule,
    MongooseModule.forRoot(process.env.MONGO_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
