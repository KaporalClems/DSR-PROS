// ===============================
// DSR PROS - app.js complet
// ===============================

// Import Supabase + html2canvas
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import html2canvas from "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm";

// ========= CONFIG SUPABASE =========
// ⚠️ Remplace par tes propres clés Supabase
const supabaseUrl = "https://xxxxx.supabase.co";
const supabaseKey = "public-anon-key";
const supabase = createClient(supabaseUrl, supabaseKey);

// ========= MENU HAMBURGER =========
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const sideMenu = document.getElementById("sideMenu");
  if(menuBtn && sideMenu){
    menuBtn.addEventListener("click", () => {
      sideMenu.style.left = sideMenu.style.left === "0px" ? "-250px" : "0px";
    });
  }
});

// ========= INTERVENANTS =========
async function loadIntervenants(){
  let { data, error } = await supabase.from("intervenants").select("*");
  if(error) console.error(error);
  else {
    const list = document.getElementById("intervenantsList");
    if(list){
      list.innerHTML = data.map(item =>
        `<li class="item" onclick="showPass('${item.id}','${item.nom}','${item.prenom}','${item.entreprise}')">
          ${item.nom} ${item.prenom} - ${item.entreprise}
        </li>`
      ).join("");
    }
  }
}
window.loadIntervenants = loadIntervenants;

// Afficher pass Intervenant
window.showPass = function(id, nom, prenom, entreprise){
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
      link.download = `${prenom}_${nom}_pass.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };
};

// ========= PRESTATAIRES =========
async function loadPrestataires(){
  let { data, error } = await supabase.from("prestataires").select("*");
  if(error) console.error(error);
  else {
    const list = document.getElementById("prestatairesList");
    if(list){
      list.innerHTML = data.map(item =>
        `<li class="item" onclick="showPrestatairePass('${item.id}','${item.nom}','${item.prenom}','${item.entreprise}')">
          ${item.nom} ${item.prenom} - ${item.entreprise}
        </li>`
      ).join("");
    }
  }
}
window.loadPrestataires = loadPrestataires;

// Afficher pass Prestataire
window.showPrestatairePass = function(id, nom, prenom, entreprise){
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
      link.download = `${prenom}_${nom}_prestataire_pass.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };
};
