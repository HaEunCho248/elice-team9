import { Award } from "../db";

class awardService {
    // award 등록
    static async addAward({ user_id, title, description }) {
        const users = await Award.findAll({ user_id });
        
        if(users.length > 0) {
            const errorMessage = users.map(user => {
                if(user.title === title) {
                    return "같은 이름의 수상내역이 있습니다.";
                }
            });
            if(errorMessage[0] != undefined) {
                return errorMessage;
            }
        }
        
        const newAward = { user_id, title, description };
        const createNewAward = await Award.create({ newAward });
        
        return createNewAward;
    }

    // 특정 award 가져오기
    static async getAward({ object_id }) {
        const user = await Award.findById({ object_id });

        return user;
    }

    // award 리스트 가져오기
    static async getAwards({ user_id }) {
        const users = await Award.findAll({ user_id });

        return users;
    }

    // award 편집
    static async setAward({ object_id, toUpdate }) {
        let award = null;

        if(toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            award = await Award.update({ object_id, fieldToUpdate, newValue });
        }
        if(toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            award = await Award.update({ object_id, fieldToUpdate, newValue });
        }
        
        return award;
    }
    
    // award 삭제
    static async delAward({ object_id }) {
        const deleteAward = await Award.delete({ object_id });

        return deleteAward;
    }
}

export { awardService };