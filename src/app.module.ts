import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
const mongoDbUrl = process.env.MONGO_CONNECTION;
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    MongooseModule.forRoot(mongoDbUrl),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
