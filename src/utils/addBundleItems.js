
/**
 * @summary Given a list of current bundle items and a list of items a shopper wants
 *   to add, validate available quantities and return the full merged list.
 * @param {Object[]} currentItems - Array of current items in CartItem schema
 * @param {Object[]} inputItems - Array of items to add in CartItemInput schema
 *   Skipping this is not recommended for new code.
 * @returns {Object}  and `updatedItemList` props
 */
export default async function addCartItems(currentItems, inputItems) {
    const updatedItemList = currentItems || [];

    for (var index in inputItems) {
        const match = (currentItems || []).find((value) => value == inputItems[index]);
        if (!match) updatedItemList.push(inputItems[index]);
    }

    return { updatedItemList };
}