import { decodeBundleItemsGroupOpaqueId, decodeBundleOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";

/**
 * @method Mutation/removeBundleItemsGroup
 * @summary initializes a empty template for a deletion of bundle items group
 * @param {Object} _ - unused
 * @param {Object} args - The input arguments
 * @param {Object} args.input - mutation input object
 * @param {String} [args.input.clientMutationId] - The mutation id
 * @param {String} [args.input.shopId] - The ID for the shop
 * @param {String} [args.input.bundleId] - The ID for the bundle
 * @param {String} [args.input.groupId] - The ID for the group
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} removeBundleItemsGroup payload
 */
export default async function removeBundleItemsGroup(_, { input }, context) {
    const {
        clientMutationId = null,
        shopId: opaqueShopId,
        bundleId: opaqueBundleId,
        groupId: opaqueGroupId
    } = input;

    const shopId = decodeShopOpaqueId(opaqueShopId);
    const bundleId = decodeBundleOpaqueId(opaqueBundleId);
    const groupId = decodeBundleItemsGroupOpaqueId(opaqueGroupId);

    const productBundle = await context.mutations.removeBundleItemsGroup(context, {
        shopId,
        bundleId,
        groupId
    });

    return { productBundle, clientMutationId };
}