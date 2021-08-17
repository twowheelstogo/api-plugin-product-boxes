import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @method getProduct
 * @summary Get a current Product for a Single Bundle
 * @param {Object} context - an object containing the per-request state
 * @param {String} shopId - A Shop Id
 * @param {String} productId - A Product or top level Product ID.
 */
export default async function getProduct(context, shopId, productId) {
    
    if(!productId) throw new ReactionError("required","productId is required");

    return context.queries.product(context, {
        shopId,
        productId
    })
}