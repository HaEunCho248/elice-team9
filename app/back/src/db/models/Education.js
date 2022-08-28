import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findById({ user_id }) {
    const education = await EducationModel.findOne({ user_id });
    return education;
  }

  static async findAll({ user_id }) {
    const educations = await EducationModel.find({ user_id });
    return educations;
  }

  static async update({ _id, fieldToUpdate, newValue }) {
    const filter = { _id: _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }
}

export { Education };
