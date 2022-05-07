import React from 'react'

import { BiCategory } from 'react-icons/bi';
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBook,FaUserAlt } from 'react-icons/fa';

export const sidebarData = [
    {
        title :'Dashboard',
        path :'/admin',
        icon :<AiOutlineDashboard/>,
        cName :'nav-text'
    },
    {
        title :'Books',
        path :'/admin/books',
        icon :<FaBook/>,
        cName :'nav-text'
    },
    {
        title :'Categories',
        path :'/admin/categories',
        icon :<BiCategory/>,
        cName :'nav-text'
    },
    {
        title :'Users',
        path :'/admin/users',
        icon :<FaUserAlt/>,
        cName :'nav-text'
    },


]
    
