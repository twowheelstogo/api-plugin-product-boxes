
/**
 * @summary Given a list of current bundle items and a list of items a shopper wants
 *   to add, validate available quantities and return the full merged list.
 * @param {Object[]} currentItems - Array of current items in CartItem schema
 * @param {Object[]} inputItems - Array of items to add in CartItemInput schema
 *   Skipping this is not recommended for new code.
 * @returns {Object}  and `updatedItemList` props
 */
export default async function addBundleItems(currentGroups, groupId, inputItems) {
    const updatedGroupList = currentGroups || [];

    for (var item of inputItems) {

        const match = (updatedGroupList || []).find((group) => {

            return (group.itemIds || []).find((value) => value == item) ? true : false
        });



        if (!match) {
            const index = (updatedGroupList || []).findIndex((group) => group._id == groupId);

            console.log("group index", index);
            if (index !== -1) {
                if (Array.isArray(updatedGroupList[index].itemIds)) {

                    updatedGroupList[index].itemIds.push(item);
                } else {
                    updatedGroupList[index].itemIds = [item];
                }
            }
        }
    }

    return { updatedGroupList };
}
