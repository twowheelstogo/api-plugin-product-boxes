import SimpleSchema from "simpl-schema";
import { addBundleItemsUtil } from "../utils/index.js";
import ReactionError from "@reactioncommerce/reaction-error";

const inputSchema = new SimpleSchema({
    shopId: String,
    bundleId: String,
    itemIds: {
        type: Array
    },
    "itemIds.$": {
        type: String
    },
    groupId: String
})
/**
 * @method createProductBundle
 * @summary - Add a list of items into the bundle
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - input arguments for the operation
 * @param {Object} [input.itemIds] - a list of item ID'S
 * @param {Object} [input.shopId] - the ID of the shop
 * @param {Object} [input.bundleId] - the ID of the bundle
 * @param {Object} [input.groupId] - the ID of the bundle group
 */
export default async function addBundleItems(context, input) {
    inputSchema.validate(input);
    const cleanedInput = inputSchema.clean(input);
    const { collections } = context;
    const { Bundles } = collections;
    const { shopId, bundleId, itemIds, groupId } = cleanedInput;
    const query = {};
    if (shopId) {
        query.shopId = shopId;
    }

    if (bundleId) {
        query._id = bundleId;
    }
    const bundle = await Bundles.findOne(query);

    const { updatedGroupList } = await addBundleItemsUtil(bundle?.groups, groupId, itemIds);

    const updatedBundle = {
        ...bundle,
        updatedAt: new Date(),
        groups: updatedGroupList
    }

    const { result } = await Bundles.replaceOne(query, updatedBundle, { upsert: true });
    if (result.ok !== 1) throw new ReactionError("server-error", "Unable to save bundle");

    return updatedBundle;
}