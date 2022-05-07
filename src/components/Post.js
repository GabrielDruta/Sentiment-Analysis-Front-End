import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebookF , } from '@fortawesome/free-brands-svg-icons';

export default function post({postId, data, onClick = () => { } }) {
    
    function CommentPercent(arr){
        
        let pos = 0,neg = 0,nat = 0;
        for (let index = 0; index < arr.length; index++) {
            switch (arr[index].result) {
                case "Positive":
                pos++;
                    break;

                case "Negative":
                neg++;
                    break;
                
                default:
                nat++;
                    break;
            }
        }
        let percentile = 100/arr.length;
        let posPercentli = pos * percentile;
        let negPercentle = neg * percentile;
        let natPercentle = nat * percentile;

        return [posPercentli,negPercentle,natPercentle]
    }


    function getStringPercent(arr){
        console.log("arr ", arr)
        let result = "",pos ="",neg="",nat="";
        if(arr[0]){
            console.log("statment ",arr[0])
            pos =+ arr[0].toFixed(2)+ "% Positive,";
        }

        if(arr[1]){
            console.log("statment ",arr[0])
             neg =+ arr[1].toFixed(2)+"% Negative,";
        }

        if(arr[2]){
            console.log("statment ",arr[0] )
             nat =+ arr[2].toFixed(2)+"% Neutral";
        }
        console.log("result "+ pos +" "+neg+" "+nat)

        return pos +" "+neg+" "+nat;
    }

  function getActive(getId){
        if(getId==postId){
            return {width: 550, background:"#333"}
        }else{
            return {width: 550, background:"#3b5998"}
        }
    }
    


return (
    <div >
        {data.commentList.map((post, index) => (
            
            <button class="post-button"  style={{borderWidth: 15}} onClick={() => onClick(post.id)} key={post.id}>

                <div class="card" style={getActive(post.id)}>
                <h5 class="card-header" style={{background:"#8b9dc3",fontSize:25}}>{post.commentText}</h5>
                <div class="card-body" style={{background:"#dfe3ee"}} >
                    <h5 class="card-title"> <div >{post.commentList.length} comments </div> {post.commentList ? ( getStringPercent((CommentPercent(post.commentList))) ): (null)} </h5>

                   
        
                </div>
                </div>
          
            </button>



        )
        )}
    </div>
)

}
