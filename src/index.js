import pkg from "../package.json";
import resolvers from "./resolvers/index.js";
import schemas from "./schemas/index.js";
import queries from "./queries/index.js";
import mutations from "./mutations/index.js";
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
    collections: {
      Bundles: {
        name: "Bundles"
      }
    },
    graphQL: {
      resolvers,
      schemas
    },
    queries,
    mutations
  });
}
