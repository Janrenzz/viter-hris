import React from 'react'
import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router';

const NavigationAccordions = ({subNavList = [], item}) => {
    const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
    <button className="w-full px-4 py-1 hover:bg-gray-50/10 flex items-center gap-2 justify-between uppercase"
    onClick={()=>setIsOpen(!isOpen)}>
    <div className="flex items-center gap-2">{item.icon} {item.label} </div><FaChevronDown /></button>
    
    {isOpen && (
        <ul className='self-start pl-1 w-full'>
            {subNavList.map((item, key)=>{
                return <li key={key} className='w-full'>
                <Link to={item.path} className="block px-4 pl-10 py-1 hover:bg-gray-50/10 w-full">    
                {item.label}</Link></li>;
            })}
        </ul>
        )}
    </>
    );
};

export default NavigationAccordions
