/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Arbitrary JSON value */
  Json: { input: any; output: any; }
};

export type MenuType = {
  __typename?: 'MenuType';
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  mutateMenu: MenuType;
  mutateOrder: OrderType;
  mutateOrderItemGroup: OrderType;
};


export type MutationMutateMenuArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  values: Scalars['Json']['input'];
};


export type MutationMutateOrderArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  values: Scalars['Json']['input'];
};


export type MutationMutateOrderItemGroupArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  values: Scalars['Json']['input'];
};

export type OrderItemGroupType = {
  __typename?: 'OrderItemGroupType';
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  order: OrderType;
  orderId: Scalars['String']['output'];
  orderItems: Array<OrderItemType>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type OrderItemType = {
  __typename?: 'OrderItemType';
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  groupId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  menuId: Scalars['String']['output'];
  menuPrice: Scalars['Float']['output'];
  orderId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type OrderType = {
  __typename?: 'OrderType';
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  orderItemGroups: Array<OrderItemGroupType>;
  orderItems: Array<OrderItemType>;
  paid?: Maybe<Scalars['Float']['output']>;
  seat: SeatType;
  seatId: Scalars['String']['output'];
  staffId?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  menuList: MenuListQueryResult;
  orderItemGroupList: OrderItemGroupListQueryResult;
  orderList: OrderListQueryResult;
};


export type QueryMenuListArgs = {
  where: Scalars['Json']['input'];
};


export type QueryOrderItemGroupListArgs = {
  where: Scalars['Json']['input'];
};


export type QueryOrderListArgs = {
  where: Scalars['Json']['input'];
};

export type SeatType = {
  __typename?: 'SeatType';
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type StaffType = {
  __typename?: 'StaffType';
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  orderSubscription?: Maybe<Scalars['String']['output']>;
};

export type MenuListQueryResult = {
  __typename?: 'menuListQueryResult';
  count: Scalars['Int']['output'];
  items: Array<MenuType>;
};

export type OrderItemGroupListQueryResult = {
  __typename?: 'orderItemGroupListQueryResult';
  count: Scalars['Int']['output'];
  items: Array<OrderItemGroupType>;
};

export type OrderListQueryResult = {
  __typename?: 'orderListQueryResult';
  count: Scalars['Int']['output'];
  items: Array<OrderType>;
};

export type OrderListQueryVariables = Exact<{
  where: Scalars['Json']['input'];
}>;


export type OrderListQuery = { __typename?: 'Query', orderList: { __typename?: 'orderListQueryResult', items: Array<{ __typename?: 'OrderType', id: string, name: string, total?: number | null, orderItemGroups: Array<{ __typename?: 'OrderItemGroupType', id: string, status: string, orderItems: Array<{ __typename?: 'OrderItemType', id: string, menuId: string, groupId: string, menuPrice: number, quantity: number, orderId: string }> }>, orderItems: Array<{ __typename?: 'OrderItemType', id: string, menuId: string, menuPrice: number, quantity: number, orderId: string }> }> } };

export type OrderItemGroupListQueryVariables = Exact<{
  where: Scalars['Json']['input'];
}>;


export type OrderItemGroupListQuery = { __typename?: 'Query', orderItemGroupList: { __typename?: 'orderItemGroupListQueryResult', items: Array<{ __typename?: 'OrderItemGroupType', id: string, status: string, orderId: string, order: { __typename?: 'OrderType', id: string, seat: { __typename?: 'SeatType', id: string, name: string } }, orderItems: Array<{ __typename?: 'OrderItemType', id: string, menuId: string, menuPrice: number, quantity: number, orderId: string }> }> } };

export type MenuListQueryQueryVariables = Exact<{
  where: Scalars['Json']['input'];
}>;


export type MenuListQueryQuery = { __typename?: 'Query', menuList: { __typename?: 'menuListQueryResult', count: number, items: Array<{ __typename?: 'MenuType', id: string, name: string, price: number, description?: string | null, createdAt: string, updatedAt: string, deletedAt?: string | null }> } };

export type OrderSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OrderSubSubscription = { __typename?: 'Subscription', orderSubscription?: string | null };

export type MutateOrderMutationVariables = Exact<{
  values: Scalars['Json']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type MutateOrderMutation = { __typename?: 'Mutation', mutateOrder: { __typename?: 'OrderType', id: string } };

export type MutateOrderItemGroupMutationVariables = Exact<{
  values: Scalars['Json']['input'];
}>;


export type MutateOrderItemGroupMutation = { __typename?: 'Mutation', mutateOrderItemGroup: { __typename?: 'OrderType', id: string } };

export type OrderList_CartQueryVariables = Exact<{
  where: Scalars['Json']['input'];
}>;


export type OrderList_CartQuery = { __typename?: 'Query', orderList: { __typename?: 'orderListQueryResult', items: Array<{ __typename?: 'OrderType', id: string, name: string, total?: number | null, orderItemGroups: Array<{ __typename?: 'OrderItemGroupType', id: string, status: string, orderItems: Array<{ __typename?: 'OrderItemType', id: string, menuId: string, groupId: string, menuPrice: number, quantity: number, orderId: string }> }>, orderItems: Array<{ __typename?: 'OrderItemType', id: string, menuId: string, groupId: string, menuPrice: number, quantity: number, orderId: string }> }> } };


export const OrderListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"orderList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Json"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"orderItemGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"orderItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"menuId"}},{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"menuPrice"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"menuId"}},{"kind":"Field","name":{"kind":"Name","value":"menuPrice"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OrderListQuery, OrderListQueryVariables>;
export const OrderItemGroupListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"orderItemGroupList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Json"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderItemGroupList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"menuId"}},{"kind":"Field","name":{"kind":"Name","value":"menuPrice"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OrderItemGroupListQuery, OrderItemGroupListQueryVariables>;
export const MenuListQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"menuListQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Json"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"menuList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<MenuListQueryQuery, MenuListQueryQueryVariables>;
export const OrderSubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"orderSub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderSubscription"}}]}}]} as unknown as DocumentNode<OrderSubSubscription, OrderSubSubscriptionVariables>;
export const MutateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"mutateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"values"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Json"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mutateOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"values"},"value":{"kind":"Variable","name":{"kind":"Name","value":"values"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<MutateOrderMutation, MutateOrderMutationVariables>;
export const MutateOrderItemGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"mutateOrderItemGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"values"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Json"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mutateOrderItemGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"values"},"value":{"kind":"Variable","name":{"kind":"Name","value":"values"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<MutateOrderItemGroupMutation, MutateOrderItemGroupMutationVariables>;
export const OrderList_CartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"orderList_cart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Json"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"orderItemGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"orderItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"menuId"}},{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"menuPrice"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"menuId"}},{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"menuPrice"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OrderList_CartQuery, OrderList_CartQueryVariables>;