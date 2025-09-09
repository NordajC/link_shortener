const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    urls: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Url",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  //checks if user has been changed or is new
  if (this.isModified("password") === true) {
    const salt = await bcrypt.genSalt(10); //generates a random string that gets mixed in with the password. ensures that even if passwords are the same between different users that the hash is different

    // updates the password saved in the db with a hashed version. hash function takes in 2 args. the password and the salt string to generate a hashed password
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User; //exports user module so you can access it outside this file
