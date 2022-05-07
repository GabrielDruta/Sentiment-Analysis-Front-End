import React, { useState, useEffect } from 'react'
import Post from './Post'
import Commit from './Commit'
import commentManager from '../services/commit.service';

export default function Explore({DATA}) {

    const [postId, setPostId] = useState();

    const onPress = (id) => {
        console.log("id : ", id);
        setPostId(id);
    };

    const match = (element) => {
        return element.id === postId;
    };
 
    const commit = DATA ? (DATA.commentList.find(match)):(undefined);
          
    return DATA ? (
        <>
            <div className='post'>
                <div className='pane'>
                    <Post
                        postId={postId}
                        data={DATA}
                        onClick={onPress} /> 
                </div>

                <div className='pane'>
                    <Commit data={commit} />
                </div>
            </div>
        </>
    ) : (
    <div>
        <p>Loading ...</p>
    </div>
    )
}
