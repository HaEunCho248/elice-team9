import React, { useState, useEffect } from "react";
import './LikeButton.css'
import {HeartOutlined, HeartFilled } from '@ant-design/icons';	//icons 모듈을 가져옴.

import * as Api from "../../api";

//react 클래스 컴포넌트 정의(뭘 받아올건지는 다시 한번 살펴보기)
function LikeButton({  portfolioOwnerId, setLikes }) {

     const [user,SetUser] = useState(null);
    //로그인된 해당 user가 하트를 눌렀는지 안눌렀는지 확인
    const [isChecked, setIsChecked] = useState(false);
    //다른 유저들과 내가 누른 좋아요 횟수를 체크해줌
    const [click, setClick] = useState(0);

    const user_id = portfolioOwnerId;

    //하트를 클릭할 때마다 발생하도록
    useEffect(() => {
         // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
        Api.get('users', portfolioOwnerId)
            .then((res) => {
                SetUser(res.data)
                return Api.get('likes', user_id);
            })
            .then((res) => {
                const likeList = res.data;
                likeList.forEach((like) => {
                    if(like.userId === user_id) setIsChecked(true);
                })
            })
    }, [click]);

    const clickHandler = (event) => {
        event.preventDefault();
        Api.post('like', { user_id: portfolioOwnerId})
                .then((res) => {
                    if(res.data.type === 'create') setIsChecked(true);
                    else if (res.data.type === 'delete') setIsChecked(false);
                    setClick(current => current + 1);
                })
                .catch((err) => console.log(err));

    }

    return(
        <div className="icons-list">
            {this.state.isChecked? 
                        <HeartFilled  className="button red" onClick={clickHandler}/> /* 꽉 차 있는 하트 */
                        :
                        <HeartOutlined  className="button" onClick={clickHandler}/> /* 비어 있는 하트 */
                    }
                    <h6>{/*좋아요 (몇)회*/}</h6>
        </div>
    )
}



export default LikeButton;
