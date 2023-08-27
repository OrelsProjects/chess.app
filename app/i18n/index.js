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
      rating: "Rating",
      submit: "Submit",
      add: "Add",
      opponents: "Opponents",
      failed: "Failed",
      dataNotFound: "Data not found",
      statusWin: "I won",
      statusLose: "I lost",
      statusDraw: "Draw",
      blitz: "Blitz",
      rapid: "Rapid",
      classical: "Classical",
      sheetTitleGameState: "What was the score?",
      sheetTitleGameType: "Which game did you play?",

      //ForgotPassword
      forgotPassword: "Forgot Password",
      forgotPasswordText:
        "Don't worry it happens. Please enter your the email address with associated with your account",
      email: "Email",

      //Home
      current: "Current",
      expected: "Expected",
      rating: "Rating",
      calculate: "Calculate",
      undo: "Undo",
      reset: "Reset",
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
      onboarding_2_body:
        "One of them, for example, is a calendar for managing tournaments and games. Registration, management, and event creation in just a few clicks.\nShall we begin?",
      onboarding_2_title: "Events",
      onboarding_1_title: "Hi. Good to see you!",
      onboarding_1_body:
        "A new era for managing your chess life is on the horizon. Many features tailored just for you are on the way.",
      skip: "Skip",

      //OTP
      enter: "Enter",
      enterOTP: "Enter OTP",
      a6DigitsCodeHasBeenSentToYourEmail:
        "A 6 digits code has been sent to your email",
      verify: "Verify",

      //ResetPassword
      new: "New",
      confirm: "Confirm",
      dontNeedToReset: "Don't need to reset?",
      continue: "Continue",

      //SignUp
      signUpForRegistration: "Sign up for registration",
      name: "Name",
      username: "Username",
      dateOfBirth: "Date of birth",
      israel: "Israel",
      bySigningUpYoureAgreeToOur: "By signing up, you're agree to our",
      termsAndConditions: "Term & Conditions",
      and: "and",
      privacyPolicy: "Privacy Policy",
      phoneNumber: "Phone Number",
      gender: "Gender",
      male: "Male",
      female: "Female",
      playerNumber: "Player Number",
      haveAnAccount: "Have an account?",

      //Drawer
      home: "Home",
      calculator: "Calculator",
      settings: "Settings",
      languages: "Languages",
      support: "Support",
      visitOurWebsite: "Visit our website",
      logout: "Logout",

      // Errors
      somethingWentWrong: "Something were wrong.. We are on it",
    },
  },
  he: {
    translation: {
      Hebrew: "עברית",
      language: "שפה",

      //Language screen
      chooseYourPreferredLanguage: "בחר את השפה המועדפת עליך",
      selectLanguage: "בחר שפה",
      next: "הבא",

      //AddOpponent
      pleaseFillAllFields: "נא למלא את כל השדות",
      note: "הערה",
      pleaseSelectUsers: "אנא בחר משתמשים",
      search: "חיפוש",
      error: "שגיאה",
      rating: "דירוג",
      submit: "שלח",
      add: "הוסף",
      opponents: "יריבים",
      failed: "נכשל",
      dataNotFound: "נתונים לא נמצאו",
      statusWin: "ניצחתי",
      statusLose: "הפסדתי",
      statusDraw: "תיקו",
      blitz: "בליץ",
      rapid: "מהיר",
      classical: "איטי",
      sheetTitleGameState: "מה עשית?",
      sheetTitleGameType: "מה שיחקת?",

      //ForgotPassword
      forgotPassword: "שכחת סיסמה",
      forgotPasswordText:
        "אל דאגה, זה קורה. אנא הזן את כתובת הדואר האלקטרוני המשוייכת לחשבונך",
      email: "אימייל",

      //Home
      current: "נוכחי",
      expected: "צפוי",
      rating: "דירוג",
      calculate: "חשב",
      undo: "בטל",
      reset: "איפוס",
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
      onboarding_2_body:
        "אחד מהם, לדוגמא, זה יומן לניהול תחרויות ומשחקים.\nהרשמה, ניהול ויצירת אירועים בכמה לחיצות.\n שנתחיל?",
      onboarding_2_title: "אירועים על הסף",
      onboarding_1_title: "היי. טוב לראות אותך!",
      onboarding_1_body:
        "עידן חדש לניהול חיי השחמט שלך בפתח.\n הרבה פיצ'רים שתפורים בול בשבילך בדרך.",
      skip: "דלג",

      //OTP
      enter: "הזן",
      a6DigitsCodeHasBeenSentToYourEmail:
        'קוד באורך 6 ספרות נשלח לכתובת הדוא"ל שלך',
      verify: "אמת",
      enterOTP: "הזן OTP",

      //ResetPassword
      new: "חדש",
      confirm: "אשר",
      dontNeedToReset: "אין צורך לאפס?",
      continue: "לְהַמשִׁיך",

      //SignUp
      signUpForRegistration: "הרשמה להרשמה",
      name: "שם",
      username: "שם משתמש",
      dateOfBirth: "תאריך לידה",
      israel: "ישראל",
      bySigningUpYoureAgreeToOur: "בהרשמה, אתה מסכים לתנאי השימוש שלנו",
      termsAndConditions: "תנאי השימוש",
      and: "ו",
      privacyPolicy: "מדיניות פרטיות",
      phoneNumber: "מספר טלפון",
      gender: "מין",
      male: "זכר",
      female: "נקבה",
      playerNumber: "מספר שחקן",
      haveAnAccount: "יש לך חשבון?",

      //Drawer
      home: "בית",
      calculator: "מחשבון",
      settings: "הגדרות",
      languages: "שפות",
      support: "תמיכה",
      visitOurWebsite: "בקר באתר שלנו",
      logout: "התנתקות",

      // Errors
      somethingWentWrong: "משהו השתבש.. אנחנו על זה",
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
