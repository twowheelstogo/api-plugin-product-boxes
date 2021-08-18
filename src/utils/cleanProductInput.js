
const productBundleFieldsThatShouldNotBeDirectlySet = [
    "_id",
    "variantId",
    "productId",
    "shopId",
    "price",
    "compareAtPrice",
    "itemIds",
    "media",
    "updatedAt",
    "createdAt",
    "limit"
];

/**
* @summary Copies and cleans the productInput object accepted by the
*   createProductBundle and updateProductBundle mutations.
* @param {Object} input Function input
* @param {Object} input.productInput productInput object to clean
* @return {Promise<Object>} Cleaned productInput
*/
export default async function cleanProductInput({ productInput }) {
    const input = { ...productInput };

    if(input.name) {
        input.title = input.name;
        delete input.name;
    }
    
    if(input.subtitle) {
        input.pageTitle = input.subtitle;
        delete input.subtitle;
    }

    productBundleFieldsThatShouldNotBeDirectlySet.forEach((forbiddenField) => {
        delete input[forbiddenField];
    });

    return input;
}