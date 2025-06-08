// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1QFK-SSTW03Im5MUy9FXoVIFd1PEdqL4",
  authDomain: "b-conexus.firebaseapp.com",
  databaseURL: "https://b-conexus-default-rtdb.firebaseio.com",
  projectId: "b-conexus",
  storageBucket: "b-conexus.firebasestorage.app",
  messagingSenderId: "15021897204",
  appId: "1:15021897204:web:fa8f097d6a8af3efe475a1",
  measurementId: "G-NDFLV01HL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
async function translateText(text, targetLang) {
  const res = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "auto",
      target: targetLang,
      format: "text"
    })
  });

  const data = await res.json();
  return data.translatedText;
}

async function sendMessage() {
  const msg = document.getElementById("msg").value;
  const userLang = "en";  // Sender's language
  const receiverLang = "fr";  // Receiver's language

  const translated = await translateText(msg, receiverLang);

  const msgObj = {
    original: msg,
    translated: translated,
    fromLang: userLang,
    toLang: receiverLang,
    time: Date.now()
  };

  db.ref("messages").push(msgObj);
  document.getElementById("msg").value = "";
}
db.ref("messages").on("child_added", snapshot => {
const data = snapshot.val();
  const div = document.createElement("div");
  div.innerHTML = `<b>data.fromLang →{data.toLang}:</b> ${data.translated}`;
  chatBox.appendChild(div);
});