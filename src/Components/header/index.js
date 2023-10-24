import React, { useState } from 'react';
import styles from './header.module.scss';
import Logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const MenuList = [
    {
        id: 1,
        name: 'Home',
        path: '/',
        children: [],
    },
    {
        id: 2,
        name: 'Services',
        path: '/services',
        children: [
            {
                name: 'Child One',
                path: '/'
            },
            {
                name: 'Child Two',
                path: '/'
            },
            {
                name: 'Child Three',
                path: '/'
            },
        ],
    },
    {
        id: 3,
        name: 'Pricing',
        path: '/pricing',
        children: [],
    },
    {
        id: 4,
        name: 'About',
        path: '/about',
        children: [],
    },
    {
        id: 5,
        name: 'Get Started',
        path: '/login',
        children: [],
    },
]

const Header = (props) => {
    const navigate = useNavigate();
    const [activeMenus, setActive] = useState([]);

    const onSubMenu = (id) => { 
        setActive(actives=>{
            if(actives.includes(id)) return actives.filter(a=>a!== id)
            return [...actives,id]
        })
    }

    return (
        <header className={`${styles.header} ${props.currentLoc.pathname === "/" ? styles.homePage : '' }`}>
            <div className='container'>
                <nav className={styles.nav}>
                    <div className={styles.logo} onClick={()=> navigate('/')}>
                        <img loading='lazy' width={152} src={Logo} alt='The Track Pilot'  />
                    </div>
                    <button type="button" className={`${styles.menuBtn} ${props.showMenu && styles.active}`} onClick={props.onMenuBtn}>
                        <i class={`fa ${props.showMenu ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
                    </button>
                    <div className={`${styles.menu} ${props.showMenu && styles.openMainMenu}`}>
                        <div className={styles.mobileLogo}>
                            <img loading='lazy' width={152} src={Logo} alt='The Track Pilot' />
                        </div>
                        <ul>
                            {MenuList.map((item) => (
                                <li onClick={()=> navigate(item.path)} key={item.id} className={`${props.currentLoc.pathname === item.path ? styles.active : ''} ${item.children.length > 0 ? styles.hasSubMenu : ''}`}>
                                    <span>
                                        {item.name}
                                    </span>
                                    {item.children.length > 0 && <span className={`${styles.caret} ${activeMenus.includes(item.id) && styles.active}`} onClick={()=> onSubMenu(item.id)}></span>}
                                    {item.children.length > 0 && <ol className={activeMenus.includes(item.id) && styles.openMenu}>
                                        {item.children.map((child) => (
                                        <li key={child.name}>{child.name}</li>
                                        ))}
                                    </ol>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}
export default Header;