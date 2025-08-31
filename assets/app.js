// Menu hamburger
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const sideMenu = document.getElementById("sideMenu");
  if(menuBtn){
    menuBtn.addEventListener("click", () => {
      sideMenu.style.left = sideMenu.style.left === "0px" ? "-250px" : "0px";
    });
  }
});

// Exemple connexion Supabase
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// TODO: remplace avec tes infos Supabase
const supabaseUrl = "https://xxxxx.supabase.co";
const supabaseKey = "public-anon-key";
const supabase = createClient(supabaseUrl, supabaseKey);

// Exemple récupération intervenants
async function loadIntervenants(){
  let { data, error } = await supabase.from("intervenants").select("*");
  if(error) console.error(error);
  else {
    const container = document.getElementById("intervenantsList");
    if(container){
      container.innerHTML = data.map(item => `<li>${item.nom} - ${item.specialite}</li>`).join("");
    }
  }
}
