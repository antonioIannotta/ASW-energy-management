const regioniList = require("../assets/regioni");

let regioniMap = new Map();
regioniMap.set("Abruzzo", regioniList.Abruzzo);
regioniMap.set("Basilicata", regioniList.Basilicata);
regioniMap.set("Calabria", regioniList.Calabria);
regioniMap.set("Campania", regioniList.Campania);
regioniMap.set("Emilia-Romagna", regioniList.EmiliaRomagna);
regioniMap.set("Friuli-Venezia-Giulia", regioniList.FVG);
regioniMap.set("Lazio", regioniList.Lazio);
regioniMap.set("Liguria", regioniList.Liguria);
regioniMap.set("Lombardia", regioniList.Lombardia);
regioniMap.set("Marche", regioniList.Marche);
regioniMap.set("Molise", regioniList.Molise);
regioniMap.set("Piemonte", regioniList.Piemonte);
regioniMap.set("Puglia", regioniList.Puglia);
regioniMap.set("Sardegna", regioniList.Sardegna);
regioniMap.set("Sicilia", regioniList.Sicilia);
regioniMap.set("Toscana", regioniList.Toscana);
regioniMap.set("Trentino-Alto-Adige", regioniList.TAA);
regioniMap.set("Umbria", regioniList.Umbria);
regioniMap.set("Valle D'Aosta", regioniList.VA);
regioniMap.set("Veneto", regioniList.Veneto);

export function fillRegioni(regioni) {
  for (let key of regioniMap.keys()) {
    regioni.push(key);
  }
}

export function containsOneAt(email) {
  let cnt = 0;
  for (let i = 0; i < email.length; i++) {
    if (email.charAt(i) === "@") {
      cnt++;
    }
  }
  if (cnt === 1) {
    return true;
  }
  return false;
}

export function validEmail(email) {
  return (
    containsOneAt(email) &&
    email.endsWith("@gmail.com") &&
    !(email.toString().match(/^\s*$/) || []).length > 0
  );
}

export function containsNumber(str) {
  return /\d/.test(str);
}

export function validCity(city, regione) {
  for (let value of regioniMap.keys()) {
    if (regione.toLowerCase() === value.toLowerCase()) {
      for (let c of regioniMap.get(value)) {
        if (city.toLowerCase() === c.toLowerCase()) {
          return true;
        }
      }
    }
  }
  return false;
}

export function invalidPassword(password) {
  return password === "" || password === undefined;
}
