import SimpleSchema from "simpl-schema";

const filters = new SimpleSchema({
    "productIds": {
        type: Array,
        optional: true
    },
    "productIds.$": String,
    "shopIds": {
        type: Array,
        optional: true
    },
    "shopIds.$": String,
    "bundleIds": {
        type: Array,
        optional: true
    },
    "bundleIds.$": String,
    "query": {
        type: String,
        optional: true
    },
    "metafieldKey": {
        type: String,
        optional: true
    },
    "metafieldValue": {
        type: String,
        optional: true
    }
});

/**
 * @name applyProductBundleFilters
 * @summary Builds a selector for Bundles collection, given a set of filters
 * @private
 * @param {Object} context - an object containing the per-request state
 * @param {Object} productBundleFilters - See filters schema above
 * @returns {Object} Selector
 */
export default function applyProductBundleFilters(context, productBundleFilters) {
    // if there are filter/params that don't match the schema
    filters.validate(productBundleFilters);

    // Init default selector - Everyone can see products that fit this selector
    let selector = {
    };

    if (productBundleFilters) {
        // filter by productIds
        if (productBundleFilters.productIds) {
            selector = {
                ...selector,
                productId: {
                    $in: productBundleFilters.productIds
                }
            };
        }

        if (productBundleFilters.shopIds) {
            selector = {
                ...selector,
                shopId: {
                    $in: productBundleFilters.shopIds
                }
            };
        }

        // filter by query
        if (productBundleFilters.query) {
            const cond = {
                $regex: productBundleFilters.query,
                $options: "i"
            };
            selector = {
                ...selector,
                $or: [{
                    subtitle: cond
                }, {
                    name: cond
                }, {
                    description: cond
                }]
            };
        }

        // filter by bundles
        if (productBundleFilters.bundleIds) {
            selector = {
                ...selector,
                _id: {
                    $in: productFilters.bundleIds
                }
            };
        }

        // filter by details
        if (productBundleFilters.metafieldKey && productBundleFilters.metafieldValue) {
            selector = {
                ...selector,
                metafields: {
                    $elemMatch: {
                        key: {
                            $regex: productBundleFilters.metafieldKey,
                            $options: "i"
                        },
                        value: {
                            $regex: productBundleFilters.metafieldValue,
                            $options: "i"
                        }
                    }
                }
            };
        }

    } // end if productBundleFilters

    return selector;
}