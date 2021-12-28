import decodeOpaqueIdForNamespace from "@reactioncommerce/api-utils/decodeOpaqueIdForNamespace.js";
import encodeOpaqueId from "@reactioncommerce/api-utils/encodeOpaqueId.js";

const namespaces = {
  Product: "reaction/product",
  Shop: "reaction/shop",
  Tag: "reaction/tag",
  Bundle: "reaction/bundle",
  BundleItemsGroup: "reaction/bundleItemsGroup"
};

export const encodeProductOpaqueId = encodeOpaqueId(namespaces.Product);
export const encodeShopOpaqueId = encodeOpaqueId(namespaces.Shop);
export const encodeTagOpaqueId = encodeOpaqueId(namespaces.Tag);
export const encodeBundleOpaqueId = encodeOpaqueId(namespaces.Bundle);
export const encodeBundleItemsGroupId = encodeOpaqueId(namespaces.BundleItemsGroup);

export const decodeProductOpaqueId = decodeOpaqueIdForNamespace(namespaces.Product);
export const decodeShopOpaqueId = decodeOpaqueIdForNamespace(namespaces.Shop);
export const decodeTagOpaqueId = decodeOpaqueIdForNamespace(namespaces.Tag);
export const decodeBundleOpaqueId = decodeOpaqueIdForNamespace(namespaces.Bundle);
export const decodeBundleItemsGroupOpaqueId = decodeOpaqueIdForNamespace(namespaces.BundleItemsGroup);
