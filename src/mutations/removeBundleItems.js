import SimpleSchema from "simpl-schema";
import { removeBundleItemsUtil } from "../utils/index.js";
import ReactionError from "@reactioncommerce/reaction-error";

const inputSchema = new SimpleSchema({
    shopId: String,
    bundleId: String,
    itemIds: {
        type: Array
    },
    "itemIds.$": {
        type: String
    }
})
/**
 * @method removeBundleItems
 * @summary - Remove items from bundle
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - input arguments for the operation
 * @param {String} [input.shopId] - shop id for the bundle
 * @param {String} [input.bundleId] - bundle id 
 * @param {Array} [input.itemIds] - item ids to delete
 */
export default async function removeBundleItems(context, input) {
    inputSchema.validate(input);
    const cleanedInput = inputSchema.clean(input);
    const { collections } = context;
    const { Bundles } = collections;
    const { shopId, bundleId, itemIds } = cleanedInput;
    const query = {};
    if (shopId) {
        query.shopId = shopId;
    }

    if (bundleId) {
        query._id = bundleId;
    }
    const bundle = await Bundles.findOne(query);

    const { updatedItemList } = await removeBundleItemsUtil(bundle?.groups, itemIds);

    const updatedBundle = {
        ...bundle,
        itemIds: updatedItemList
    }

    const { result } = await Bundles.replaceOne(query, updatedBundle, { upsert: true });
    if (result.ok !== 1) throw new ReactionError("server-error", "Unable to save bundle");

    return updatedBundle;
}