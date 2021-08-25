

/**
 * @name productBundle
 * @method GraphQL/ProductBundle
 * @summary Query the Bundles collection for a single Bundle
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Request input
 * @param {Object} input - Bundle ID
 * @param {String} input.productId - Product ID
 * @param {String} input.shopId - Shop ID
 * @returns {Promise<Object>} Product object Promise
 */
export default async function productBundle(context, input) {
    const { collections } = context;
    const { Bundles } = collections;
    const { productId, bundleId, shopId } = input;

    let query = {
        shopId
    }
    if (productId) {
        query.productId = productId;
    }
    if (bundleId) {
        query._id = bundleId;
    }
    
    return Bundles.findOne(query);
}