const { createHmac, randomBytes, generateKey } = require("crypto");
const { Schema, model } = require("mongoose");
const { createTokenForUser } = require("../services/auth");
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/1.jpeg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedpassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashedpassword;
  next();
});
userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("user not fount");
  const salt = user.salt;
  const hashedpassword = user.password;
  const userProvideHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  if (hashedpassword !== userProvideHash) throw new Error("Incorrect Password");
  const token =createTokenForUser(user);
  return token;
});

const User = model("user", userSchema);
module.exports = User;
