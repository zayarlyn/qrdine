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
};


export type MutationMutateMenuArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  values: Scalars['Json']['input'];
};


export type MutationMutateOrderArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  values: Scalars['Json']['input'];
};

export type OrderItemType = {
  __typename?: 'OrderItemType';
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  menuId: Scalars['String']['output'];
  menuPrice: Scalars['Float']['output'];
  orderId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type OrderType = {
  __typename?: 'OrderType';
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  orderItems: Array<OrderItemType>;
  paid?: Maybe<Scalars['Float']['output']>;
  seatId?: Maybe<Scalars['String']['output']>;
  staffId: Scalars['String']['output'];
  total?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  menuList: MenuListQueryResult;
  orderList: OrderListQueryResult;
};


export type QueryMenuListArgs = {
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

export type MenuListQueryResult = {
  __typename?: 'menuListQueryResult';
  count: Scalars['Int']['output'];
  items: Array<MenuType>;
};

export type OrderListQueryResult = {
  __typename?: 'orderListQueryResult';
  count: Scalars['Int']['output'];
  items: Array<OrderType>;
};

export type MenuListQueryQueryVariables = Exact<{
  where: Scalars['Json']['input'];
}>;


export type MenuListQueryQuery = { __typename?: 'Query', menuList: { __typename?: 'menuListQueryResult', count: number, items: Array<{ __typename?: 'MenuType', id: string, name: string, price: number, description?: string | null, createdAt: string, updatedAt: string, deletedAt?: string | null }> } };


export const MenuListQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"menuListQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Json"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"menuList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<MenuListQueryQuery, MenuListQueryQueryVariables>;