const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'Admin', required: true },
  // number: {
  //   type: Number,
  //   required: true,
  // },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: true,
    autopopulate: true,
  },
  rider: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['ontime', 'late', 'sent', 'refunded', 'cancelled', 'on hold'],
    default: 'ontime',
  },
  date: {
    type: Date,
    required: true,
  },
  // expiredDate: {
  //   type: Date,
  //   required: true,
  // },
  // notes: {
  //   type: String,
  // },
  // label: {
  //   type: String,
  //   required: true,
  // },

  // year: {
  //   type: Number,
  //   required: true,
  // },
  content: String,
  recurring: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'annually', 'quarter'],
  },
  // date: {
  //   type: Date,
  //   required: true,
  // },
  // expiredDate: {
  //   type: Date,
  //   required: true,
  // },
  converted: {
    from: {
      type: String,
      enum: ['quote', 'offer'],
    },
    offer: {
      type: mongoose.Schema.ObjectId,
      ref: 'Offer',
    },
    quote: {
      type: mongoose.Schema.ObjectId,
      ref: 'Quote',
    },
  },
  // subTotal: {
  //   type: Number,
  //   default: 0,
  // },
  // taxTotal: {
  //   type: Number,
  //   default: 0,
  // },
  // total: {
  //   type: Number,
  //   default: 0,
  // },
  // credit: {
  //   type: Number,
  //   default: 0,
  // },
  // discount: {
  //   type: Number,
  //   default: 0,
  // },
  // payment: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'Payment',
  //   },
  // ],
  // paymentStatus: {
  //   type: String,
  //   default: 'unpaid',
  //   enum: ['unpaid', 'paid', 'partially'],
  // },
  // isOverdue: {
  //   type: Boolean,
  //   default: false,
  // },
  // approved: {
  //   type: Boolean,
  //   default: false,
  // },
  // notes: {
  //   type: String,
  // },
  // status: {
  //   type: String,
  //   enum: ['ontime', 'late', 'sent', 'refunded', 'cancelled', 'on hold'],
  //   // enum: ['draft', 'pending', 'sent', 'refunded', 'cancelled', 'on hold'],
  //   default: 'ontime',
  // },
  // pdf: {
  //   type: String,
  // },
  // files: [
  //   {
  //     id: String,
  //     name: String,
  //     path: String,
  //     description: String,
  //     isPublic: {
  //       type: Boolean,
  //       default: true,
  //     },
  //   },
  // ],
  updated: {
    type: Date,
    default: Date.now,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

invoiceSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Invoice', invoiceSchema);
