import { decodeBundleItemsGroupOpaqueId, decodeBundleOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";

/**
 * @method Mutation/updateBundleItemsGroup
 * @summary initialize a empty input for a update of a single bundle group
 * @param {Object} _ - unused
 * @param {Object} args - The input arguments
 * @param {Object} args.input - mutation input object
 * @param {String} [args.input.clientMutationId] - The mutation id
 * @param {String} [args.input.shopId] - The ID for the shop
 * @param {String} [args.input.bundleId] - The ID for the shop
 * @param {String} [args.input.groupId] - The ID for the shop
 * @param {Object} [args.input.group] - The input for the group
 * @param {String} [args.input.group.title] - The title of the group
 * @param {Number} [args.input.group.limit] - The selection limit of the group
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} updateBundleItemsGroup payload
 */
export default async function updateBundleItemsGroup(_, { input }, context) {
    const {
        clientMutationId = null,
        shopId: opaqueShopId,
        bundleId: opaqueBundleId,
        groupId: opaqueGroupId,
        group
    } = input;

    const shopId = decodeShopOpaqueId(opaqueShopId);
    const bundleId = decodeBundleOpaqueId(opaqueBundleId);
    const groupId = decodeBundleItemsGroupOpaqueId(opaqueGroupId);

    const productBundle = await context.mutations.updateBundleItemsGroup(context, {
        shopId,
        bundleId,
        groupId,
        group
    });

    return { productBundle, clientMutationId };
}
