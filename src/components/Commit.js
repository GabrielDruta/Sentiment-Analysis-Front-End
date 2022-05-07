import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebookF , } from '@fortawesome/free-brands-svg-icons';

export default function Commit({ data }) {

    console.log("data : ", data);






return (
    <div style={{ marginLeft: 60 }}>
        {data ? data.commentList.map((commit, index) => (


            <div  key={commit.id} >


                <div class="card list-group-item-dark" style={
                            commit.result === 'Positive' ? {  backgroundColor: '#c3e6cb' }
                          : commit.result === 'Negative' ? {  backgroundColor: '#f5c6ca' } : {  backgroundColor: '#c5c8ca' }
                            }
                            >
                        <div class="card-body" >
                            <h5 class="card-title">{commit.commentText}</h5>
                            <h2 class="card-subtitle mb-2 text-muted">{commit.result}</h2>
                           
                            <h5 class="card-title">Sentiment score: {commit.score.slice(-1)}</h5>

                            <a target="_blank" href={"https://www.facebook.com/"+commit.id} class="btn btn-primary"><FontAwesomeIcon icon={faFacebookF} /> Go to</a>

                        </div>
                </div>
            </div>


        )) :
            <div>
                  <div class="card list-group-item-dark" style={{backgroundColor: '#c5c8ca'}}>
                        <div class="card-body" >
                            <h5 class="card-title">Click on a post to view comments</h5>
                            <h6 class="card-subtitle mb-2 text-muted"></h6>
                            <h5 class="card-title"> </h5>
                        </div>
                </div>
            </div>}
    </div>
)

    // return (
    //     <div style={{ marginTop: 40 }}>
    //         {data ? data.commentList.map((commit, index) => (
    //             <div className='commitCompanent' key={commit.id} style={{height: 100}}>
    //                 <div style={{ width: '63%', padding: 22 }}><p>{commit.commentText}</p></div>
    //                 <div style={{ width: 1, height: '100%', backgroundColor: 'black' }}></div>
    //                 <div style={
    //                     commit.result === 'Positive' ? { width: '20%', padding: 22, backgroundColor: 'green' }
    //                         : commit.result === 'Negative' ? { width: '20%', padding: 22, backgroundColor: 'red' } :
    //                             { width: '20%', padding: 22, backgroundColor: 'grey' }
    //                 }><p>{commit.result}</p></div>
    //                 <div style={{ width: 1, height: '100%', backgroundColor: 'black' }}></div>
    //                 <div style={{ width: '20%', padding: 22 }}><p>{commit.score}</p></div>
    //             </div>
    //         )) :
    //             <div className='commitCompanent'>
    //                 <h3 style={{ padding: 22 }}></h3>
    //                 <p style={{ padding: 22 }}>Select post</p>
    //                 <div style={{ padding: 10 }}></div>
    //             </div>}
    //     </div>
    // )
}
