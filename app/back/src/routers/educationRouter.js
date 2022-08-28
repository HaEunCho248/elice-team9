import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();

educationRouter.post("/education/create", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요");
    }

    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const school = req.body.school;
    const major = req.body.major;
    const position = req.body.position;
    
    // 위 데이터를 학력 db에 추가하기
    const newEducation = await educationService.addEducation({
      user_id,
      school,
      major,
      position,
    });
    
    if (newEducation.errorMessage) {
      throw new Error(newEducation.errorMessage);
    }

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.get(
  "/educationlist/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const currentEducationInfo = await educationService.getEducations({ user_id });
      if(currentEducationInfo) {
        if (currentEducationInfo.errorMessage) {
            throw new Error(currentEducationInfo.errorMessage);
        }
        res.status(200).send(currentEducationInfo);  
      }
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.put(
  "/educations/:id",
  login_required,
  async function (req, res, next) {
    try {
      
      const user_id = req.params.id;
      const schoolHidden = req.body.schoolHidden ?? null;
      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const position = req.body.position ?? null;

      const toUpdate = { school, major, position };

      const user = await educationService.getEducations({ user_id });
      const _id = user.map(user => {
        if(user.school === schoolHidden) {
            return user._id;
        }
      })

      const updatedEducation = await educationService.setEducation({ _id, toUpdate });

      if(updatedEducation.errorMessage) {
          throw new Error(updatedEducation.errorMessage);
      }
      res.status(200).json(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.post('/education/delete/:id', login_required, async function(req, res, next) {
  try {
      const _id = req.params.id;
      const fieldToDelete = await educationService.delEducation({ _id });
      if (fieldToDelete.errorMessage) {
          throw new Error(fieldToDelete.errorMessage);
      }
      res.status(200).json(fieldToDelete);
  } catch(error) {
      next(error);
  }
});

export { educationRouter };
