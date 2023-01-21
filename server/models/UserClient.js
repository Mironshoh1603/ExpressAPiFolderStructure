const mongoose = require("mongoose");

const UserClientSchema = new mongoose.Schema({
  eimzoId: {
    type: String,
    required: true,
  },
});

const UserClient = mongoose.model("userClients", UserClientSchema);
module.exports = UserClient;
