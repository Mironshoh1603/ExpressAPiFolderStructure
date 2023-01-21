const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    procedure: {
      type: String,
      enum: ["import", "export"],
      required: true,
    },
    rejim: {
      type: String,
      required: true,
    },
    transport_nak: {
      type: String,
      required: true,
    },
    invoice: {
      type: String,
      required: true,
    },
    package_list: {
      type: String,
      required: true,
    },
    contract: {
      type: String,
      required: true,
    },
    certificate: {
      type: String,
      required: true,
    },
    extra_doc: {
      type: String,
      required: true,
    },
    image_product: {
      type: String,
      required: true,
    },
    tnvd: {
      type: Boolean,
      default: false,
    },
    sostav_doc: {
      type: Boolean,
      default: false,
    },
    prochie_doc: {
      type: String,
    },
    comments: [
      {
        user_id: {
          type: String,
        },
        text: {
          type: String,
        },
        created_at: {
          type: String,
          default: Date.now(),
        },
      },
    ],
    completed_file: {
      type: String,
    },
    facture_file: {
      type: String,
    },
    feedback: {
      text: {
        type: String,
      },
      rating: {
        type: Number,
        max: 5,
        min: 1,
      },
    },
    status: {
      code: {
        type: String,
        default: 404,
      },
      text: {
        type: String,
        default: "Not Seen",
      },

      documentStatus: {
        type: Boolean,
        default: true,
      },
    },
    client_id: {
      type: mongoose.Schema.ObjectId,
      ref: "userClients",
      required: true,
    },
    declarant_id: {
      type: mongoose.Schema.ObjectId,
      ref: "userAdmins",
      required: true,
    },
    accountant_id: {
      type: mongoose.Schema.ObjectId,
      ref: "userAdmins",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("documents", DocumentSchema);
module.exports = Document;
