/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n\tquery orderList($where: Json!) {\n\t\torderList(where: $where) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\ttotal\n\t\t\t\torderItemGroups {\n\t\t\t\t\tid\n\t\t\t\t\tstatus\n\t\t\t\t\torderItems {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tmenuId\n\t\t\t\t\t\tgroupId\n\t\t\t\t\t\tmenuPrice\n\t\t\t\t\t\tquantity\n\t\t\t\t\t\torderId\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\torderItems {\n\t\t\t\t\tid\n\t\t\t\t\tmenuId\n\t\t\t\t\tmenuPrice\n\t\t\t\t\tquantity\n\t\t\t\t\torderId\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.OrderListDocument,
    "\n\tquery orderItemGroupList($where: Json!) {\n\t\torderItemGroupList(where: $where) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tstatus\n\t\t\t\torderId\n\t\t\t\torder {\n\t\t\t\t\tid\n\t\t\t\t\tseat {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\torderItems {\n\t\t\t\t\tid\n\t\t\t\t\tmenuId\n\t\t\t\t\tmenuPrice\n\t\t\t\t\tquantity\n\t\t\t\t\torderId\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.OrderItemGroupListDocument,
    "\n\tquery menuListQuery($where: Json!) {\n\t\tmenuList(where: $where) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tprice\n\t\t\t\tdescription\n\t\t\t\tcreatedAt\n\t\t\t\tupdatedAt\n\t\t\t\tdeletedAt\n\t\t\t}\n\t\t\tcount\n\t\t}\n\t}\n": typeof types.MenuListQueryDocument,
    "\n\tsubscription orderSub{\n\t\torderSubscription\n\t}\n": typeof types.OrderSubDocument,
    "\n\tmutation mutateOrder($values: Json!, $id: ID) {\n\t\tmutateOrder(values: $values, id: $id) {\n\t\t\tid\n\t\t}\n\t}\n": typeof types.MutateOrderDocument,
    "\n\tmutation mutateOrderItemGroup($values: Json!) {\n\t\tmutateOrderItemGroup(values: $values) {\n\t\t\tid\n\t\t}\n\t}\n": typeof types.MutateOrderItemGroupDocument,
    "\n\tquery orderList_cart($where: Json!) {\n\t\torderList(where: $where) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\ttotal\n\t\t\t\torderItemGroups {\n\t\t\t\t\tid\n          status\n\t\t\t\t\torderItems {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tmenuId\n\t\t\t\t\t\tgroupId\n\t\t\t\t\t\tmenuPrice\n\t\t\t\t\t\tquantity\n\t\t\t\t\t\torderId\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\torderItems {\n\t\t\t\t\tid\n\t\t\t\t\tmenuId\n\t\t\t\t\tgroupId\n\t\t\t\t\tmenuPrice\n\t\t\t\t\tquantity\n\t\t\t\t\torderId\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.OrderList_CartDocument,
};
const documents: Documents = {
    "\n\tquery orderList($where: Json!) {\n\t\torderList(where: $where) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\ttotal\n\t\t\t\torderItemGroups {\n\t\t\t\t\tid\n\t\t\t\t\tstatus\n\t\t\t\t\torderItems {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tmenuId\n\t\t\t\t\t\tgroupId\n\t\t\t\t\t\tmenuPrice\n\t\t\t\t\t\tquantity\n\t\t\t\t\t\torderId\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\torderItems {\n\t\t\t\t\tid\n\t\t\t\t\tmenuId\n\t\t\t\t\tmenuPrice\n\t\t\t\t\tquantity\n\t\t\t\t\torderId\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.OrderListDocument,
    "\n\tquery orderItemGroupList($where: Json!) {\n\t\torderItemGroupList(where: $where) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tstatus\n\t\t\t\torderId\n\t\t\t\torder {\n\t\t\t\t\tid\n\t\t\t\t\tseat {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\torderItems {\n\t\t\t\t\tid\n\t\t\t\t\tmenuId\n\t\t\t\t\tmenuPrice\n\t\t\t\t\tquantity\n\t\t\t\t\torderId\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.OrderItemGroupListDocument,
    "\n\tquery menuListQuery($where: Json!) {\n\t\tmenuList(where: $where) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tprice\n\t\t\t\tdescription\n\t\t\t\tcreatedAt\n\t\t\t\tupdatedAt\n\t\t\t\tdeletedAt\n\t\t\t}\n\t\t\tcount\n\t\t}\n\t}\n": types.MenuListQueryDocument,
    "\n\tsubscription orderSub{\n\t\torderSubscription\n\t}\n": types.OrderSubDocument,
    "\n\tmutation mutateOrder($values: Json!, $id: ID) {\n\t\tmutateOrder(values: $values, id: $id) {\n\t\t\tid\n\t\t}\n\t}\n": types.MutateOrderDocument,
    "\n\tmutation mutateOrderItemGroup($values: Json!) {\n\t\tmutateOrderItemGroup(values: $values) {\n\t\t\tid\n\t\t}\n\t}\n": types.MutateOrderItemGroupDocument,
    "\n\tquery orderList_cart($where: Json!) {\n\t\torderList(where: $where) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\ttotal\n\t\t\t\torderItemGroups {\n\t\t\t\t\tid\n          status\n\t\t\t\t\torderItems {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tmenuId\n\t\t\t\t\t\tgroupId\n\t\t\t\t\t\tmenuPrice\n\t\t\t\t\t\tquantity\n\t\t\t\t\t\torderId\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\torderItems {\n\t\t\t\t\tid\n\t\t\t\t\tmenuId\n\t\t\t\t\tgroupId\n\t\t\t\t\tmenuPrice\n\t\t\t\t\tquantity\n\t\t\t\t\torderId\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.OrderList_CartDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery orderList($where: Json!) {\n\t\torderList(where: $where) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\ttotal\n\t\t\t\torderItemGroups {\n\t\t\t\t\tid\n\t\t\t\t\tstatus\n\t\t\t\t\torderItems {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tmenuId\n\t\t\t\t\t\tgroupId\n\t\t\t\t\t\tmenuPrice\n\t\t\t\t\t\tquantity\n\t\t\t\t\t\torderId\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\torderItems {\n\t\t\t\t\tid\n\t\t\t\t\tmenuId\n\t\t\t\t\tmenuPrice\n\t\t\t\t\tquantity\n\t\t\t\t\torderId\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery orderList($where: Json!) {\n\t\torderList(where: $where) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\ttotal\n\t\t\t\torderItemGroups {\n\t\t\t\t\tid\n\t\t\t\t\tstatus\n\t\t\t\t\torderItems {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tmenuId\n\t\t\t\t\t\tgroupId\n\t\t\t\t\t\tmenuPrice\n\t\t\t\t\t\tquantity\n\t\t\t\t\t\torderId\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\torderItems {\n\t\t\t\t\tid\n\t\t\t\t\tmenuId\n\t\t\t\t\tmenuPrice\n\t\t\t\t\tquantity\n\t\t\t\t\torderId\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery orderItemGroupList($where: Json!) {\n\t\torderItemGroupList(where: $where) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tstatus\n\t\t\t\torderId\n\t\t\t\torder {\n\t\t\t\t\tid\n\t\t\t\t\tseat {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\torderItems {\n\t\t\t\t\tid\n\t\t\t\t\tmenuId\n\t\t\t\t\tmenuPrice\n\t\t\t\t\tquantity\n\t\t\t\t\torderId\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery orderItemGroupList($where: Json!) {\n\t\torderItemGroupList(where: $where) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tstatus\n\t\t\t\torderId\n\t\t\t\torder {\n\t\t\t\t\tid\n\t\t\t\t\tseat {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\torderItems {\n\t\t\t\t\tid\n\t\t\t\t\tmenuId\n\t\t\t\t\tmenuPrice\n\t\t\t\t\tquantity\n\t\t\t\t\torderId\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery menuListQuery($where: Json!) {\n\t\tmenuList(where: $where) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tprice\n\t\t\t\tdescription\n\t\t\t\tcreatedAt\n\t\t\t\tupdatedAt\n\t\t\t\tdeletedAt\n\t\t\t}\n\t\t\tcount\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery menuListQuery($where: Json!) {\n\t\tmenuList(where: $where) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tprice\n\t\t\t\tdescription\n\t\t\t\tcreatedAt\n\t\t\t\tupdatedAt\n\t\t\t\tdeletedAt\n\t\t\t}\n\t\t\tcount\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tsubscription orderSub{\n\t\torderSubscription\n\t}\n"): (typeof documents)["\n\tsubscription orderSub{\n\t\torderSubscription\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation mutateOrder($values: Json!, $id: ID) {\n\t\tmutateOrder(values: $values, id: $id) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation mutateOrder($values: Json!, $id: ID) {\n\t\tmutateOrder(values: $values, id: $id) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation mutateOrderItemGroup($values: Json!) {\n\t\tmutateOrderItemGroup(values: $values) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation mutateOrderItemGroup($values: Json!) {\n\t\tmutateOrderItemGroup(values: $values) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery orderList_cart($where: Json!) {\n\t\torderList(where: $where) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\ttotal\n\t\t\t\torderItemGroups {\n\t\t\t\t\tid\n          status\n\t\t\t\t\torderItems {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tmenuId\n\t\t\t\t\t\tgroupId\n\t\t\t\t\t\tmenuPrice\n\t\t\t\t\t\tquantity\n\t\t\t\t\t\torderId\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\torderItems {\n\t\t\t\t\tid\n\t\t\t\t\tmenuId\n\t\t\t\t\tgroupId\n\t\t\t\t\tmenuPrice\n\t\t\t\t\tquantity\n\t\t\t\t\torderId\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery orderList_cart($where: Json!) {\n\t\torderList(where: $where) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\ttotal\n\t\t\t\torderItemGroups {\n\t\t\t\t\tid\n          status\n\t\t\t\t\torderItems {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tmenuId\n\t\t\t\t\t\tgroupId\n\t\t\t\t\t\tmenuPrice\n\t\t\t\t\t\tquantity\n\t\t\t\t\t\torderId\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\torderItems {\n\t\t\t\t\tid\n\t\t\t\t\tmenuId\n\t\t\t\t\tgroupId\n\t\t\t\t\tmenuPrice\n\t\t\t\t\tquantity\n\t\t\t\t\torderId\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;