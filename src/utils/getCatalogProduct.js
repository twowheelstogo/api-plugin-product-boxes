import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @method getCatalogProduct
 * @summary Get a current CatalogProduc for a Single Bundle
 * @param {Object} context - an object containing the per-request state
 * @param {String} shopId - A Shop Id
 * @param {String} productId - A Product or top level Product ID.
 */
export default async function getCatalogProduct(context, shopId, productId) {
    
    if(!productId) throw new ReactionError("required","productId is required");

    const { data: { catalogItemProduct } } = await context.query.catalogItemProduct({
        variables: {
            shopId: shopId,
            slugOrId: productId
        }
    });
    return { product: catalogItemProduct?.product };
}