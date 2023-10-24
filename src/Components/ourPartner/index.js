import React from "react";
import partnerLogo1 from "../../assets/images/partner-logo1.png";
import partnerLogo2 from "../../assets/images/partner-logo2.png";
import partnerLogo3 from "../../assets/images/partner-logo3.png";
import styles from "./ourPartner.module.scss";

const brandLogo = [
  { id: 1, logo: partnerLogo1 },
  { id: 2, logo: partnerLogo2 },
  { id: 3, logo: partnerLogo3 },
  { id: 4, logo: partnerLogo1 },
  { id: 5, logo: partnerLogo2 },
];

const OurPartner = () => {
  return (
    <section className={styles.ourPartner}>
      <div className="container">
        <h2>Our Featured Partner's</h2>
        <div className={styles.row}>
          {brandLogo.map((item) => (
            <div key={item.id} className={styles.box}>
              <img src={item.logo} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default OurPartner;
