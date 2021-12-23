import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @method removeBundleItemsGroup
 * @summary - Removes a group of items from bundle
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - input arguments for the operation
 * @param {String} [input.shopId] - shop id for the bundle
 * @param {String} [input.bundleId] - the ID for the bundle
 * @param {String} [input.groupId] - the ID for the group
 * @param {Promise<Object>} - returns an object with `ProductBundle` properties
 */
export default async function removeBundleItemsGroup(context, input) {
    const { collections } = context;
    const { Bundles } = collections;
    const { shopId, bundleId, groupId } = input;

    const query = {
        _id: bundleId,
        shopId
    }

    const bundle = await Bundles.findOne(query);

    if (!bundle) throw new ReactionError("not-found", `Bundle with id ${bundleId} not found`);

    const { value: productBundle } = await Bundles.findOneAndUpdate(query, {
        $pull: { groups: { _id: groupId } }
    }, { returnOriginal: false });

    if (!productBundle) throw new ReactionError("bad-request", `Unexpected error updating a bundle with id ${bundleId}`);

    return productBundle;
}