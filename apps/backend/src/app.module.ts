import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { loadAppConfig } from './config/app.config';
import { loadDbConfig } from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadAppConfig, loadDbConfig],
    }),
    DbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
