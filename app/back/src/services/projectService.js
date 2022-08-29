import { Project } from "../db";

class projectService {
    // 프로젝트 생성
    static async addProject({ userId, projectData }) {
        const projects = await Project.findAll({ userId });
        console.log(projectData)
        if(projects.length > 0) {
            const errorMessage = projects.map((project) => {
                if(project.title === projectData.title) {
                    return "같은 이름의 프로젝트가 있습니다.";
                }
            });
            if(errorMessage[0] != undefined) {
                return errorMessage;
            }
        }
        
        const newProject = { userId, ...projectData };
        const createProject = await Project.create({ newProject });
        return createProject;
    }

    // 프로젝트 리스트 가져오기
    static async getProjects({ userId }) {
        const projects = await Project.findAll({ userId });
            
        return projects;
    }

    // 프로젝트 편집
    static async setProject({ objectId, toUpdate }) {
        let updateProject = null;
        console.log(toUpdate)
        if(toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title
            updateProject = await Project.update({ objectId, fieldToUpdate, newValue });
        }
        if(toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description
            updateProject = await Project.update({ objectId, fieldToUpdate, newValue });
        }
        if(toUpdate.startDate) {
            const fieldToUpdate = "startDate";
            const newValue = toUpdate.startDate
            updateProject = await Project.update({ objectId, fieldToUpdate, newValue });
        }
        if(toUpdate.endDate) {
            const fieldToUpdate = "endDate";
            const newValue = toUpdate.endDate
            updateProject = await Project.update({ objectId, fieldToUpdate, newValue });
        }
        
        return updateProject;
    }

    // 프로젝트 삭제
    static async delProject({ objectId }) {
        const deleteProject = await Project.delete({ objectId });

        return deleteProject
    }
    
}

export { projectService };