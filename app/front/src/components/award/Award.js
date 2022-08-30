import React, { useState } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

function Award({ award, setAwards, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  console.log(`award 콘솔:`, award);

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
        />
      )}
    </>
  );
}

export default Award;
