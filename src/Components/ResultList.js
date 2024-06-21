import React from "react";

const ResultList = (str) => {
    console.log(`str? >>> `, str);
    const placeName = str.place_name;
    const addName = str.address_name;
    const categoryName = str.category_name ? str.category_name.split(">")[1] : "";
    const phoneNum = str.phone !== "" ? str.phone : "정보 없음";
    console.log(`placeName? >>> `, placeName);
    console.log(`addName? >>> `, addName);
    console.log(`categoryName? >>> `, categoryName);
    console.log(`phoneNum? >>> `, phoneNum);

    return(
        <>
        </>
    )
}

export default ResultList;