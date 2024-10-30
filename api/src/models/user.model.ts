import { InferSchemaType, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
      match: /^[\w\s\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]*$/,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 4,
      maxlength: 15,
      match: /^[a-zA-Z0-9_]+$/,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: { type: String, required: true, minlength: 6 },
    avatar: String,
    banner: String,
    bio: {
      type: String,
      maxlength: 150,
      trim: true,
    },
    location: {
      type: String,
      maxlength: 30,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

type User = InferSchemaType<typeof userSchema> & {
  matchPassword(enteredPassword: string): Promise<boolean>;
};

export default model<User>("User", userSchema);
