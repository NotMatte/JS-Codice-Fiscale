// Variabili e oggetti globali
var data = [];
var dataPaesi = [];
var aux;

// Chiamo il json-server e salvo il contenuto in data
fetch("http://localhost:3000/comuni")
   .then(ris => ris.json())
   .then(json => { data = json; console.log(data)});

// Chiamo il json-server e salvo il contenuto in data
fetch("http://localhost:3000/paesi")
   .then(risPaesi => risPaesi.json())
   .then(jsonPaesi => { dataPaesi = jsonPaesi; console.log(dataPaesi)});

//Prova a collegarsi all'API
setTimeout(controlloApi, 5000);

function calcola(){

   if(controlloApi() == false){ return; }

   // Prendo tutti gli elementi
   var nome = document.getElementById("nome");
   var cognome = document.getElementById("cognome");
   var sesso = document.getElementById("sesso");
   var comune = document.getElementById("comune");
   var provincia = document.getElementById("provincia");
   var stato = document.getElementById("stato");
   // Divido la data in giorno, mese e anno
   var dataa = document.getElementById("data");
   var gg = dataa.value.substring(8,10);
   var mm = dataa.value.substring(5,7);
   var aa = dataa.value.substring(0,4);

   // Controllo se i campi sono vuoti
   if(nome.value == '' || cognome.value == '' || sesso.value == '' || comune.value == '' || provincia.value == '' || stato.value == '' || dataa.value == ''){
      if(nome.value == '') nome.className = 'input-dentro-errore';
      if(cognome.value == '') cognome.className = 'input-dentro-errore';
      if(sesso.value == '') sesso.className = 'input-dentro-errore';
      if(comune.value == '') comune.className = 'input-dentro-errore';
      if(provincia.value == '') provincia.className = 'input-dentro-errore';
      if(stato.value == '') stato.className = 'input-dentro-errore';
      if(dataa.value == '') dataa.className = 'input-dentro-errore';
      swal("Ops...", "Ho riscontrato un errore nel prendere i dati\nassicurati che tutte le caselle siano state riempite e riprova.", "error");
      return;
   }

   // Prende il catasto e controlla che la città sia giusta
   var catasto = getCatasto(comune.value, provincia.value, stato.value);
   if(aux == false) return;


   // Costruisco la prima parte della stringa
   var codiceAux = getNomeCognome(cognome.value) + getNomeCognome(nome.value) + getAnno(aa) + getMese(mm) + getGiorno(gg, sesso.value) + catasto;
   var codice = codiceAux + getCarattereControllo(codiceAux);
   document.getElementById("risultato").innerHTML = codice;

   //Svuoto i campi
   nome.className = 'input-dentro';
   cognome.className = 'input-dentro';
   sesso.className = 'input-dentro';
   comune.className = 'input-dentro';
   provincia.className = 'input-dentro';
   stato.className = 'input-dentro';
   dataa.className = 'input-dentro';

   nome.value = "";
   cognome.value = "";
   sesso.value = "M";
   comune.value = "";
   provincia.value = "";
   stato.value = "";
   dataa.value = "";

}

function getNomeCognome(str){
   var str = str.toUpperCase();
   const vocali = ['A', 'E', 'I', 'O', 'U'];
   var newParola = '';
   var count = 0;
   var countCons = 0;

   // Conta le consonanti
   for(let i = 0; i < str.length; i++){
      if(!vocali.includes(str[i]) && controlloLettera(str[i])) count++;
   }

   if(count < 3){
      let lung = count;
      let countAux = 0;
      for(let i = 0; i < str.length; i++){
         if(!vocali.includes(str[i]) && newParola.length < lung && controlloLettera(str[i])){
            newParola += str[i];
            if(newParola.lenght == lung) countAux = i;
         }
      }
      newParola += str[countAux+1];
   }
   else if(count >= 4){
      for(let i = 0; i < str.length; i++){
         if(!vocali.includes(str[i]) && newParola.length < 3 && controlloLettera(str[i])){
            if(countCons != 1) newParola += str[i];
            countCons++;
         }
      }
   }else if (count == 3){
      for(let i = 0; i < str.length; i++){
         if(!vocali.includes(str[i]) && newParola.length < 3 && controlloLettera(str[i])) newParola += str[i];
      }
   }

   return newParola;
}

function getMese(str){
   switch(str){
      case '01': return 'A';
      case '02': return 'B';
      case '03': return 'C';
      case '04': return 'D';
      case '05': return 'E';
      case '06': return 'H';
      case '07': return 'L';
      case '08': return 'M';
      case '09': return 'P';
      case '10': return 'R';
      case '11': return 'S';
      case '12': return 'T';
   }
}

function getGiorno(str, sesso){

   newStr = parseInt(str) + 40; /* parseInt = convertire una stringa rispettivamente in un valone numerico intero */

   if(sesso == 'F') return newStr;
   else return str;
}

