import SimpleSchema from "simpl-schema";

/**
 * @name ProductBundle
 * @memberof Schemas
 * @type {SimpleSchema}
 * @property {String} name optional
 * @property {String} description optional
 * @property {String} subtitle optional
 * @property {String} variantId optional
 * @property {Number} limit optional
 * @property {String} productId optional
 * @property {Object} pricing optional
 */
export const ProductBundle = new SimpleSchema({
    _id: {
        type: String,
        optional: true
    },
    name: {
        type: String,
        optional: true
    },
    description: {
        type: String,
        optional: true
    },
    subtitle: {
        type: String,
        optional: true
    },
    limit: {
        type: Number,
        optional: true
    },
    variantId: {
        type: String,
        optional: true
    },
    productId: {
        type: String,
        optional: true
    },
    shopId: {
        type: String,
        optional: true
    },
    price: {
        type: Number,
        optional: true,
    },
    compareAtPrice: {
        type: Number,
        optional: true
    }

})