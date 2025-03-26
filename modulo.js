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
        displayScores(); // Actualiza la tabla de puntuaciones
    } catch (error) {
        console.error("Error al agregar puntuación: ", error);
    }
}

// Función para obtener puntuaciones y mostrarlas en pantalla
async function displayScores() {
    const scoresTable = document.getElementById("scoresTable");
    if (!scoresTable) {
        console.error("Tabla de puntuaciones no encontrada");
        return;
    }
    scoresTable.innerHTML = "<tr><th>Jugador</th><th>Puntaje</th></tr>";
    
    const querySnapshot = await getDocs(collection(db, "scores"));
    querySnapshot.forEach(doc => {
        let data = doc.data();
        let row = `<tr><td>${data.player}</td><td>${data.score}</td></tr>`;
        scoresTable.innerHTML += row;
    });
}

// Función para actualizar puntuación
async function updateScore(id, newScore) {
    try {
        const scoreRef = doc(db, "scores", id);
        await updateDoc(scoreRef, { score: newScore });
        console.log("Puntuación actualizada");
        displayScores();
    } catch (error) {
        console.error("Error al actualizar puntuación: ", error);
    }
}

// Función para eliminar puntuación
async function deleteScore(id) {
    try {
        await deleteDoc(doc(db, "scores", id));
        console.log("Puntuación eliminada");
        displayScores();
    } catch (error) {
        console.error("Error al eliminar puntuación: ", error);
    }
}

// Función para mostrar el formulario de puntuación al perder
function showScoreForm(finalScore) {
    const name = prompt("Ingresa tu nombre para guardar tu puntuación:");
    if (name) {
        addScore(name, finalScore);
    }
}

// Exportamos las funciones
export { addScore, displayScores, updateScore, deleteScore, showScoreForm };

document.addEventListener("DOMContentLoaded", displayScores);