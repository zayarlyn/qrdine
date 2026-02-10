import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = app.get(ConfigService).get('app.port') as number
  app.enableCors()
  await app.listen(port)
}
void bootstrap()
