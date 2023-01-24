import React from 'react';
import Comment from "./Comment";
 const commentList=({comments,imageId,profile})=>{   
  //  console.log('profileprofileprofilekk',profile.photo)
    return (
        <div className="commentList">
          { comments && comments.map((comment)=>(
              <Comment profile={profile} comment={comment} key={comment.id} imageId={imageId} />
            ))}    
        </div>
      );
}
export default commentList;
// profile
// profile
// profile
// profile
