import React from "react";
export default function like(props) {
    const {likedProuductId}=props.like
    console.log('props from like',props)
    console.log('likeprouductid from like',likedProuductId)
    if(likedProuductId.localeCompare(props.imageId)){
        return(
            <div>

            </div>
        )
    }

}