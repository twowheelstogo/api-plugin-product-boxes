import insertTagUtil from "./utils/insertTag.js";

const TAG_SLUG = "boxes";

/**
 * @summary Called on startup
 * @param {Object} context Startup context
 * @returns {undefined}
 */

export default async function bundlesStartup(context) {
    const { collections } = context;

    const { Shops, Tags } = collections;

    const primaryShop = await Shops.findOne({ shopType: "primary" });

    if (!primaryShop) return;

    const currentTag = await Tags.findOne({
        shopId: primaryShop._id,
        slug: TAG_SLUG
    });

    if (currentTag) return;

    await insertTagUtil(context, { shopId: primaryShop._id })

    return;
}