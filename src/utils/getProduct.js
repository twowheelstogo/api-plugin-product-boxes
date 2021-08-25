import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @method getProduct
 * @summary Get a current Product for a Single Bundle
 * @param {Object} context - an object containing the per-request state
 * @param {String} shopId - A Shop Id
 * @param {String} productId - A Product or top level Product ID.
 */
export default async function getProduct(context, shopId, productId) {
    const { collections } = context;
    const { Products } = collections;

    if (!productId) throw new ReactionError("required", "productId is required");

    console.log("productId", productId);

    return Products.findOne({
        _id: productId,
        shopId
    })
}