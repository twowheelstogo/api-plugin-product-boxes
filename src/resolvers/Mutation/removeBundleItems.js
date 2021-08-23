import { decodeShopOpaqueId, decodeBundleOpaqueId, decodeProductOpaqueId } from "../../xforms/id.js";

/**
 * @method Mutation/removeBundleItems
 * @summary initializes empty product bundle template, with empty variant
 * @param {Object} _ - unused
 * @param {Object} args - The input arguments
 * @param {Object} args.input - mutation input object
 * @param {String} [args.input.clientMutationId] - The mutation id
 * @param {String} [args.input.bundleId] - bundle Id
 * @param {String} [args.input.itemIds] - product Ids
 * @param {String} args.input.shopId - shopId of shop to create product for
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} removeBundleItems payload
 */
export default async function removeBundleItems(_, { input }, context) {
    const {
        clientMutationId = null,
        bundleId,
        shopId,
        itemIds: opaqueItemIds
    } = input;

    const itemIds = opaqueItemIds.map((itemId) => decodeProductOpaqueId(itemId));

    const productBundle = await context.mutations.removeBundleItems(context, {
        shopId: decodeShopOpaqueId(shopId),
        bundleId: decodeBundleOpaqueId(bundleId),
        itemIds
    });

    return {
        clientMutationId,
        productBundle
    }
}