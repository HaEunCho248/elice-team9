import React, { useState } from "react";
import CertificateCard from "./CertificateCard";
import CertificateEditForm from "./CertificateEditForm";

<<<<<<< HEAD
function Certificate ({ certificate , setCertificates, isEditable }) {
=======
function Certificate({ certificate, setCertificates, isEditable }) {
>>>>>>> a88340f01b38224b7ab79170fec9ca27d1a7f2c4
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <CertificateEditForm
<<<<<<< HEAD
          currentCertificate ={Certificate }
=======
          currentCertificate={certificate}
>>>>>>> a88340f01b38224b7ab79170fec9ca27d1a7f2c4
          setCertificates={setCertificates}
          setIsEditing={setIsEditing}
        />
      ) : (
        <CertificateCard
<<<<<<< HEAD
          certificate ={certificate }
          isEditable={isEditable}
          setIsEditing={setIsEditing}
=======
          certificate={certificate}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setCertificates = {setCertificates}
>>>>>>> a88340f01b38224b7ab79170fec9ca27d1a7f2c4
        />
      )}
    </>
  );
}

<<<<<<< HEAD
export default Certificate ;
=======
export default Certificate;
>>>>>>> a88340f01b38224b7ab79170fec9ca27d1a7f2c4
