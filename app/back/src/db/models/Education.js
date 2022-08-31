import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  // static async findById({ user_id }) {
  //   const education = await EducationModel.findOne({ user_id });
  //   return education;
  // }

  static async findAll({ user_id }) {
    const educations = await EducationModel.find({ user_id });
    const education_list = educations.map((data)=>{
      return{
        object_id:data._id,
        user_id:data.user_id,
        school: data.school,
        major: data.major,
        position: data.position,
        startDate: data.startDate.substring(0,10),
        endDate: data.endDate.substring(0,10)
      }
    })
    return education_list;
    ;
  }

  static async update({ object_id, fieldToUpdate, newValue }) {
    const filter = { _id:object_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }
  static async delete({ object_id }) {
    const filter = { _id: object_id };
    const deleteEducation = await EducationModel.deleteOne(filter);
    return deleteEducation;
  }
}

export { Education };
