import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";

const awardRouter = Router();
// award 등록
awardRouter.post('/award', login_required, async function(req, res, next) {
    try {
        if(is.emptyObject(req.body)) {
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
        }

        const user_id = req.body.user_id;
        const title = req.body.title;
        const description = req.body.description;
        const changedAwardedDate = req.body.changedAwardedDate;
        const newAward = await awardService.addAward({
            user_id,
            title,
            description,
            changedAwardedDate,
        });

        if (newAward.errorMessage) {
            throw new Error(newAward.errorMessage);
        }
        
        res.status(201).json(newAward);
    } catch(error) {
        next(error);
    }
});

// award 리스트 가져오기
awardRouter.get(
    "/awards/:user_id",
    login_required,
    async function (req, res, next) {
      try {
        const user_id = req.params.user_id;
        const currentAwardInfo = await awardService.getAwards({ user_id });
        if(currentAwardInfo) {
            if (currentAwardInfo.errorMessage) {
                throw new Error(currentAwardInfo.errorMessage);
            }
            res.status(200).send(currentAwardInfo);  
        }
      } catch (error) {
        next(error);
      }
    }
  );

// award 편집
awardRouter.put('/award/:object_id', login_required, async function(req, res, next) {
    try {
        const object_id = req.params.object_id;
        const title = req.body.title ?? null;
        const description = req.body.description ?? null;
        const changedAwardedDate = req.body.changedAwardedDate;
        const toUpdate = { title, description, changedAwardedDate };
        const updatedAward = await awardService.setAward({ object_id, toUpdate });
        if(updatedAward.errorMessage) {
            throw new Error(updatedAward.errorMessage);
        }
        res.status(200).json(updatedAward);
    } catch(error) {
        next(error);
    }
});

// award 삭제
awardRouter.delete('/awards/:object_id', login_required, async function(req, res, next) {
    try {
        const object_id = req.params.object_id;
        
        const deleteAward = await awardService.delAward({ object_id });
        
        if (deleteAward.errorMessage) {
            throw new Error(deleteAward.errorMessage);
        }
        res.status(200).json(deleteAward);
    } catch(error) {
        next(error);
    }
});

export { awardRouter };