import { decodeShopOpaqueId } from "../../xforms/id.js";

/**
 * @method Mutation/createProductBundle
 * @summary initializes empty product bundle template, with empty variant
 * @param {Object} _ - unused
 * @param {Object} args - The input arguments
 * @param {Object} args.input - mutation input object
 * @param {String} [args.input.clientMutationId] - The mutation id
 * @param {String} [args.input.productBundle] - product data
 * @param {String} [args.input.product] - product data
 * @param {Boolean} [input.shouldCreateFirstVariant] - Auto-create one variant for the product
 * @param {String} args.input.shopId - shopId of shop to create product for
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} createProductBundle payload
 */
export default async function createProductBundle(_, { input }, context) {
    const {
        clientMutationId = null,
        productBundle: productBundleInput,
        shopId,
        shouldCreateFirstVariant
    } = input;

    const productBundle = await context.mutations.createProductBundle(context, {
        productBundle: productBundleInput,
        shopId: decodeShopOpaqueId(shopId),
        shouldCreateFirstVariant
    });

    return {
        clientMutationId,
        productBundle
    };
}