import applyProductBundleFilters from "../utils/applyProductBundleFilters.js";

/**
 * @name productBundles
 * @method GraphQL/ProductBundles
 * @summary Query the Bundles collection for a single Bundle
 * @param {Object} context - an object containing the per-request state
 * @param {String} [metafieldKey] - Filter by metafield key
 * @param {String} [metafieldValue] - Filter by metafield value
 * @param {String[]} [productIds] - List of product IDs to filter by
 * @param {String} [query] - Regex match query string
 * @param {String[]} shopIds - List of shop IDs to filter by
 * @param {String[]} [bundleIds] - List of bundle ids to filter by
 * @returns {Promise<Object>} Product object Promise
 */
export default async function productBundles(context, input) {
    const { collections } = context;
    const { Bundles } = collections;
    const productBundleFilters = input;
    //Create the mongo selector from filters
    const selector = applyProductBundleFilters(context, productBundleFilters);

    // Get the first N (limit) top-level products that match the query
    return Bundles.find(selector);
}
