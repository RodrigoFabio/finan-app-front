"use client"
import { Link as LinkPage } from 'react-router-dom';
import {Link as ScrollLink} from 'react-scroll';
import Logo from '../Logo';

export default function Header() {
  return (
    <div className='header'>
        <Logo/>
        <nav className='nav'>         
          <li className='item'>DashBoard</li>
        </nav>
    </div>
  )
}
