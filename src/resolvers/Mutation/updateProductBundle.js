import { decodeBundleOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";

/**
 *
 * @method updateProductBundle
 * @summary Updates various product bundle fields
 * @param {Object} _ - unused
 * @param {Object} args - The input arguments
 * @param {Object} args.input - mutation input object
 * @param {String} args.input.clientMutationId - The mutation id
 * @param {String} args.input.productBundle - product bundle fields to update
 * @param {String} args.input.bundleId - bundleId of product to update
 * @param {String} args.input.shopId - shopId of shop product belongs to
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} updateProductBundle payload
 */
export default async function updateProductBundle(_, { input }, context) {
    const {
        clientMutationId = null,
        productBundle: productBundleInput,
        bundleId,
        shopId
    } = input;

    if (Array.isArray(productBundleInput.items)) {
        delete productBundleInput.items;
    }

    const updatedProductBundle = await context.mutations.updateProductBundle(context, {
        productBundle: productBundleInput,
        bundleId: decodeBundleOpaqueId(bundleId),
        shopId: decodeShopOpaqueId(shopId)
    });

    return {
        clientMutationId,
        productBundle: updatedProductBundle
    };
}