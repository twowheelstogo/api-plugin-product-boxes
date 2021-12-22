import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @method getItems
 * @summary Get a current Product for a Single Bundle
 * @param {Object} context - an object containing the per-request state
 * @param {Array} itemIds - A Product or top level Product ID.
 */
export default async function getItems(context, itemIds) {
    const { collections } = context;
    const { Products } = collections;

    if(!itemIds) return [];
    
    return Products.find({
        _id: {
            $in: itemIds
        }
    }).toArray();
}
