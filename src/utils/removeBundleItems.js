
/**
 * @summary Given a list of current bundle items and a list of items a shopper wants to remove
 *   to add, validate available quantities and return the full updated list.
 * @param {Object[]} currentItems - Array of current items in CartItem schema
 * @param {Object[]} inputItems - Array of items to remove in CartItemInput schema
 *   Skipping this is not recommended for new code.
 * @returns {Object}  and `updatedItemList` props
 */
export default async function removeBundleItems(currentGroups, inputItems) {
    const updatedGroupList = currentGroups || [];

    for (var item of inputItems) {

        for (var groupIndex in updatedGroupList) {
            const index = (updatedGroupList[groupIndex].itemIds || []).findIndex((itemId) => itemId == item);

            if (index !== -1) {

                updatedGroupList[groupIndex].itemIds.splice(index, 1);
            }
        }
    }

    return { updatedGroupList };
}