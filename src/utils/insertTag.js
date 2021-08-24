import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";
import getSlug from "@reactioncommerce/api-utils/getSlug.js";

const TAG_SLUG = "boxes";

/**
 * @method insertTag
 * @summary creates a new tag if does not exists
 * @param {Object} context context of startup
 * @param {Object} input - input of function
 * @param {String} input.shopId - shop id to create tag 
 * @returns undefined
 */
export default async function inserTag(context, input) {
    const { collections, appEvents } = context;
    const { Tags } = collections;
    const { shopId } = input;

    const now = new Date();

    const tagInput = {
        _id: Random.id(),
        shopId,
        isDeleted: false,
        isTopLevel: false,
        isVisible: true,
        slug: getSlug(TAG_SLUG),
        name: TAG_SLUG,
        displayTitle: "boxes",
        createdAt: now,
        updatedAt: now,
        heroMediaUrl: null,
        metafields: null
    };

    try {
        const { result } = await Tags.insertOne(tagInput);

        if (result.ok !== 1) {
            throw new ReactionError("server-error", "Unable to create tag");
        }

        await appEvents.emit("afterTagCreate", tagInput);

        return result;

    } catch ({ message }) {
        // Mongo duplicate key error.
        if (message.includes("E11000") && message.includes("slug")) {
            throw new ReactionError("error", `Slug ${tagInput.slug} is already in use`);
        }

        throw new ReactionError("error", message);
    }
}