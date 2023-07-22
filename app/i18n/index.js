import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      english: "English",
      language: "Language",

      //Language screen
      chooseYourPreferredLanguage: "Choose your preferred language",
      selectLanguage: "Select Language",
      next: "Next",

      //AddOpponent
      pleaseFillAllFields: "Please fill all the fields",
      note: "Note",
      pleaseSelectUsers: "Please select users",
      search: "Search",
      error: "Error",
      enterRatingNumber: "Enter rating number",
      submit: "Submit",
      add: "Add",
      opponents: "Opponents",
      failed: "Failed",
      dataNotFound: "Data not found",

      //ForgotPassword
      forgotPassword: "Forgot Password",
      dontWorryItHappensPleaseEnterYourTheEmailAddressWithAssociatedWithYourAccount:
        "Don't worry it happens. Please enter your the email address with associated with your account",
      email: "Email",

      //Home
      current: "Current",
      expected: "Expected",
      rating: "Rating",
      calculate: "Calculate",
      undo: "Undo",
      reset: "Reset",
      theRatingsMayNotBeAccurate: "The ratings may not be accurate",
      currentRating: "Current Rating",
      expectedRating: "Expected Rating",

      //Login
      incorrectUsernameOrPassword: "Incorrect username or password",
      welcome: "Welcome",
      loginToContinue: "Login to continue",
      password: "Password",
      login: "Login",
      or: "Or",
      continueWithGoogle: "Continue with Google",
      dontHaveAnAccount: "Don't have an account?",
      signUp: "Sign Up",

      //OnBoarding
      textHere: "Text Here",
      interactAndEarnRewardsWithOurPointsProgramHelpClassmatesAndEarnPointsRedeemableForCashOrFutureCoursePurchasesStartBuildingYourRewardsNow:
        "Interact and earn rewards with our points program! Help classmates and earn points redeemable for cash or future course purchases. Start building your rewards now.",
      skip: "Skip",
      takeYourInvestmentKnowledgeToTheNextLevelWithNmoAcademyExpertLedCourses:
        "Take your investment knowledge to the next level with Nmo academy's expert-led courses.",

      //OTP
      enter: "Enter",
      a4DigitsCodeHasBeenSentToYourEmail:
        "A 4 digits code has been sent to your email",
      verify: "Verify",

      //ResetPassword
      new: "New",
      confirm: "Confirm",
      dontNeedToReset: "Don't need to reset?",

      //SignUp
      signUpForRegistration: "Sign up for registration",
      name: "Name",
      dateOfBirth: "Date of birth",
      israel: "Israel",
      bySigningUpYoureAgreeToOur: "By signing up, you're agree to our",
      termsAndConditions: "Term & Conditions",
      and: "and",
      privacyPolicy: "Privacy Policy",

      //Drawer
      home: "Home",
      calculator: "Calculator",
      settings: "Settings",
      languages: "Languages",
      support: "Support",
      visitOurWebsite: "Visit our website",
      logout: "Logout",
    },
  },
  hr: {
    translation: {
      Hebrew: "עִברִית",
      language: "שפה",

      //Language screen
      chooseYourPreferredLanguage: "בחר את השפה המועדפת עליך",
      selectLanguage: "בחר שפה",
      next: "הַבָּא",

      //AddOpponent
      pleaseFillAllFields: "נא למלא את כל השדות",
      note: "הערה",
      pleaseSelectUsers: "אנא בחר משתמשים",
      search: "לחפש",
      error: "שְׁגִיאָה",
      enterRatingNumber: "הזן מספר דירוג",
      submit: "שלח",
      add: "הוסף",
      opponents: "יריבים",
      failed: "נכשל",
      dataNotFound: "נתונים לא נמצאו",

      //ForgotPassword
      forgotPassword: "שכחת סיסמה",
      dontWorryItHappensPleaseEnterYourTheEmailAddressWithAssociatedWithYourAccount:
        "אל דאגה, זה קורה. אנא הזן את כתובת הדואר האלקטרוני המשוייכת לחשבונך",
      email: "אימייל",

      //Home
      current: "נוכחי",
      expected: "צפוי",
      rating: "דירוג",
      calculate: "חשב",
      undo: "בטל",
      reset: "איפוס",
      theRatingsMayNotBeAccurate: "הדירוגים עשויים לא להיות מדויקים",
      currentRating: "דירוג נוכחי",
      expectedRating: "דירוג צפוי",

      //Login
      incorrectUsernameOrPassword: "שם משתמש או סיסמה שגויים",
      welcome: "ברוך הבא",
      loginToContinue: "התחבר כדי להמשיך",
      password: "סיסמה",
      login: "התחברות",
      or: "או",
      continueWithGoogle: "המשך עם Google",
      dontHaveAnAccount: "אין לך חשבון?",
      signUp: "הרשמה",

      //OnBoarding
      textHere: "הכנס טקסט כאן",
      interactAndEarnRewardsWithOurPointsProgramHelpClassmatesAndEarnPointsRedeemableForCashOrFutureCoursePurchasesStartBuildingYourRewardsNow:
        "תתקשר וצבור פרסים עם תוכנית הנקודות שלנו! עזור לזמינים וצבור נקודות המוחלפות במזומנים או ברכישת קורסים עתידיים. התחל לבנות את הפרסים שלך עכשיו.",
      skip: "דלג",
      takeYourInvestmentKnowledgeToTheNextLevelWithNmoAcademyExpertLedCourses:
        "קח את הידע ההשקעותי שלך לרמה הבאה עם קורסים מובילים של Nmo Academy.",

      //OTP
      enter: "הזן",
      a4DigitsCodeHasBeenSentToYourEmail:
        'קוד באורך 4 ספרות נשלח לכתובת הדוא"ל שלך',
      verify: "אמת",

      //ResetPassword
      new: "חדש",
      confirm: "אשר",
      dontNeedToReset: "אין צורך לאפס?",

      //SignUp
      signUpForRegistration: "הרשמה להרשמה",
      name: "שם",
      dateOfBirth: "תאריך לידה",
      israel: "ישראל",
      bySigningUpYoureAgreeToOur: "בהרשמה, אתה מסכים לתנאי השימוש שלנו",
      termsAndConditions: "תנאי השימוש",
      and: "ו",
      privacyPolicy: "מדיניות פרטיות",

      //Drawer
      home: "בית",
      calculator: "מחשבון",
      settings: "הגדרות",
      languages: "שפות",
      support: "תמיכה",
      visitOurWebsite: "בקר באתר שלנו",
      logout: "התנתקות",
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
