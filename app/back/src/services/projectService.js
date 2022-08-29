import { Project } from "../db";

class projectService {
    static async addProject({ userId, title, description }) {
        const users = await Project.findAll({ userId });

        if(userId.length > 0) {
            const errorMessage = users.map((user) => {
                if(user.title === title) {
                    return "같은 이름의 프로젝트가 있습니다.";
                }
            });
            if(errorMessage[0] != undefined) {
                return errorMessage;
            }
        }
        
        const newProject = { userId, title, description };
        const createProject = await Project.create({ newProject });
        return createProject;
    }

    static async getProjects({ userId }) {
        const projects = await Project.findAll({ userId });
            
        return projects;
    }

    static async setProject({ objectId, toUpdate }) {
        let updateProject = null;

        if(toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title
            updateProject = await Project.update({ objectId, fieldToUpdate, newValue });
        }
        if(toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.title
            updateProject = await Project.update({ objectId, fieldToUpdate, newValue });
        }
        if(toUpdate.satrtDate) {
            const fieldToUpdate = "satrt_date";
            const newValue = toUpdate.title
            updateProject = await Project.update({ objectId, fieldToUpdate, newValue });
        }
        if(toUpdate.endDate) {
            const fieldToUpdate = "end_date";
            const newValue = toUpdate.title
            updateProject = await Project.update({ objectId, fieldToUpdate, newValue });
        }
        
        return updateProject;
    }

    static async delProject({ objectId }) {
        const deleteProject = await Project.delete({ objectId });

        return deleteProject
    }
    
}

export { projectService };