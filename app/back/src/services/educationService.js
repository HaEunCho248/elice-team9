import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class educationService {
  static async addEducation({ user_id, school, major, position }) {
    
    // const educations = await Education.findAll({ user_id });
    // if(educations.length > 0) {
    //   const errorMessage = educations.map((educations) => {
    //       if(educations.school === school) {
    //           return "같은 이름의 학력내역이 있습니다."
    //       }
    //   });
    //   if(errorMessage[0] != undefined) {
    //       return errorMessage;
    //   }
    // }
    
    const newEducation = { user_id, school, major, position };
    const createdNewEducation = await Education.create({ newEducation });
    
    return createdNewEducation;
  }

  // static async getEducation({ user_id }) {
  //   const educations = await Education.findById({ user_id });

  //   return educations;
  // }
  
  static async getEducations({ user_id }) {
    const educations = await Education.findAll({ user_id });

    return educations;
  }

  static async setEducation({ object_id, toUpdate }) {
    let education = null;
    
    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update({ object_id, fieldToUpdate, newValue });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ object_id, fieldToUpdate, newValue });
    }

    if (toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      education = await Education.update({ object_id, fieldToUpdate, newValue });
    }

    return education;
  }

  static async delEducation({ object_id }) {
    const deleteEducation = await Education.delete({ object_id });
    // console.log(object_id, deleteEducation) // 디버깅 // undefined 
    return deleteEducation;
}
}

export { educationService };

