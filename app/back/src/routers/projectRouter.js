import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const projectRouter = Router();

// 프로젝트 등록
projectRouter.post("/project/create", async (req, res, next) => {
    try {
        
        if(is.emptyObject(req.body)) {
            throw new Error("header의 Content-Tpye을 application/json으로 설정해주세요");
        }
        
        const userId = req.body.userId;
        const title = req.body.title;
        const description = req.body.description;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const projectData = {
            title,
            description,
            startDate,
            endDate
        }
        const newProject = await projectService.addProject({
            userId,
            projectData
        });

        if(newProject.errorMessage) {
            throw new Error(newProject.errorMessage);
        }
        res.status(201).json(newProject);
    } catch(err) {
        next(err);
    }
});

// 프로젝트 목록 가져오기
projectRouter.get("/projectlist/:userId", login_required, async (req, res, next) => {
    try {
            const userId = req.params.userId;
            const currentProjectInfo = await projectService.getProjects({ userId });
            if(currentProjectInfo.errorMessage) {
                throw new Error(currentProjectInfo.errorMessage);
            }

        res.status(200).json(currentProjectInfo);
    } catch(err) {
        next(err);
    }
})

// 특정 프로젝트 편집
projectRouter.put("/projects/:objectId", login_required, async (req, res, next) => {
    try {
        const objectId = req.params.objectId;
        const title = req.body.title ?? null;
        const description = req.body.description ?? null;
        const startDate = req.body.startDate ?? null;
        const endDate = req.body.endDate ?? null;
        const toUpdate = { title, description, startDate, endDate };

        const updateProject = await projectService.setProject({ objectId, toUpdate });

        if(updateProject.errorMessage) {
            throw new Error(updateProject.errorMessage);
        }

        res.status(200).json(updateProject);
    } catch(err) {
        next(err);
    }
})

// 특정 프로젝트 삭제
projectRouter.post("/project/delete", login_required, async (req, res, next) => {
    try {
        const objectId = req.body.objectId;
        const deleteProject = await projectService.delProject({ objectId });
        if (deleteProject.errorMessage) {
            throw new Error(deleteProject.errorMessage);
        }
        res.status(200).json(deleteProject);
    } catch(err) {
        next(err);
    }
})

export { projectRouter };