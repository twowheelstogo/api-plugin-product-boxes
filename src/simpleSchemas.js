import SimpleSchema from "simpl-schema";

/**
 * @name ProductBundle
 * @memberof Schemas
 * @type {SimpleSchema}
 * @property {String} name optional
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
    limit: {
        type: Number,
        optional: true
    },
    pricing: {
        type: Object,
        blackbox: true,
        optional: true
    },
    productId: {
        type: String,
        optional: true
    },
    shopId: {
        type: String,
        optional: true
    }
})