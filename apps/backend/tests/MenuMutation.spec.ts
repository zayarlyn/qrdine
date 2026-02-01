import { faker } from '@faker-js/faker'
import { type NestApplication } from '@nestjs/core'
import { Test } from '@nestjs/testing'
import { print } from 'graphql'
import { gql } from 'graphql-tag'
import { AppModule } from '../src/app.module'
import { Menu } from '../src/db/entities/MenuEntity'
import request from 'supertest'

describe('MenuMutation', () => {
  let app: NestApplication, menu1: Menu
  // , tenant: Tenant, tenantId: string

  beforeAll(async () => {
    const appModuleRef = await Test.createTestingModule({ imports: [AppModule] }).compile()
    app = appModuleRef.createNestApplication()
    // app.use(cookieParser())
    await app.init()

    // const res = await resetNSeed({ metaDbName: process.env.DB_META_NAME, tenantDbName: process.env.DB_CORE_NAME })
    // tenant = res.tenant
    // const authRes = await request(app.getHttpServer()).post('/auth/signin').send({ email: 'zayar@qrdine.com' });
    // authCookies = authRes.headers['set-cookie'];
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create and return a menu', async () => {
    const reply = await request(app.getHttpServer())
      .post(`/graphql?t=${process.env.TENANT_ID}`)
      .send({
        query: print(gql`
          mutation menuMutation($values: JSON!) {
            menuMutation(values: $values) {
              id
            }
          }
        `),
        variables: {
          values: { name: faker.food.dish(), price: faker.commerce.price() },
        },
      })

    menu1 = reply.body.data.menuMutation

    expect(reply.status).toBe(200)
    expect(menu1.id).toBeDefined()
  })

  it('should update and return a menu', async () => {
    const newName = faker.food.dish(),
      newPrice = faker.commerce.price()
    const reply = await request(app.getHttpServer())
      .post(`/graphql?t=${process.env.TENANT_ID}`)
      // .set('Cookie', authCookies)
      .send({
        query: print(gql`
          mutation MenuMutation($id: ID!, $values: JSON!) {
            menuMutation(id: $id, values: $values) {
              id
              name
              price
            }
          }
        `),
        variables: {
          id: menu1.id,
          values: { name: newName, price: newPrice },
        },
      })

    expect(reply.status).toBe(200)
    expect(reply.body.data.menuMutation).toMatchObject({ name: newName, price: newPrice })
  })

  it('should soft delete a menu', async () => {
    const reply = await request(app.getHttpServer())
      .post(`/graphql?t=${process.env.TENANT_ID}`)
      // .set('Cookie', authCookies)
      .send({
        query: print(gql`
          mutation menuMutation($id: ID!, $values: JSON!) {
            menuMutation(id: $id, values: $values) {
              id
              deletedAt
            }
          }
        `),
        variables: {
          id: menu1.id,
          values: { deletedAt: new Date().toISOString() },
        },
      })

    expect(reply.status).toBe(200)
    expect(reply.body.data.menuMutation.deletedAt).toBeDefined()
  })
})
