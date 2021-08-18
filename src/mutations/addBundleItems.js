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
    }
})
/**
 * @method createProductBundle
 * @summary - Creates a product bundle for a single bundle
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - input arguments for the operation
 * @param {Object} [input.productBundle] - product bundle data
 * @param {Object} [input.shouldCreateFirstVariant] 
 */
export default async function addBundleItems(context, input) {
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

    const { updatedItemList } = await addBundleItemsUtil(bundle?.itemIds, itemIds);

    const updatedBundle = {
        ...bundle,
        itemIds: updatedItemList
    }

    const { result } = await Bundles.replaceOne(query, updatedBundle, { upsert: true });
    if (result.ok !== 1) throw new ReactionError("server-error", "Unable to save bundle");

    return updatedBundle;
}