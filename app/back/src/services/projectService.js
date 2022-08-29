import { Project } from "../db";

class projectService {
    // 프로젝트 생성
    static async addProject({ user_id, projectData }) {

        // const projects = await Project.findAll({ user_id });
        // if(projects.length > 0) {
        //     const errorMessage = projects.map((project) => {
        //         if(project.title === projectData.title) {
        //             return "같은 이름의 프로젝트가 있습니다.";
        //         }
        //     });
        //     if(errorMessage[0] != undefined) {
        //         return errorMessage;
        //     }
        // }
        
        const newProject = { user_id, ...projectData };
        const createProject = await Project.create({ newProject});

        return createProject;
    }

    // 프로젝트 리스트 가져오기
    static async getProjects({ user_id }) {
        const projects = await Project.findAll({ user_id });

        return projects;
    }

    // 프로젝트 편집
    static async setProject({ object_id, toUpdate }) {
        let updateProject = null;
        
        if(toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title
            updateProject = await Project.update({ object_id, fieldToUpdate, newValue });
        }
        if(toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description
            updateProject = await Project.update({ object_id, fieldToUpdate, newValue });
        }
        if(toUpdate.startDate) {
            const fieldToUpdate = "startDate";
            const newValue = toUpdate.startDate
            updateProject = await Project.update({ object_id, fieldToUpdate, newValue });
        }
        if(toUpdate.endDate) {
            const fieldToUpdate = "endDate";
            const newValue = toUpdate.endDate
            updateProject = await Project.update({ object_id, fieldToUpdate, newValue });
        }
        
        return updateProject;
    }

    // 프로젝트 삭제
    static async delProject({ object_id }) {
        const deleteProject = await Project.delete({ object_id });

        return deleteProject
    }
}

export { projectService };