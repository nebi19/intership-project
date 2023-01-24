import React from 'react'
import {usersEmail} from '../data/data'
import Email from './email'
class DashBoard extends React.Component{
    render (){
        console.log('userdata',usersEmail)
        return(
            <div className='row'>
                <div className='col-lg-7 col-sm-12 border'> 
                {usersEmail&&usersEmail.map(item=><Email data={item}/>)}
                </div>
                <div className='col-lg-5 border'> 
                <div className='row p-3 border'>
                    {/* <Email/> */}
                    {/* {usersEmail&&usersEmail.map(item=><Email data={item}/>)} */}

                </div>
                <div className='row p-3 border'>
                 {/* <Email/> */}
                 {/* {usersEmail&&usersEmail.map(item=><Email data={item}/>)} */}

                </div>
                </div>
            </div>

        )
    }
}
export default DashBoard;