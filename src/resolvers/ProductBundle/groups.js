import { getItems } from "../../utils/index.js";
import { encodeBundleItemsGroupId } from "../../xforms/id.js";

export default function bundleItemsGroups(groups, ctx) {
    if (!groups) return null;

    return groups.map((group) => (
        {
            _id: encodeBundleItemsGroupId(group._id),
            title: group.title,
            limit: group.limit,
            itemIds: group.itemIds,
            items: getItems(ctx, group.itemIds)
        }
    ));
}