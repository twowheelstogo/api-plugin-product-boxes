import getPaginatedResponse from "@reactioncommerce/api-utils/graphql/getPaginatedResponse.js";
import wasFieldRequested from "@reactioncommerce/api-utils/graphql/wasFieldRequested.js";
import { decodeBundleOpaqueId, decodeProductOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";

/**
 * @name Query/productBundles
 * @method
 * @memberof ProductBundles/Query
 * @summary Query for a list of products
 * @param {Object} _ - unused
 * @param {Object} args - an object of all arguments that were sent by the client
 * @param {String} args.shopId - id of user to query
 * @param {Object} context - an object containing the per-request state
 * @param {Object} info Info about the GraphQL request
 * @returns {Promise<Object>} Products
 */
export default async function products(_, args, context, info) {
  const {
    productIds: opaqueProductIds,
    shopIds: opaqueShopIds,
    bundleIds: opaqueBundleIds,
    query: queryString,
    metafieldKey,
    metafieldValue,
    ...connectionArgs
  } = args;

  const shopIds = opaqueShopIds.map(decodeShopOpaqueId);
  const productIds = opaqueProductIds && opaqueProductIds.map(decodeProductOpaqueId);
  const bundleIds = opaqueBundleIds && opaqueBundleIds.map(decodeBundleOpaqueId);

  const query = await context.queries.productBundles(context, {
    productIds,
    shopIds,
    bundleIds,
    query: queryString,
    metafieldKey,
    metafieldValue
  });

  return getPaginatedResponse(query, connectionArgs, {
    includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
    includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
    includeTotalCount: wasFieldRequested("totalCount", info)
  });
}
