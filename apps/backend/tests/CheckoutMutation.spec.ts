import { faker } from '@faker-js/faker'
import { type NestApplication } from '@nestjs/core'
import { Test } from '@nestjs/testing'
import { print } from 'graphql'
import { gql } from 'graphql-tag'
import request from 'supertest'
import { AppModule } from '../src/app.module'
import { Order } from '../src/db/entities/OrderEntity'

describe('CheckoutMutation', () => {
  let app: NestApplication, order1: Order

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

  it('Should create and return a order', async () => {
    const reply = await request(app.getHttpServer())
      .post(`/graphql`)
      .send({
        query: print(gql`
          mutation checkoutMutation($values: JSON!) {
            checkoutMutation(values: $values) {
              id
            }
          }
        `),
        variables: {
          values: { name: faker.food.dish(), price: faker.commerce.price() },
        },
      })

    order1 = reply.body.data.checkoutMutation

    expect(reply.status).toBe(200)
    expect(order1.id).toBeDefined()
  })

  it('Should update and return a order', async () => {
    const newName = faker.food.dish() + ' Order',
      newPaid = faker.commerce.price()
    const reply = await request(app.getHttpServer())
      .post(`/graphql`)
      // .set('Cookie', authCookies)
      .send({
        query: print(gql`
          mutation CheckoutMutation($id: ID!, $values: JSON!) {
            checkoutMutation(id: $id, values: $values) {
              id
              name
              paid
            }
          }
        `),
        variables: {
          id: order1.id,
          values: { name: newName, paid: newPaid },
        },
      })

    expect(reply.status).toBe(200)
    expect(reply.body.data.checkoutMutation).toMatchObject({ name: newName, paid: newPaid })
  })

  it('Should soft delete a order', async () => {
    const reply = await request(app.getHttpServer())
      .post(`/graphql`)
      // .set('Cookie', authCookies)
      .send({
        query: print(gql`
          mutation checkoutMutation($id: ID!, $values: JSON!) {
            checkoutMutation(id: $id, values: $values) {
              id
              deletedAt
            }
          }
        `),
        variables: {
          id: order1.id,
          values: { deletedAt: new Date().toISOString() },
        },
      })

    expect(reply.status).toBe(200)
    expect(reply.body.data.checkoutMutation.deletedAt).toBeDefined()
  })
})
