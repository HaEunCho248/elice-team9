import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();

certificateRouter.post("/certificate/create", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요");
    }

    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;
    const acquisition_date = req.body.acquisition_date;
    
    // 위 데이터를 학력 db에 추가하기
    const newCertificate = await certificateService.addCertificate({
      user_id,
      title,
      description,
      acquisition_date,
    });
    
    if (newCertificate.errorMessage) {
      throw new Error(newCertificate.errorMessage);
    }

    res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.get(
  "/certificatelist/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const currentCertificateInfo = await certificateService.getCertificates({ user_id });
      if(currentCertificateInfo) {
        if (currentCertificateInfo.errorMessage) {
            throw new Error(currentCertificateInfo.errorMessage);
        }
        res.status(200).send(currentCertificateInfo);  
      }
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.put(
  "/certificates/:_id",
  login_required,
  async function (req, res, next) {
    try {
      const object_id = req.params._id;
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const acquisition_date = req.body.acquisition_date ?? null;

      const toUpdate = { title, description, acquisition_date };

      const updatedCertificate = await certificateService.setCertificate({ object_id, toUpdate });

      if(updatedCertificate.errorMessage) {
          throw new Error(updatedCertificate.errorMessage);
      }
      res.status(200).json(updatedCertificate);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.delete('/certificate/delete/:_id', login_required, async function(req, res, next) {
  try {
      const object_id = req.params._id;
      const fieldToDelete = await certificateService.delCertificate({ object_id });
      if (fieldToDelete.errorMessage) {
          throw new Error(fieldToDelete.errorMessage);
      }
      res.status(200).json(fieldToDelete);
  } catch(error) {
      next(error);
  }
});

export { certificateRouter };
