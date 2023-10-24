import React from 'react';
import ButtonBox from '../../Components/buttonBox';
import RadialBarChart from '../../Components/radialBarChart';
import { blogList, expertiseList, reviewList, softUsageChar } from './constants';
import { useNavigate } from 'react-router-dom';
import investmentImg from '../../assets/images/investment-img.png';
import styles from './home.module.scss';
import Blog from '../../Components/blog';
import Reviews from '../../Components/reviews';

const HomePage = () => {
    const navigate = useNavigate();
    const token  = localStorage.getItem('token')
    console.log(token)

    return (
        <>
            <section className={styles.banner}>
                <div className='container'>
                    <div className={styles.text}>
                        <h1>Increase Productivity & Cost-efficiency with Software Usage Tracking</h1>
                        <p>Track growth & productivity with Software usage monitoring. Save thousands in investment by tracking software usage. Track Pilot enables the monitoring of software licence usage with just one click. It helps you keep a track of computer activity, and observe what your employees, students, or children are doing on their desktop. Track Pilot helps you understand which software is being used the most and which software is not worth investing in.</p>
                        <div className={styles.cta}>
                            <ButtonBox click={()=> navigate('/sign-up')} label="Start Tracking" />
                            <ButtonBox click={()=> navigate('/sign-up')} primary label="Contact Us" />
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.softUsage}>
                <div className='container'>
                    <div className={styles.row}>
                        <div className={styles.left}>
                            <h2>Our Software Usage Analysis for Different Fields</h2>
                        </div>
                        <div className={styles.right}>
                            {softUsageChar.map((item) => (
                                <div className={styles.box}>
                                    <RadialBarChart key={item.name} label={item.name} value={item.value} color={item.color} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.trackPilot}>
                <div className='container'>
                    <div className={styles.row}>
                        <div className={styles.text}>
                            <h2 data-title="What is Track Pilot?">Trusted Software Usage Analysis Tool Globally</h2>
                            <p>The Track Pilot is a reliable and precise tool that is widely trusted in the UK for monitoring software usage. Our reputation is built on the trust placed in us by educational institutions, businesses, and individuals, including parents who wish to keep an eye on their children's computer activities.</p>
                            <ButtonBox label="Know More>>" />
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.expertise}>
                <div className='container'>
                    <h2 data-title='Our Expertise'>Providing Computer Activity & Software Usage Tracking Assistance</h2>
                    <div className={styles.row}>
                        {expertiseList.map((item) => (
                        <div key={item.title} className={styles.box}>
                            <div className={styles.cover}>
                                <div className={styles.boxImg}>
                                    <img src={item.image} alt={item.title} />
                                    <h3>{item.title}</h3>
                                </div>
                                <div className={styles.boxText}>
                                    <ul>
                                        {item.list.map((list) => (
                                        <li key={list.label}>{list.label}</li>
                                        ))}
                                    </ul>
                                    <button type="button" onClick={()=> navigate(item.path)} className={styles.boxLink}>View More</button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.investment}>
                <div className='container'>
                    <div className={styles.row}>
                        <div className={styles.left}>
                            <h2>Analyse Return on Investment on Software and Plan Accordingly</h2>
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <ul>
                                <li>Accurate Data Based on Software Usage Analysis.</li>
                                <li>Keeping a Record of Unused Licences.</li>
                                <li>Preventing Insider Threats.</li>
                            </ul>
                            <ButtonBox class={styles.whiteBtn} label="Sign Up Today!" />
                        </div>
                        <div className={styles.right}>
                            <img src={investmentImg} alt='' />
                        </div>
                    </div>
                </div>
            </section>

            <Reviews data={reviewList} />
            
            <Blog data={blogList} />
        </>
    )
}
export default HomePage;