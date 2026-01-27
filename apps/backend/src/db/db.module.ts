import { Module, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Menu } from './entities/MenuEntity'
import { Order } from './entities/OrderEntity'
import { OrderItem } from './entities/OrderItemEntity'
import { Seat } from './entities/SeatEntity'
import { Staff } from './entities/StaffEntity'

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('db.url'),
        entities: [Menu, Order, OrderItem, Seat, Staff],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule implements OnModuleInit {
  onModuleInit() {
    console.log('🚀 Database module initialized')
  }
}
