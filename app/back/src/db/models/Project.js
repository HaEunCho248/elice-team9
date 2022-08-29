import { ProjectModel } from "../schemas/project";

class Project {
    // 프로젝트 등록
    static async create({ newProject }) {
        const createNewProject = await ProjectModel.create(newProject);
        // console.log(createNewProject);
        return createNewProject;
    }

    // 특정 프로젝트 가져오기
    // static async findById({ object_id }) {
    //     const filter = { _id: object_id };
    //     const Project = await ProjectModel.findOne(filter);
    //     // console.log(Project);
    //     return {
    //         object_id: Project._id,
    //         user_id: Project.user_id,
    //         title: Project.title,
    //         description: Project.description,
    //         startDate: Project.startDate.substr(0, 10),
    //         endDate: Project.endDate.substr(0, 10)
    //     }
    // }

    // 모든 프로젝트 목록 가져오기
    static async findAll({ user_id }) {
        
        const filter = { user_id: user_id };
        const Projects = await ProjectModel.find(filter);
        // console.log(Projects);
        const project_list = Projects.map((data) => {   
            return {
                object_id: data._id,
                user_id: data.user_id,
                title: data.title,
                description: data.description,
                startDate: data.startDate.substr(0, 10),
                endDate: data.endDate.substr(0, 10)
            }
        });
        return project_list;
    }

    // 특정 프로젝트 편집
    static async update({  object_id, fieldToUpdate, newValue }) {
        const filter = { _id: object_id }
        const update = { [fieldToUpdate]: newValue } ;
        const option = { returnOriginal: false };
        const updateProject = await ProjectModel.findOneAndUpdate(
            filter,
            update,
            option
        )

        return updateProject;
    }

    // 특정 프로젝트 삭제
    static async delete({ object_id }) {
        const filter = { _id: object_id };
        const deleteProject = await ProjectModel.deleteOne(filter);
        // console.log(Project);
        return deleteProject;
    }
}

export { Project };