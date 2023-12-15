import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';



i18n
  .use(Backend)

  .use(initReactI18next)
  .init({
    // debug: true,
    fallbackLng: 'en',
  });

  // const userDataString = localStorage.getItem("userData");
  // const UserData = JSON.parse(userDataString);
  // console.log(UserData)
 

export const changeLanguageData = (user_type) => {
  if((user_type ) === 'education'){ 
    console.log("gone");
   i18n.changeLanguage('ed') 
   console.log('ss' )
  }else if ((user_type ) === 'corporate'){ 
    console.log("gone");

    i18n.changeLanguage('ct') 
  }else{ 
    console.log("gone");

    i18n.changeLanguage('pt')  
  }
}

export default i18n;