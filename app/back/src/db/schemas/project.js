import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            default: "",
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
    },
    {
        titmestamps: true,
    }
)

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };