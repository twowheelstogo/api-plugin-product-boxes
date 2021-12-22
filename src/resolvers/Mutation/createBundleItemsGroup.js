import { decodeBundleOpaqueId } from "../../xforms/id.js";

/**
 * @method Mutation/createBundleItemsGroup
 * @summary initialize empty items group template
 * @param {Object} _ - unusued
 * @param {Object} args - The input arguments
 * @param {Object} args.input - mutation input argument
 * @param {String} [args.input.clientMutationId] - The mutation id
 * @param {String} [args.input.bundleId] - The ID of the bundle
 * @param {String} [args.input.title] - The title of the group
 * @param {Number} [args.input.limit] - The limit of item selection
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} createBundleItemsGroup payload
 */
export default async function createBundleItemsGroup(_, { input }, context) {
    const { clientMutationId = null, bundleId: opaqueBundleId, title, limit } = input;

    const bundleId = decodeBundleOpaqueId(opaqueBundleId);

    const productBundle = await context.mutations.createBundleItemsGroup(context, {
        bundleId,
        title,
        limit
    });

    return { productBundle, clientMutationId }
}