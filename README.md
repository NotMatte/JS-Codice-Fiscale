<div align="center">
  <a href="https://ds.notmatte.store/">
    <img src="img/1.png" alt="Logo">
  </a>
</div>



## ⭐ Come avviare il programma in locale

Per far si che il programma funzioni è necessario avviare il server dell'API in locale, senza questo passaggio il calcolatore online del codice fiscale non funzionerà correttamente e darà un errore riguardo il database per qualisasi comune/stato inserito.

<b>1.</b> Per avviare correttamente il programma occorre aprire il cmd digitando la directory della cartella contentente il codice,  in base alla struttura del proprio file system. Ad esempio, per me è:
```sh
cd C:\Users\notmatte\Desktop\Compito CODICE FISCALE
```

<b>2.</b> Una volta entrati nella directory vi basterà digitare un comando specificato nel <code>package.json</code> che eseguirà un comando ben preciso che andrà ad avviare il server dell'API, una volta avviato dovrebbe essere stampato nel terminale questo messaggio: <code>\{^_^}/ hi!</code>.<br>
```sh
npm start
```

<div align="center">
  <a href="https://www.wikihow.it/Trovare-il-Percorso-di-un-File-in-Windows">Scopri come trovare il percorso file di una cartella »</a>
</div>

<br>
<br>

## 🔗 Download dell'intero source code

Clicca nel seguente link di reindirizzamento a Google Drive per ottenere la cartella intera del progetto
dato che, scaricando tutti i file presenti nella repository non funzionerebbe per la mancanza della cartella
con tutti i moduli di node.js denominata <code>node_modules</code>

<a href="https://drive.google.com/file/d/1Uq71kl1QFRYrApBHCSiUZrvUti7aVcE3/view?usp=sharing">Clicca per scaricare tutto il progetto»</a>

<br>
<div align="center">
  <img src="img/3.png" alt="Logo" width="70%">
</div>
<br>

## 💻 Cosa ho usato per realizzare questo progetto

Per realizzare questo progetto mi sono fornito di <code>HTML</code>, <code>CSS</code> e <code>JS</code><br>
Ho usato anche vari framework come **Node.js** per il back-end e **sweetalert** per gli avvisi personalizzati.

* <a href="https://nodejs.org/en/">Node.js»</a>
* <a href="https://sweetalert.js.org/">Sweetalert»</a>

La cosa che più di tutte però mi ha aiutato a rendere possibile il calcolo completo del codice fiscale è la libreria <code>json-server</code> di node.js che mi ha permesso di creare una vera e propria API integrata al codice, che ospitata in locale mi ha permesso di accedere al JSON contentente tutti i comuni italiani presenti nel territorio e sporattutto dotati di codice di catasto.
Riguardo al JSON contentente tutti i comuni italiani ho creato anche una repository apposita e vi consiglio di darci un'occhiata se siete interessati.
<div align="center">
  <a href="https://github.com/NotMatte/JSON-Comuni-Italiani">Vai alla repository del JSON di tutti i comuni italiani»</a>
</div>
<div align="center">
  <a href="https://www.npmjs.com/package/json-server">Scopri di più sulla libreria json-server»</a>
</div>

<br>
<div align="center">
  <img src="img/3.png" alt="Logo" width="70%">
</div>
<br>

## 👩‍💻 Come ho realizzato il codice 

Per la realizzazione del codice ho deciso di creare più funzioni tante quante la parti del codice fiscale, ogni funzione prende in input una stringa e la modifica in base alla richiesta della funzione principale <code>Calcola()</code>, ogni funzione ha quindi un compito ben preciso.

Il tutto dipende dalla divisione in parti del codice fiscale, facendo un esempio prendiamo in considerazione **RSSMRC67C27F205X** (Rossi Marco nato il 27/03/1967 a milano.)<br>

* **RSS** Sono le prime 3 consonanti del nome
* **MRC** Sono le prime 3 consonanti del cognome
* **67** Sono le ultime cifre dall'anno di nascita (1967)
* **C** Riguarda il mese ed ha un <a href="https://www.marbaro.it/lettere-codice-fiscale-mese-nascita.asp">algoritmo specifico»</a>
* **27** È il giorno di nascita
* **F205** È il codice di catasto del comune di nascita (Milano)
* **X** È un carattere di controllo e ha un <a href="https://fiscomania.com/carattere-controllo/">algoritmo specifico»</a>

Riguardo questa divisione ho creato una funzione per ogni parte del codice, ad eccezione delle prime due parti che hanno una funzione per entrambi, poiché effettuano lo stesso compito.<br>
Vi sono però anche alcuni casi particolari da tenere in considerazione, ad esempio se nell'inserimento del giorno di nascita il soggetto è donna è necessario aggiungere 40 al valore (Es. 13 + 40 = 53).<br>Anche per quanto riguarda il nome vi sono casi particolari come per esempio il doppio nome (Es. Gian Carlo), in questo caso basta controllare il numero di consonanti, nel caso fossero uguali o maggiori di 4 vengono prese rispettivamente la 1ª, la 3ª e la 4ª consonante.
Un ulteriore controllo sta proprio nel nome o cognome e bisogna guardare se le consonanti non sono presenti per usare soltanto le vocali o per quanto riguarda restituzioni di parole minori alle 3 lettere, come nel caso di "CA" che diventa "CAX". Infatti, questo controllo aggiunge una X qualora non fosse rispettato il limite di 3 caratteri minimi.

La cosa che più di tutte però mi ha aiutato a rendere possibile il calcolo completo del codice fiscale è la libreria <code>json-server</code> di node.js, la quale mi ha permesso di creare una vera e propria API integrata al codice, che ospitata in locale mi ha permesso di accedere al JSON contentente tutti i comuni italiani presenti nel territorio e soprattutto dotati di codice di catasto.
Riguardo al JSON contentente tutti i comuni dell'italia ho creato anche una repository apposita e vi consiglio di darci un'occhiata se siete interessati.


<br>
<div align="center">
  <img src="img/3.png" alt="Logo" width="70%">
</div>
<br>

## ❓ E se il programma non funziona?

Il principale motivo del malfunzionamento potrebbe essere dvuto alla **porta dove viene ospitata l'API**, di default è impostata a <code>3000</code> ma se è occupata può essere cambiata in 2 semplici passaggi:

* Aprire il file <code>package.json</code> e recarsi alla riga 7 sostituendola con:
```js
"start": "json-server --watch ./script/data/data.json --port <porta>"
//<porta> è un valore che sceglierai tu e che deve essere lungo 4 cifre
```

* Salvare il package.json e recarsi nel file <code>script/script.js</code> alla riga 7 dove viene effettuata la chiamata all'API, per sostutuirla con:
```js
fetch("http://localhost:<porta>/comuni")
//<porta> è il valore scelto precedentemente
```

* Esegui lo stesso passaggio anche per la riga 12:
```js
fetch("http://localhost:<porta>/paesi")
```


<div align="center">
  <a href="https://ds.notmatte.store/">
    <img src="img/6.png" alt="Logo">
  </a>
</div>
