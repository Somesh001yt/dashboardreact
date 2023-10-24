import React from 'react'
import logo from '../../assets/images/logo-white.png'
import socialIcon1 from '../../assets/images/social-icon1.png'
import socialIcon2 from '../../assets/images/social-icon2.png'
import socialIcon3 from '../../assets/images/social-icon3.png'
import styles from './footer.module.scss'
import { useNavigate } from 'react-router-dom'

const menuList = [
    {
        id: 1,
        label: 'Home',
        path: '/'
    },
    {
        id: 2,
        label: 'Contact Us',
        path: '/contact-us'
    },
    {
        id: 3,
        label: 'Privacy Policy',
        path: '/privacy-policy'
    },
    {
        id: 4,
        label: 'Service Terms',
        path: '/service'
    },
]

const socialMedia = [
    { id: 1, icon: socialIcon1, alt: 'LinkedIn', path: 'https://www.linkedin.com/signup'},
    { id: 2, icon: socialIcon2, alt: 'Twitter', path: 'https://twitter.com/'},
    { id: 2, icon: socialIcon3, alt: 'Instagram', path: 'https://www.instagram.com/accounts/login/'}
]

const Footer = () => {
    const navigate = useNavigate();
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.row}>
                    <div className={styles.logo}>
                        <img src={logo} alt='' />
                    </div>
                    <div className={styles.menu}>
                        <ul>
                            {menuList.map((item) => (
                                <li key={item.id} onClick={()=> navigate(item.path)}>{item.label}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.social}>
                        <ul>
                            {socialMedia.map((item) => (
                                <li key={item.id}>
                                    <a target='_blank' href={item.path}>
                                        <img src={item.icon} alt={item.alt} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;