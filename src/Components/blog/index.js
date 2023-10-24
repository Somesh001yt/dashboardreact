import React from "react";
import styles from "./blog.module.scss";
import ButtonBox from "../buttonBox";

const Blog = ({ data }) => {
  return (
    <section className={styles.blog}>
      <div className="container">
        <div className={styles.blogTitleWrapper}>
          <div className={styles.left}>
            <h2 data-title="Don't Miss Out on Important Updates">
              Latest Blogs & Updates
            </h2>
            <p>
              Check out our blog to keep up with the advancements in the
              software realm. Keep yourself updated with important updates.
            </p>
          </div>
          <div className={styles.right}>
            <ButtonBox primary label="View All >>" />
          </div>
        </div>
        <div className={styles.row}>
          {data.map((item, idx) => (
            <div key={idx} className={styles.box}>
              <a href={item.path}>
                <div className={styles.over}>
                  <div className={styles.cover}>
                    <img src={item.img} alt={item.cat} />
                    <div className={styles.text}>
                      <span>{item.cat}</span>
                      <p>{item.text}</p>
                      <ul>
                        <li>by {item.postBy}</li>
                        <li>{item.date}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Blog;
