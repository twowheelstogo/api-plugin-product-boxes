import ReactionError from "@reactioncommerce/reaction-error";
import Random from "@reactioncommerce/random";

/**
 * @method createBundleItemsGroup
 * @summary - Creates a group that contains a list of products and limits your selection
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - input arguments for the operation
 * @param {String} input.title - the title of the group
 * @param {Number} input.limit - the selection limit of items
 * @param {String} input.bundleId - the bundle ID to update
 * @returns {Promise<Object>} - An object with `ProductBundle` properties
 */
export default async function createBundleItemsGroup(context, input) {
    const { collections } = context;
    const { Bundles } = collections;
    const { bundleId, title, limit } = input;

    const groupInput = {
        _id: Random.id(),
        title,
        limit,
        itemIds: null
    }

    const { value: productBundle } = await Bundles.findOneAndUpdate(
        { _id: bundleId },
        { $push: { groups: groupInput } },
        { returnOriginal: false }
    );

    if (!productBundle) throw new ReactionError("not-found", `Bundle with id ${bundleId} not found`);

    return productBundle;
}
