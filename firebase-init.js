import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJVt4zqIUXp0oTzkTaXlHhgGUuoj9d618",
  authDomain: "dsr-pros-9f349.firebaseapp.com",
  projectId: "dsr-pros-9f349",
  storageBucket: "dsr-pros-9f349.firebasestorage.app",
  messagingSenderId: "290416195988",
  appId: "1:290416195988:web:32161b91ea9f41804cb781",
  measurementId: "G-X9K4E468TS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };
