import React from 'react';
import ProfileComponent from './profileComponent'
import MenuItemComponent from './menuItemComponent'
import {Link} from 'react-router-dom'
function SidebarComponent(props) {
    return (
        <div className='justify-content-center '>
            <ProfileComponent/>
            <ul  className="list-group mx-auto nav-pills nav-fill  ">
                
            <button className=' d-flex justify-content-start bg-white  border justify-content-start p-0 m-0'
                    onClick={() => props.onChange('Messages')} style={{border :'2 px solid green'}} >
                    <MenuItemComponent
                        title="Mail"
                        active={props.selectedItem === 'Mail'}
                    />
                </button>
                <button className=' d-flex justify-content-start bg-white  border justify-content-start p-0 m-0'
                    onClick={() => props.onChange('CatagoryAdd')} style={{border :'2 px solid green'}} >
                    <MenuItemComponent
                        title="Catagory"
                        active={props.selectedItem === 'Catagory'}
                    />
                </button> 
                <button className=' d-flex justify-content-start bg-white  border justify-content-start p-0 m-0'
                    onClick={() => props.onChange('SetMarket')} style={{border :'2 px solid green'}} >
                    <MenuItemComponent
                        title="Market"
                        active={props.selectedItem === 'Market'}
                    />
                </button> 
                          
            </ul>
        </div>
    );
}

export default SidebarComponent;