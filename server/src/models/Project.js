import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    repoId: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      required: false,
    },

    private: {
      type: Boolean,
      default: false,
    },

    htmlUrl: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      default: "Unknown",
    },

    updatedAtGithub: {
      type: Date,
      required: false,
    },

    defaultBranch: {
      type: String,
      required: false,
    },

    owner: {
      type: String,
      required: true,
      default:null
    },
      // Repository Configuration
    targetDomain: {
      type: String,
      default: "",
      // trim: true,
    },

    globalTestInstructions: {
      type: String,
      default: "",
      // trim: true,
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);