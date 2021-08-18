import { encodeBundleOpaqueId } from "../../xforms/id.js";
import getProduct from "../../utils/getProduct.js";
import { getItems } from "../../utils/index.js";
import resolveShopFromShopId from "@reactioncommerce/api-utils/graphql/resolveShopFromShopId.js";

export default {
    _id: (node) => encodeBundleOpaqueId(node._id),
    name: (node) => node.name,
    limit: (node) => node.limit,
    productId: (node) => node.productId,
    shop: resolveShopFromShopId,
    product: (node, __, ctx) => getProduct(ctx, node.shopId, node.productId),
    itemIds: (node) => node.itemIds,
    variantId: (node) => node.variantId,
    items: (node, _, ctx) => getItems(ctx, node.shopId, node.itemIds)
}