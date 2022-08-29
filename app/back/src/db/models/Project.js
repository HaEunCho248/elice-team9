import { ProjectModel } from "../schemas/project";

class Project {
    // 프로젝트 등록
    static async create({ newProject }) {
        const createNewProject = await ProjectModel.create(newProject);

        return "create_project_success";
    }

    // 특정 프로젝트 가져오기
    static async findById({ objectId }) {
        const filter = { _id: objectId };
        const Project = await ProjectModel.findOne({ filter });
        return {
            objectId: Project._id,
            userId: Project.userId,
            title: Project.title,
            description: Project.description,
            startDate: Project.startDate,
            endDate: Project.endDate
        }
    }

    // 모든 프로젝트 목록 가져오기
    static async findAll({ userId }) {
        const filter = { userId: userId };
        const Projects = await ProjectModel.find({ filter });
        const project_list = Projects.map((data) => {
            return {
                objectId: data._id,
                userId: data.userId,
                title: data.title,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate
            }
        });
        return project_list;
    }

    // 특정 프로젝트 편집
    static async update({  objectId, filedToUpdate, newValue }) {
        const filter = { _id: objectId }
        const update = { [filedToUpdate]: newValue } ;
        const option = { returnOriginal: false };
        const updateProject = await ProjectModel.findOneAndUpdate(
            filter,
            update,
            option
        )

        return updateProject;
    }

    // 특정 프로젝트 삭제
    static async delete({ objectId }) {
        const filter = { _id: objectId };
        const Project = await ProjectModel.remove({ filter });

        return "delete_project_success";
    }
}

export { Project };