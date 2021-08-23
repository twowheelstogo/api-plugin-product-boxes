
/**
 * @summary Given a list of current bundle items and a list of items a shopper wants to remove
 *   to add, validate available quantities and return the full updated list.
 * @param {Object[]} currentItems - Array of current items in CartItem schema
 * @param {Object[]} inputItems - Array of items to remove in CartItemInput schema
 *   Skipping this is not recommended for new code.
 * @returns {Object}  and `updatedItemList` props
 */
 export default async function removeBundleItems(currentItems, inputItems) {
    const updatedItemList = currentItems || [];

    for (var index in inputItems) {
        const currIndex = (currentItems || []).findIndex((value) => value == inputItems[index]);
        if (currIndex !== -1) updatedItemList.splice(currIndex, 1);
    }

    return { updatedItemList };
}