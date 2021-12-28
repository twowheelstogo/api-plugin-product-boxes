import { encodeBundleOpaqueId, encodeProductOpaqueId } from "../../xforms/id.js";
import getProduct from "../../utils/getProduct.js";
import resolveShopFromShopId from "@reactioncommerce/api-utils/graphql/resolveShopFromShopId.js";
import bundleItemsGroups from "./groups.js";
import { getItems } from "../../utils/index.js";

export default {
    _id: (node) => encodeBundleOpaqueId(node._id),
    name: (node) => node.name,
    limit: (node) => node.limit,
    productId: (node) => encodeProductOpaqueId(node.productId),
    shop: resolveShopFromShopId,
    product: (node, __, ctx) => getProduct(ctx, node.shopId, node.productId),
    groups: (node, __, ctx) => bundleItemsGroups(node.groups, ctx),
    variantId: (node) => node.variantId,
    itemIds: (node) => node.itemIds,
    items: (node, __, ctx) => getItems(ctx, node.itemIds)
}