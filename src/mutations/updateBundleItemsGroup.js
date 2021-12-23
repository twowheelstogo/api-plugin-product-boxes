import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @method updateBundleItemsGroup
 * @summary Updates a single bundle item group
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} input - Input arguments for the bulk operation
 * @param {String} [input.shopId] - The ID for the shop
 * @param {String} [input.bundleId] - The ID for the bundle
 * @param {String} [input.groupId] - The ID for the group
 * @param {Object} [input.group] - The input for the group
 * @param {String} [input.group.title] - The title of the group
 * @param {Number} [input.group.limit] - The selection limit of the group
 * @returns {Promise<Object>} - Returns an object with `ProductBundle` properties
 */
export default async function updateBundleItemsGroup(context, input) {
    const { collections } = context;
    const { Bundles } = collections;
    const { shopId, bundleId, groupId, group: groupInput } = input;

    const query = {
        _id: bundleId,
        shopId,
        "groups._id": groupId
    };

    const selector = {
        $set: {
            "groups.$.title": groupInput.title,
            "groups.$.limit": groupInput.limit,
            "updatedAt": new Date()
        }
    };

    const { value: productBundle } = await Bundles.findOneAndUpdate(query, selector, { returnOriginal: false });

    if (!productBundle) throw new ReactionError("bad-request", `Unexpected error updating a bundle with id ${bundleId}`);

    return productBundle;
}