function getAnno(anno){
   //Prende le untime 2 cifre dell'anno passato in str (Es. 2004 -> 04)
   return anno.substring(2,4);
}

// Prende il codice del catasto
function getCatasto(str, prov, paese){
   var newComune = str.toUpperCase(); /* Imposta la parola tutta maiuscola per cercarla nel database */
   var newPaese = paese.toUpperCase();
   if(newPaese != "ITALIA"){ return getPaese(newPaese); }
   if(data[newComune] == null){
      // Cambia classe all'elemento comune
      document.getElementById('comune').className = 'input-dentro-errore';
      document.getElementById('comune').value = "";
      swal("Ops...", "Qualcosa è andato storto, la citta/paese\n" + str + " non risulta essere presente nel database.", "error");
      aux = false;
      return;
   };

   if(!controlloCitta(str, prov)){
      aux = false;
      return;
   }
   // Ritorno il codice catasto
   aux = true;
   return data[newComune].codice_catasto;
}

// Carattere di controllo finale
function getCarattereControllo(str){
   // json pari
   const pari = {'A': 0,'B': 1,'C': 2,'D': 3,'E': 4,'F': 5,'G': 6,'H': 7,'I': 8,'J': 9,'K': 10,'L': 11,'M': 12,'N': 13,'O': 14,'P': 15,'Q': 16,'R': 17,'S': 18,'T': 19,'U': 20,'V': 21,'W': 22,'X': 23,'Y': 24,'Z': 25,'0': 0,'1': 1,'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9};
   const dispari = {'A': 1,'B': 0,'C': 5,'D': 7,'E': 9,'F': 13,'G': 15,'H': 17, 'I': 19,'J': 21,'K': 2,'L': 4,'M': 18,'N': 20,'O': 11,'P': 3,'Q': 6,'R': 8,'S': 12,'T': 14,'U': 16,'V': 10,'W': 22,'X': 25,'Y': 24,'Z': 23,'0': 1,'1': 0,'2': 5,'3': 7,'4': 9,'5': 13,'6': 15,'7': 17,'8': 19,'9': 21};

   const ris = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

   var sommaPari = 0;
   var sommaDispari = 0;

   for(let i=0; i < str.length; i++){
      if((i+1)%2 == 0){
         // La posizione è pari
         sommaPari += pari[str[i]];
      }
      else{
         // La posizione è dispari
         sommaDispari += dispari[str[i]];
      }
   }
   var tot = sommaPari + sommaDispari;
   var resto = tot % 26;
   return ris[resto];
}

// Restituisco false se la lettera passata è un simbolo, uno spazio o un numero
function controlloLettera(let){
   if(let == ' ' || let == '!' || let == '"' || let == '#' || let == '$' || let == '%' || let == '&' || let == '/' || let == '(' || let == ')' || let == '=' || let == '?' || let == '^' || let == '°' || let == '§' || let == '£' || let == '€' || let == '¬' || let == '+' || let == '*' || let == 'ç' || let == 'à' || let == 'è' || let == 'é' || let == 'ì' || let == 'ò' || let == 'ù' || let == '0' || let == '1' || let == '2' || let == '3' || let == '4' || let == '5' || let == '6' || let == '7' || let == '8' || let == '9')
      return false;
   else
      return true;
}

function controlloCitta(comune, provincia){
   var newComune = comune.toUpperCase(); /* Imposta la parola tutta maiuscola per cercarla nel database */
   var newProvincia = provincia.toUpperCase();
   if(data[newComune].sigla_provincia != newProvincia){
      document.getElementById('comune').className = 'input-dentro-errore';
      document.getElementById('comune').value = "";
      swal("Ops...", "La provincia inserita non corrisponde a quella del comune.\nComune: "+ comune +" • Provincia: "+ newProvincia +"", "error");
      return false;
   }
   else return true;
}

function getPaese(str){
   if(dataPaesi[str] == null){
      document.getElementById('stato').className = 'input-dentro-errore';
      document.getElementById('stato').value = "";
      swal("Ops...", "Qualcosa è andato storto, il paese\n" + str + " non risulta essere presente nel database.", "error");
      aux = false;
      return;
   }
   
   return dataPaesi[str].codice;
}

function controlloApi(){
   const test = "GENOVA";
   if(data[test] == null){
      swal("API Error...", {
         icon: "error",
         text: "Ho riscontrato un errore nel collegarmi all'API.\nAssicurati di aver acceso correttamente il server tramite\nterminale oppure controlla se la porta è disponibile.\n\nControlla la guida cliccando nel pulsante sottostante.",
         customClass: ".sweet-alert button",
         buttons: {
           cancel: "Chiudi e riprova",
           catch: {
             text: "🔗 Vai alla guida",
             value: "vai",
           },
         },
       })
       .then((value) => {
         switch (value) {
        
           case "vai":
              window.open('https://github.com/NotMatte/JS-Codice-Fiscale', '_blank');
              break;
        
           default:
             window.location.reload();
             break;
         }
       });
      return false;
   }
}