import SimpleSchema from "simpl-schema";
import { ProductBundle } from "../simpleSchemas.js";
import { createProduct } from "../utils/index.js";
import Random from "@reactioncommerce/random";

const inputSchema = new SimpleSchema({
    productBundle: ProductBundle,
    shopId: String,
    shouldCreateFirstVariant: {
        type: Boolean,
        optional: true
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
export default async function createProductBundle(context, input) {
    inputSchema.validate(input);
    const cleanedInput = inputSchema.clean(input);
    const { collections } = context;
    const { Bundles } = collections;
    const { shopId, productBundle: productBundleInput} = cleanedInput;

    const newProductBundleId = (productBundleInput && productBundleInput._id) || Random.id();

    const { product } = await createProduct(context, {
        shopId,
        product: {
            title: productBundleInput.name,
            description: "Product generated from Bundle"
        }
    });
    console.log("product", product)
    const productBundle = {
        _id: newProductBundleId,
        productId: product && product?._id,
        shopId: shopId,
        ...productBundleInput
    };

    ProductBundle.validate(productBundle);

    await Bundles.insertOne(productBundle);

    return productBundle;
}
