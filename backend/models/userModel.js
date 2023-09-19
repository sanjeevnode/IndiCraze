import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      default: " ",
    },
    state: {
      type: String,
      default: " ",
    },
    city: {
      type: String,
      default: " ",
    },
    pincode: {
      type: String,
      default: " ",
    },
    address: {
      type: String,
      default: " ",
    },
    orderHistory: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
