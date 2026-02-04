import { faker } from '@faker-js/faker'
import { type NestApplication } from '@nestjs/core'
import { Test } from '@nestjs/testing'
import { print } from 'graphql'
import { gql } from 'graphql-tag'
import request from 'supertest'
import { AppModule } from '../src/app.module'
import { Order } from '../src/db/entities/OrderEntity'

const staffId = '01KGHDXHM1QPBQDMAVXV0E9RN3'
const seatId = '01KGHE8GRTK8S5ZQ3CC1MMZVDF'

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
          values: { name: faker.food.dish(), paid: 0, staffId, seatId },
        },
      })

    order1 = reply.body.data.checkoutMutation

    expect(reply.status).toBe(200)
    expect(order1.id).toBeDefined()
  })

  it('Should update and return a order', async () => {
    const newName = faker.food.dish() + ' Order',
      newPaid = +faker.commerce.price()
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

  it('Should add an order_item and update total', async () => {
    const menuReply = await request(app.getHttpServer())
      .post(`/graphql`)
      .send({
        query: print(gql`
          query MenuList($where: JSON!) {
            menuList(where: $where) {
              items {
                id
                price
              }
            }
          }
        `),
        variables: {
          where: {},
        },
      })
    const menu = menuReply.body.data.menuList.items[0]

    const orderItems = [{ menuId: menu.id, quantity: 2 }]
    const reply = await request(app.getHttpServer())
      .post(`/graphql`)
      // .set('Cookie', authCookies)
      .send({
        query: print(gql`
          mutation checkoutMutation($id: ID!, $values: JSON!) {
            checkoutMutation(id: $id, values: $values) {
              id
              orderItems {
                id
                quantity
                menuId
                menuPrice
              }
              total
            }
          }
        `),
        variables: {
          id: order1.id,
          values: { orderItems },
        },
      })

    const order = reply.body.data.checkoutMutation

    expect(reply.status).toBe(200)
    expect(order.orderItems.length).toBe(1)
    expect(order.total).toBe(orderItems.reduce((sum, item) => sum + menu.price * item.quantity, 0))
  })

  it('Should remove an order item and update total', async () => {
    const orderBeforeReply = await request(app.getHttpServer())
      .post(`/graphql`)
      .send({
        query: print(gql`
          query OrderList($where: JSON!) {
            orderList(where: $where) {
              items {
                id
                orderItems {
                  id
                  menuPrice
                  menuId
                  quantity
                }
                total
              }
            }
          }
        `),
        variables: {
          where: {},
        },
      })
    const orderBefore = orderBeforeReply.body.data.orderList.items[0]
    const orderItems = orderBefore.orderItems.map((oi: any) => ({ ...oi, quantity: 0 }))

    const reply = await request(app.getHttpServer())
      .post(`/graphql`)
      // .set('Cookie', authCookies)
      .send({
        query: print(gql`
          mutation checkoutMutation($id: ID!, $values: JSON!) {
            checkoutMutation(id: $id, values: $values) {
              id
              orderItems {
                id
                deletedAt
              }
              total
            }
          }
        `),
        variables: {
          id: order1.id,
          values: { orderItems },
        },
      })

    const order = reply.body.data.checkoutMutation
    expect(reply.status).toBe(200)

    expect(order.orderItems.filter((oi: any) => !oi.deletedAt).length).toBe(0)
    expect(order.total).toBe(0)
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
              orderItems {
                id
                deletedAt
              }
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
