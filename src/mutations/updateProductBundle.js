import SimpleSchema from "simpl-schema";
import { ProductBundle } from "../simpleSchemas.js";
import cleanProductBundleInput from "../utils/cleanProductBundleInput.js";
import ReactionError from "@reactioncommerce/reaction-error";
import cleanProductInput from "../utils/cleanProductInput.js";
const inputSchema = new SimpleSchema({
    productBundle: ProductBundle,
    bundleId: {
        type: String
    },
    shopId: {
        type: String
    }
});

/**
 * @method updateProductBundle
 * @summary Updates a ProductBundle
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} input - Input arguments for the bulk operation
 * @param {String} input.productBundle - input for a productBundle
 * @param {String} input.bundleId - bundle ID to update
 * @param {String} input.shopId - shop ID of shop product belongs to
 */
export default async function updateProductBundle(context, input) {
    inputSchema.validate(input);
    const cleanedInput = inputSchema.clean(input);
    const { collections } = context;
    const { Bundles } = collections;
    const { productBundle: productBundleInput, bundleId, shopId } = cleanedInput;

    const currentProductBundle = await Bundles.findOne({ _id: bundleId, shopId });

    if (!currentProductBundle) throw new ReactionError("not-found", "ProductBundle not found");

    const updateDocument = await cleanProductBundleInput({ productBundleInput });

    if (Object.keys(updateDocument).length === 0) {
        throw new ReactionError("invalid-param", "At least one field to update must be provided");
    }
    updateDocument.updatedAt = new Date();

    const modifier = { $set: updateDocument };

    ProductBundle.validate(modifier, { modifier: true });

    const { value: updatedProductBundle } = await Bundles.findOneAndUpdate(
        {
            _id: bundleId,
            shopId
        },
        modifier,
        {
            returnOriginal: false
        }
    );
    const cleanedProductInput = await cleanProductInput({
        productInput: updateDocument
    })
    await context.mutations.updateProduct(context, {
        product: cleanedProductInput,
        productId: currentProductBundle?.productId,
        shopId
    })

    return updatedProductBundle;
}