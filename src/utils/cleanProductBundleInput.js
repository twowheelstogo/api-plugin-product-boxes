
const productBundleFieldsThatShouldNotBeDirectlySet = [
    "_id",
    "variantId",
    "productId",
    "shopId",
    "price",
    "compareAtPrice",
    "itemIds",
    "media",
    "createdAt",
    "updatedAt"
];

/**
* @summary Copies and cleans the ProductBundleInput object accepted by the
*   createProductBundle and updateProductBundle mutations.
* @param {Object} input Function input
* @param {Object} input.productBundleInput ProductBundleInput object to clean
* @return {Promise<Object>} Cleaned ProductBundleInput
*/
export default async function cleanProductBundleInput({ productBundleInput }) {
    const input = { ...productBundleInput };

    productBundleFieldsThatShouldNotBeDirectlySet.forEach((forbiddenField) => {
        delete input[forbiddenField];
    });

    return input;
}