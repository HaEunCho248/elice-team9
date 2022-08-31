import { AwardModel } from "../schemas/award";

class Award {
    // Award 데이터 생성
    static async create({ newAward }) {
        const createNewAward = await AwardModel.create(newAward);
        
        return "createAwardSuccess";
    }

    // 특정 Award 데이터 가져오기
    // static async findById({ user_id }) {
    //     const Award = await AwardModel.findOne({user_id: user_id});

    //     return {
    //         object_id: Award._id,
    //         user_id: Award.user_id,
    //         title: Award.title,
    //         description: Award.description,
    //         awardDate: Award.awardDate.substr(0, 10)
    //     };
    // }

    // Award 데이터 전부 가져오기
    static async findAll({ user_id }) {
        const Awards = await AwardModel.find({user_id: user_id},);
        const award_list = Awards.map((data) => {
            return {
                object_id: data._id,
                user_id: data.user_id,
                title: data.title,
                description: data.description,
                awardDate: data.awardDate.substr(0, 10)
            };
        });
        
        return award_list;
    }

    // Award 데이터 업데이트
    static async update({ object_id, fieldToUpdate, newValue }){
        const filter = { _id: object_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };
        const updatedAward = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        
        return "updateAwardSuccess";
    }

    // Award 데이터 삭제
    static async delete({ object_id }) {
        const filter = { _id: object_id };
        const Award = await AwardModel.deleteOne(filter);

        return "deleteAwardSuccess";
    }
}


export { Award };