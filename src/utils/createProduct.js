import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @method createProduct
 * @summary - Create a product 
 * @param context - an object containing the per-request state
 * @param input - Input arguments for the operation
 * @param input.product - Product to add into Products
 * @param input.shopId - the shop to create the product for
 * @return {String} created productId;
 */
export default async function createProduct(context, input) {
    const { product, shopId } = input;
    if (!product) throw new ReactionError("missing-param", "product is required");

    product.productType = "bundle";
    try {
        const data = await context.mutations.createProduct(context, {
            product,
            shopId,
            shouldCreateFirstVariant: false
        });

        return { product: data };

    } catch (error) {
        throw new ReactionError("server-error", error.message);
    }
}