import pkg from "../package.json";
import resolvers from "./resolvers/index.js";
import schemas from "./schemas/index.js";
import queries from "./queries/index.js";
import mutations from "./mutations/index.js";
import i18n from "./i18n/index.js";
import startup from "./startup.js";

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "Product Boxes",
    name: "product-boxes",
    version: pkg.version,
    i18n,
    collections: {
      Bundles: {
        name: "Bundles"
      }
    },
    functionsByType:{
      startup: [startup]
    },
    graphQL: {
      resolvers,
      schemas
    },
    queries,
    mutations
  });
}
