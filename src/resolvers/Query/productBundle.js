import { decodeProductOpaqueId, decodeShopOpaqueId, decodeBundleOpaqueId } from "../../xforms/id.js";

/**
 * @method Query/productBundle
 * @summary - Resolver for a productBundle query
 * @param {Object} _ - unusued
 * @param {String} args.shopId - A shop ID
 * @param {String} args.productId - A product ID to a single product
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} - ProductBundle
 */
export default async function productBundle(_, args, context) {
    const {
        productId: opaqueProductId,
        shopId: opaqueShopId,
        bundleId: opaqueBundleId
      } = args;
    
      const productId = decodeProductOpaqueId(opaqueProductId);
      const shopId = decodeShopOpaqueId(opaqueShopId);
      const bundleId = decodeBundleOpaqueId(opaqueBundleId);

      return context.queries.productBundle(context, {
        productId,
        shopId,
        bundleId
      });
}