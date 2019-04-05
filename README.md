# Harjoitustyö - Ohjelmallinen sisällönhallinta kevät 2019

https://ohsiha.github.io/2019/

[ Linkki Heroku-sovellukseen, tulossa myöhemmin ]

# Yleistä
Ohjelmassa visualisoidaan säädataa lähteestä openweathermap. Ohjelmassa täytyy rekisteröityä ja kirjautua nähdäkseen datasisältöä. Käyttäjällä on mahdollisuus lisätä kaupunkeja omaan suosikit-listaansa. Kaupungeista nähdään nykyiset säätiedot, sekä viiden päivän sääennuste.

# Ajaminen lokaalisti
- tarvitsee olla node.js asennettuna
- sinun tarvitsee myös avata kaksi terminaalia ajaaksesi molempia sovelluksia
- backend: ```cd backend/ && npm install```
- backend käynnistetään komennolla ```node server.js```
- frontend: ```cd frontend/application/ && npm install```
- frontend käynnistetään komennolla ```npm start```

# Käytetyt teknologiat:
- React + Redux (create-react-app) frontend
- Node.js + Express.js REST API:na toimiva backend
- MongoDB tietokanta pilvipalveluna (https://mlab.com/)
- JSON Web Token autentikaatio (https://jwt.io/)
- Heroku julkaisupalvelimena (https://www.heroku.com/)
- Semantic UI React frontin ulkoasuun (https://github.com/Semantic-Org/Semantic-UI-React)
