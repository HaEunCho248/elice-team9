import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class certificateService {
  static async addCertificate({ user_id, title, description, acquisition_date }) {
    
    const user = await Certificate.findAll({ user_id });
   
    const id = user_id;
   
    const newCertificate = { user_id, title, description, acquisition_date };
    const createdNewCertificate = await Certificate.create({ newCertificate });
    
    return createdNewCertificate;
  }

  static async getCertificate_id({ object_id }) {
    const user = await Certificate.findById({ _id: object_id });

    return user;
  }
  static async getCertificate({ user_id }) {
    const user = await Certificate.findById({ user_id });

    return user;
  }
  
  static async getCertificates({ user_id }) {
    const user = await Certificate.findAll({ user_id });

    return user;
  }

  static async setCertificate({ object_id, toUpdate }) {
    let certificate = null;
    
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      certificate = await Certificate.update({ object_id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      certificate = await Certificate.update({ object_id, fieldToUpdate, newValue });
    }

    if (toUpdate.acquisition_date) {
      const fieldToUpdate = "acquisition_date";
      const newValue = toUpdate.acquisition_date;
      certificate = await Certificate.update({ object_id, fieldToUpdate, newValue });
    }

    return certificate;
  }

  static async delCertificate({ object_id }) {
    const user = await Certificate.delete({ object_id });

    return user;
}
}

export { certificateService };

