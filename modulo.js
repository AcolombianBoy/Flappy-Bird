// Importa e inicializa Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCf-m6f1xXqdc-OlfEqcGDgMLWN13TM6TE",
    authDomain: "flappy-bird-7180a.firebaseapp.com",
    projectId: "flappy-bird-7180a",
    storageBucket: "flappy-bird-7180a.firebasestorage.app",
    messagingSenderId: "929532031383",
    appId: "1:929532031383:web:ae22e3b041ce7ea6c514d2"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para agregar puntuación
async function addScore(player, score) {
    try {
        await addDoc(collection(db, "scores"), { player, score });
        console.log("Puntuación añadida");
    } catch (error) {
        console.error("Error al agregar puntuación: ", error);
    }
}

// Función para obtener puntuaciones
async function getScores() {
    const querySnapshot = await getDocs(collection(db, "scores"));
    let scores = [];
    querySnapshot.forEach(doc => {
        scores.push({ id: doc.id, ...doc.data() });
    });
    return scores;
}

// Función para actualizar puntuación
async function updateScore(id, newScore) {
    try {
        const scoreRef = doc(db, "scores", id);
        await updateDoc(scoreRef, { score: newScore });
        console.log("Puntuación actualizada");
    } catch (error) {
        console.error("Error al actualizar puntuación: ", error);
    }
}

// Función para eliminar puntuación
async function deleteScore(id) {
    try {
        await deleteDoc(doc(db, "scores", id));
        console.log("Puntuación eliminada");
    } catch (error) {
        console.error("Error al eliminar puntuación: ", error);
    }
}

// Exportamos las funciones
export { addScore, getScores, updateScore, deleteScore };