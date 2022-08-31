import React, { useState, useEffect } from "react";
import './LikeButton.css'
import {HeartOutlined, HeartFilled} from '@ant-design/icons';	//icons 모듈을 가져옴.

class LikeButton extends React.Component{
    state = {
        isChecked: false, //하트가 체크 되어있는지 확인하는 state
        notice: ' ', //좋아요 몇회인지를 표현하기 위한 state
    };
    //버튼을 클릭 시
    onClick = () => {
        this.state.isChecked? //isChecked가 true면 (하트를 빨간색 -> 빈 하트)
        this.setState({
            isChecked:false, //isChecked를 false로 초기화
            notice:'', //알림 안뜨게 초기화
        })
        :
        this.setState({
            isChecked:true, //isChecked를 true로 초기화
            notice:'좋아요 1회', //알림 나오게 설정
        });
    }
    render(){
        return(
            <React.Fragment>
                <div className="icons-list">
                    {this.state.isChecked? 
                        <HeartFilled  className="button red" onClick={this.onClick}/> /* 꽉 차 있는 하트 */
                        :
                        <HeartOutlined  className="button" onClick={this.onClick}/> /* 비어 있는 하트 */
                    }
                    <h6>{this.state.notice}</h6>
                </div>
            </React.Fragment>
        )
    }
}

export default LikeButton;
