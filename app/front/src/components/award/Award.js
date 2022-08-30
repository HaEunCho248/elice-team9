import React, { useState } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

// 수상이력 목록, 목록수정, 계정확인을 props로 받아옴
function Award({ award, setAwards, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <AwardEditForm
          currentAward={award}
          setAwards={setAwards}
          setIsEditing={setIsEditing}
        />
      ) : (
        <AwardCard
          award={award}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setAwards = {setAwards}
        />
      )}
    </>
  );
}

export default Award;
