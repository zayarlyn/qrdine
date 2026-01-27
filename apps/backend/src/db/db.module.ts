import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('db.url'),
        entities: [],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule implements OnModuleInit {
  onModuleInit() {
    console.log('🚀 Database module initialized');
  }
}
