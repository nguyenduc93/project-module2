import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Đây là file config cá nhân được khởi tạo dự trên firebase
const firebaseConfig = {
  apiKey: "AIzaSyA7Zmb2fo4UdE-GphZFIfYgokwHZXcNu6g",
  authDomain: "project02web.firebaseapp.com",
  projectId: "project02web",
  storageBucket: "project02web.appspot.com",
  messagingSenderId: "589321354906",
  appId: "1:589321354906:web:b0a2749695f5ef48a66923",
  measurementId: "G-QMKLKT6K5D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Storage and get a reference to the service
// Nhận tham chiếu đến dịch vụ lưu trữ, được sử dụng để tạo tham chiếu trong bộ chứa lưu trữ của bạn
export const storage = getStorage(app);
