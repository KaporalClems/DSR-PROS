// ===============================
// DSR PROS - app.js complet
// ===============================

// Import Supabase + html2canvas + JsBarcode
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import html2canvas from "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm";
import JsBarcode from "https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/+esm";

// ========= CONFIG SUPABASE =========
// ⚠️ Remplace par tes propres clés Supabase si besoin
const supabaseUrl = "https://ltryylhccibeegksgtva.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0cnl5bGhjY2liZWVna3NndHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MDk3NzcsImV4cCI6MjA3MTk4NTc3N30.mRzhae2CTxhGaOz7R5JDvBZv9v1v3Mcw9VMwh4Xg5nQ";
const supabase = createClient(supabaseUrl, supabaseKey);

// ========= MENU HAMBURGER =========
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const sideMenu = document.getElementById("sideMenu");
  if (menuBtn && sideMenu) {
    menuBtn.addEventListener("click", () => {
      sideMenu.style.left = sideMenu.style.left === "0px" ? "-250px" : "0px";
    });
  }
});

// ========= INTERVENANTS =========
async function loadIntervenants() {
  const { data, error } = await supabase.from("intervenants").select("*");
  if (error) {
    console.error("Erreur chargement intervenants:", error);
    alert("Impossible de charger les intervenants ❌");
    return;
  }
  const list = document.getElementById("intervenantsList");
  if (list) {
    if (data && data.length > 0) {
      list.innerHTML = data.map(item =>
        `<li class="item" onclick="showPass('${escapeHtml(item.id)}','${escapeHtml(item.nom)}','${escapeHtml(item.prenom)}','${escapeHtml(item.entreprise)}')">
          ${item.nom} ${item.prenom} - ${item.entreprise}
        </li>`
      ).join("");
    } else {
      list.innerHTML = "<li>Aucun intervenant trouvé.</li>";
    }
  }
}
window.loadIntervenants = loadIntervenants;

// ========= PRESTATAIRES =========
async function loadPrestataires() {
  const { data, error } = await supabase.from("prestataires").select("*");
  if (error) {
    console.error("Erreur chargement prestataires:", error);
    alert("Impossible de charger les prestataires ❌");
    return;
  }
  const list = document.getElementById("prestatairesList");
  if (list) {
    if (data && data.length > 0) {
      list.innerHTML = data.map(item =>
        `<li class="item" onclick="showPrestatairePass('${escapeHtml(item.id)}','${escapeHtml(item.nom)}','${escapeHtml(item.prenom)}','${escapeHtml(item.entreprise)}')">
          ${item.nom} ${item.prenom} - ${item.entreprise}
        </li>`
      ).join("");
    } else {
      list.innerHTML = "<li>Aucun prestataire trouvé.</li>";
    }
  }
}
window.loadPrestataires = loadPrestataires;

// ========= FONCTION MODALE PASS =========
function renderPassModal(id, nom, prenom, entreprise, isPrestataire = false) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modalContent");

  content.innerHTML = `
    <span id="closeBtn">&times;</span>
    <div id="passCard" class="pass">
      <h2>${prenom} ${nom}</h2>
      <p><b>Entreprise :</b> ${entreprise}</p>
      <div class="code">#${id}</div>
      <svg id="barcode"></svg>
    </div>
    <button id="saveBtn">💾 Exporter en PNG</button>
  `;

  modal.style.display = "flex";

  // Génération du barcode
  JsBarcode("#barcode", id, {
    format: "CODE128",
    lineColor: "#000",
    width: 2,
    height: 50,
    displayValue: true
  });

  // Fermer modale
  document.getElementById("closeBtn").onclick = () => modal.style.display = "none";

  // Export PNG
  document.getElementById("saveBtn").onclick = () => {
    html2canvas(document.getElementById("passCard")).then(canvas => {
      const link = document.createElement("a");
      const fileName = isPrestataire
        ? `${prenom}_${nom}_prestataire_pass.png`
        : `${prenom}_${nom}_pass.png`;
      link.download = fileName;
      link.href = canvas.toDataURL();
      link.click();
    });
  };
}

// ========= EXPORT FONCTIONS =========
window.showPass = (id, nom, prenom, entreprise) =>
  renderPassModal(id, nom, prenom, entreprise, false);

window.showPrestatairePass = (id, nom, prenom, entreprise) =>
  renderPassModal(id, nom, prenom, entreprise, true);

// ========= UTILITAIRE SECURITÉ =========
function escapeHtml(unsafe) {
  if (unsafe == null) return "";
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
