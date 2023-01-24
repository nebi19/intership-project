import React from 'react'
const activeBar={
    height: 56,
    width: 3,
    backgroundColor: '#DDE2FF',
    position: 'absolute',
    left: 0
}
const activeContainer= {
    backgroundColor: 'rgba(221,226,255, 0.08)'
}
const activeTitle= {
    color: '#DDE2FF'
}
const container= {
    height: 56,
    cursor: 'pointer',
    ':hover': {
        backgroundColor: 'rgba(221,226,255, 0.08)'
    },
    paddingLeft: 32,
    paddingRight: 32
}
const title= {
    fontFamily: 'Muli',
    fontSize: 16,
    lineHeight: '20px',
    letterSpacing: '0.2px',
    color: '#A4A6B3',
    marginLeft: 24
}
function MenuItemComponent(props) {
    const { active,   title, ...otherProps } = props;
  
    return (
        <li className={active?' list-group-item bg-light  nav-pills border-0 flex-fill justify-content-start ':
        'justify-content-start flex-fill text-sm-center nav-link border-0 pl-auto list-group-item'}  style={{border:'0px'}}>
         
            {title==='Mail'&&<i opacity={!active && "0.4"}></i>
            ||title==='Market'&&<i opacity={!active && "0.4"}></i>
            ||title==='Catagory'&&<i  opacity={!active && "0.4"}></i>
             }
            <span className={title, active &&activeTitle}>{title}</span>
        </li>
    );
}
export default MenuItemComponent;