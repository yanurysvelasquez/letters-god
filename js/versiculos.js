// Lista de versículos. Puedes agregar más con el mismo formato.
const versiculos = [
  { texto: "Echad sobre él toda vuestra ansiedad, porque él tiene cuidado de vosotros.", ref: "1 Pedro 5:7", animos: ["ansiosa", "con miedo"] },
  { texto: "Jehová es mi pastor; nada me faltará.", ref: "Salmo 23:1", animos: ["con miedo", "cansada"] },
  { texto: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.", ref: "Mateo 11:28", animos: ["cansada", "triste"] },
  { texto: "Esfuérzate y sé valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo.", ref: "Josué 1:9", animos: ["con miedo"] },
  { texto: "Cercano está Jehová a los quebrantados de corazón.", ref: "Salmo 34:18", animos: ["triste"] },
  { texto: "Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros.", ref: "1 Tesalonicenses 5:18", animos: ["agradecida"] },
  { texto: "Todo lo puedo en Cristo que me fortalece.", ref: "Filipenses 4:13", animos: ["cansada", "con miedo"] },
  { texto: "La paz os dejo, mi paz os doy; no se turbe vuestro corazón.", ref: "Juan 14:27", animos: ["ansiosa", "triste"] },
  { texto: "Alabad a Jehová, porque él es bueno; porque para siempre es su misericordia.", ref: "Salmo 136:1", animos: ["agradecida"] },
  { texto: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.", ref: "Proverbios 3:5", animos: ["ansiosa"] },
  { texto: "Los que esperan a Jehová tendrán nuevas fuerzas.", ref: "Isaías 40:31", animos: ["cansada"] },
  { texto: "Jehová es mi luz y mi salvación; ¿de quién temeré?", ref: "Salmo 27:1", animos: ["con miedo"] },
  { texto: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.", ref: "Romanos 8:28", animos: ["triste", "ansiosa"] },
  { texto: "Bueno es alabar a Jehová, y cantar salmos a tu nombre, oh Altísimo.", ref: "Salmo 92:1", animos: ["agradecida"] },
  { texto: "Sean vuestras peticiones conocidas delante de Dios en toda oración.", ref: "Filipenses 4:6", animos: ["ansiosa"] }
];

// Oraciones cortas para el recomendador
const oraciones = {
  "triste": "Señor, hoy mi corazón está pesado. Abrázame y recuérdame que no estoy sola.",
  "ansiosa": "Dios, te entrego lo que no puedo controlar. Dame calma y confianza en ti.",
  "agradecida": "Gracias, Padre, por todo lo que me das cada día, incluso lo pequeño.",
  "cansada": "Señor, estoy agotada. Renueva mis fuerzas y enséñame a descansar en ti.",
  "con miedo": "Dios, tengo miedo. Sé mi refugio y ayúdame a dar el siguiente paso."
};
