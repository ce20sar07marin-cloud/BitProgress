const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

const OUTPUT = path.join(__dirname, "..", "assets", "database", "BitProgress.db");

const SCHEMA = `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;
PRAGMA user_version = 5;

CREATE TABLE IF NOT EXISTS Leccion (
  id_leccion INTEGER PRIMARY KEY AUTOINCREMENT,
  external_id TEXT NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  contenido TEXT NOT NULL,
  nivel TEXT NOT NULL,
  xp_recompensa INTEGER NOT NULL,
  estado INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS Evaluacion (
  id_evaluacion INTEGER PRIMARY KEY AUTOINCREMENT,
  id_leccion INTEGER NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  puntaje_minimo REAL NOT NULL,
  FOREIGN KEY (id_leccion) REFERENCES Leccion(id_leccion) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Pregunta (
  id_pregunta INTEGER PRIMARY KEY AUTOINCREMENT,
  id_evaluacion INTEGER NOT NULL,
  enunciado TEXT NOT NULL,
  tipo_pregunta TEXT NOT NULL,
  puntaje REAL NOT NULL,
  orden_pregunta INTEGER NOT NULL,
  FOREIGN KEY (id_evaluacion) REFERENCES Evaluacion(id_evaluacion) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Respuesta (
  id_respuesta INTEGER PRIMARY KEY AUTOINCREMENT,
  id_pregunta INTEGER NOT NULL,
  texto_respuesta TEXT NOT NULL,
  es_correcta INTEGER NOT NULL CHECK(es_correcta IN (0,1)),
  FOREIGN KEY (id_pregunta) REFERENCES Pregunta(id_pregunta) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Progreso (
  id_progreso INTEGER PRIMARY KEY AUTOINCREMENT,
  id_usuario INTEGER NOT NULL,
  id_leccion INTEGER NOT NULL,
  leccion_completada INTEGER NOT NULL DEFAULT 0 CHECK(leccion_completada IN (0,1)),
  evaluacion_aprobada INTEGER NOT NULL DEFAULT 0 CHECK(evaluacion_aprobada IN (0,1)),
  puntuacion REAL DEFAULT 0,
  fecha_completado TEXT,
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (id_leccion) REFERENCES Leccion(id_leccion) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE (id_usuario, id_leccion)
);

CREATE TABLE IF NOT EXISTS Usuario (
  id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  correo TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  xp_total INTEGER NOT NULL DEFAULT 0,
  fecha_registro TEXT NOT NULL,
  estado INTEGER NOT NULL DEFAULT 1,
  avatar TEXT NOT NULL DEFAULT 'boy'
);

CREATE INDEX IF NOT EXISTS idx_progreso_usuario ON Progreso(id_usuario);
CREATE INDEX IF NOT EXISTS idx_progreso_leccion ON Progreso(id_leccion);
CREATE INDEX IF NOT EXISTS idx_pregunta_evaluacion ON Pregunta(id_evaluacion);
CREATE INDEX IF NOT EXISTS idx_respuesta_pregunta ON Respuesta(id_pregunta);
`;

function mc(question, options, explanation) {
  return { type: "multiple-choice", question, options, explanation };
}
function tf(question, answer, explanation) {
  return {
    type: "true-false",
    question,
    options: [
      { label: "Verdadero", isCorrect: answer === true },
      { label: "Falso", isCorrect: answer === false },
    ],
    explanation,
  };
}
function order(question, correctOrder, explanation) {
  return { type: "ordering", question, correctOrder, explanation };
}
function fill(question, blankAnswer, explanation) {
  return { type: "fill-blank", question, blankAnswer, explanation };
}

function pg(id, title, content, opts = {}) {
  const page = { id, title, content };
  if (opts.illustration) page.illustration = opts.illustration;
  if (opts.conceptBox) page.conceptBox = opts.conceptBox;
  if (opts.quiz) page.quiz = opts.quiz;
  return page;
}

const lessons = [
  {
    id: "b1", moduleId: "basic", title: "Que es una red",
    pages: [
      pg("b1-p1", "Bienvenida",
        "Una red informatica permite que varios dispositivos puedan comunicarse entre si para compartir informacion y recursos.",
        { illustration: "Bienvenida.png" }),
      pg("b1-p2", "Que es una red?",
        "Una red informatica es el conjunto de dos o mas dispositivos conectados para intercambiar informacion. No importa si estan en una casa, una empresa o incluso en diferentes paises; mientras puedan comunicarse, forman parte de una red.",
        { illustration: "Queesunared.png", conceptBox: "Red = dispositivos + conexion + comunicacion." }),
      pg("b1-p3", "Que dispositivos forman una red?",
        "Una red puede estar formada por:\n\n\u2022 Computadoras\n\u2022 Telefonos\n\u2022 Tablets\n\u2022 Servidores\n\u2022 Impresoras\n\u2022 Camaras IP",
        { illustration: "Quedispositivosformanpartedeunared.png" }),
      pg("b1-p4", "Como se comunican?",
        "La informacion viaja en pequenos paquetes de datos. Cada paquete contiene informacion sobre quien lo envia, quien lo recibe y que informacion transporta.",
        { illustration: "Comosecomunican.png" }),
      pg("b1-p5", "Ejemplo cotidiano",
        "Cuando envias un mensaje por WhatsApp:\n\n1. Escribes el mensaje.\n2. Se convierte en datos.\n3. Viaja por Internet.\n4. Llega al telefono del destinatario.\n\nAunque parezca instantaneo, detras ocurre todo un proceso de comunicacion.",
        { illustration: "Ejemplocotiano.png" }),
      pg("b1-p6", "Resumen",
        "\u2714 Una red conecta dispositivos.\n\n\u2714 Permite compartir informacion.\n\n\u2714 Los datos viajan mediante paquetes.\n\n\u2714 Internet es la red mas grande del mundo."),
      pg("b1-p7", "Sabias que...?",
        "El primer mensaje enviado por Internet occurio en 1969. Solo llegaron las letras: LO. El sistema fallo antes de escribir LOGIN.",
        { illustration: "Sabiasque.png" }),
      pg("b1-p8", "Mini reto",
        "Cual de los siguientes dispositivos puede formar parte de una red?\n\n\u25CB Microondas\n\u25CB Router\n\u25CB Ventilador\n\u25CB Licuadora",
        { illustration: "Router.png", quiz: mc(
          "Cual de los siguientes dispositivos puede formar parte de una red?",
          [
            { label: "Microondas", isCorrect: false },
            { label: "Router", isCorrect: true },
            { label: "Ventilador", isCorrect: false },
            { label: "Licuadora", isCorrect: false },
          ],
          "El router es un dispositivo de red que permite la conexion entre dispositivos."
        ) }),
    ],
  },
  {
    id: "b1-2", moduleId: "basic", title: "Por que son importantes las redes",
    pages: [
      pg("b1-2-p1", "Introduccion",
        "Aunque muchas personas no lo notan, las redes forman parte de casi todas las actividades diarias. Desde enviar un mensaje hasta ver un video, siempre hay una red trabajando detras.",
        { illustration: "OndasRadio.png" }),
      pg("b1-2-p2", "Compartir informacion",
        "Una de las principales funciones de una red es permitir que la informacion viaje rapidamente entre dispositivos. Gracias a esto podemos:\n\n\u2022 Enviar documentos.\n\u2022 Compartir fotografias.\n\u2022 Realizar videollamadas.\n\u2022 Intercambiar archivos.",
        { illustration: "DosPCsConectadas.png", conceptBox: "Compartir informacion significa que varios dispositivos pueden acceder a los mismos datos." }),
      pg("b1-2-p3", "Compartir recursos",
        "Las redes tambien permiten compartir recursos fisicos sin necesidad de duplicarlos. Algunos ejemplos son:\n\n\u2022 Impresoras.\n\u2022 Escanneres.\n\u2022 Servidores.\n\u2022 Espacio de almacenamiento.\n\nEsto reduce costos y mejora la organizacion.",
        { illustration: "Impresora.png" }),
      pg("b1-2-p4", "Comunicacion en tiempo real",
        "Las redes hacen posible que personas ubicadas en diferentes lugares puedan comunicarse de forma inmediata. Ejemplos:\n\n\u2022 WhatsApp\n\u2022 Zoom\n\u2022 Microsoft Teams\n\u2022 Google Meet\n\nToda esta informacion viaja en cuestion de segundos.",
        { illustration: "OndasRadio.png" }),
      pg("b1-2-p5", "Acceso a Internet",
        "Internet es la red mas grande del mundo. Gracias a ella podemos:\n\n\u2022 Buscar informacion.\n\u2022 Estudiar.\n\u2022 Comprar en linea.\n\u2022 Trabajar desde casa.\n\u2022 Utilizar redes sociales.\n\nSin redes de computadoras, Internet no existiria.",
        { illustration: "Topologias.png" }),
      pg("b1-2-p6", "Redes en nuestra vida diaria",
        "Las redes estan presentes en:\n\n\u23E2 Hogares\n\u23E2 Escuelas\n\u23E2 Empresas\n\u23E2 Hospitales\n\u23E2 Bancos\n\u23E2 Industrias\n\nActualmente casi todas las organizaciones dependen de una red informatica."),
      pg("b1-2-p7", "Resumen",
        "\u2714 Permiten compartir informacion.\n\n\u2714 Facilitan la comunicacion.\n\n\u2714 Reducen costos.\n\n\u2714 Hacen posible Internet.\n\n\u2714 Conectan personas y dispositivos."),
      pg("b1-2-p8", "Mini reto",
        "Cual NO es una ventaja de una red?\n\n\u25CB Compartir archivos.\n\u25CB Compartir impresoras.\n\u25CB Aumentar la comunicacion.\n\u25CB Evitar totalmente el uso de dispositivos.",
        { illustration: "SoldadoHenry.png", quiz: mc(
          "Cual NO es una ventaja de una red?",
          [
            { label: "Compartir archivos", isCorrect: false },
            { label: "Compartir impresoras", isCorrect: false },
            { label: "Aumentar la comunicacion", isCorrect: false },
            { label: "Evitar totalmente el uso de dispositivos", isCorrect: true },
          ],
          "Las redes facilitan el uso de dispositivos, no lo evitan."
        ) }),
    ],
  },
  {
    id: "b1-3", moduleId: "basic", title: "Tipos de Redes Informaticas",
    pages: [
      pg("b1-3-p1", "Clasificacion de redes por su alcance",
        "No todas las redes tienen el mismo tamano. Algunas conectan dispositivos muy cercanos, mientras que otras conectan millones de equipos alrededor del mundo.\n\nLas redes se clasifican segun la distancia que cubren:\n\n\u2022 PAN \u2192 Persona (hasta 10 metros)\n\u2022 LAN \u2192 Edificio (hasta 1 km)\n\u2022 MAN \u2192 Ciudad (5 a 50 km)\n\u2022 WAN \u2192 Paises y continentes (sin limite)\n\nCada tipo de red tiene caracteristicas diferentes dependiendo de su alcance.",
        { illustration: "ClasificaciondeRedesporsuAlcance.png" }),
      pg("b1-3-p2", "Red LAN (Local Area Network)",
        "La LAN es la red mas comun y la que utilizas con mas frecuencia. Conecta dispositivos dentro de un area limitada como una casa, una oficina, una escuela o un hospital.\n\nCaracteristicas principales:\n\n\u2022 Usa cables Ethernet o Wi-Fi.\n\u2022 Alta velocidad de conexion (100 Mbps a 1 Gbps).\n\u2022 El administrador de la red es una sola persona o empresa.\n\u2022 Cobertura: un piso, un edificio o un campus pequeno.\n\nEjemplos:\n\n\u2022 El Wi-Fi de tu casa que conecta tu celular, computadora y smart TV.\n\u2022 La red de una oficina donde todos los computadores estan conectados.\n\u2022 El laboratorio de una escuela con 30 computadoras en red.",
        { illustration: "EdificioSiete.png", conceptBox: "LAN = Red Local. Conecta dispositivos en un edificio o area pequena." }),
      pg("b1-3-p3", "Red WAN (Wide Area Network)",
        "La WAN es la red mas grande que existe. Conecta redes en diferentes ciudades, paises o incluso continentes. El ejemplo mas grande de WAN es Internet.\n\nCaracteristicas:\n\n\u2022 Cobertura: miles de kilometros.\n\u2022 Usa tecnologias como fibra optica, satelites y enlaces submarinos.\n\u2022 Requiere multiples proveedores y administradores.\n\u2022 La velocidad puede variar dependiendo de la distancia.\n\nEjemplos:\n\n\u2022 Internet: la WAN mas grande del mundo.\n\u2022 La red interna de una empresa multinational que conecta sus oficinas en Mexico, USA y Europa.\n\u2022 Las redes de telefon\u00EDa movil (4G/5G) que cubren paises enteros.",
        { illustration: "Topologias.png", conceptBox: "WAN = Red de Area Amplia. Conecta paises y continentes." }),
      pg("b1-3-p4", "Red MAN (Metropolitan Area Network)",
        "La MAN conecta varias redes LAN distribuidas dentro de una ciudad o zona metropolitana. Es mas grande que una LAN pero mas pequena que una WAN.\n\nCaracteristicas:\n\n\u2022 Cobertura de 5 a 50 kilometros.\n\u2022 Puede usar fibra optica o enlaces inalambricos.\n\u2022 Generalmente la administra una sola organizacion o un proveedor de servicios.\n\nEjemplos:\n\n\u2022 Una universidad con varios campus repartidos por la ciudad, donde todos comparten la misma red.\n\u2022 Una empresa con multiples oficinas en la misma ciudad conectadas entre si.\n\u2022 La red de una municipalidad que conecta sus oficinas en diferentes colonias.",
        { illustration: "EdificioSiete.png", conceptBox: "MAN = Red Metropolitana. Conecta una ciudad completa." }),
      pg("b1-3-p5", "Red PAN (Personal Area Network)",
        "La PAN es la red mas personal y pequena que existe. Conecta dispositivos muy cercanos entre si, generalmente dentro de un radio de 10 metros.\n\nCaracteristicas:\n\n\u2022 Alcance maximo: 10 metros.\n\u2022 No necesita cables ni configuracion complicada.\n\u2022 Usa tecnologias como Bluetooth e Infrarrojo.\n\u2022 Es la red mas sencilla de configurar.\n\nEjemplos del dia a dia:\n\n\u2022 Conectar tus audifonos Bluetooth al celular.\n\u2022 Sincronizar tu smartwatch con el telefono.\n\u2022 Conectar un teclado inalambrico a tu computadora.\n\u2022 Enviar un archivo por Bluetooth de un celular a otro.",
        { illustration: "OndasRadio.png", conceptBox: "PAN = Red Personal. Alcance: hasta 10 metros." }),
      pg("b1-3-p6", "Internet, Intranet y Extranet",
        "Ademas de los tipos de red por alcance, existen otras clasificaciones importantes:\n\n\u2022 Internet: es la red global mas grande del mundo. Conecta millones de dispositivos en todos los paises y permite acceder a servicios como paginas web, correos y redes sociales.\n\n\u2022 Intranet: es una red privada que pertenece a una sola organizacion. Solo las personas autorizadas pueden acceder. Se usa en empresas, hospitales y universidades para compartir informacion interna.\n\n\u2022 Extranet: es una extension de la Intranet que permite acceso limitado a usuarios externos. Por ejemplo, un proveedor que necesita consultar inventarios de una empresa.\n\nComparacion:\n\n\u2022 Internet \u2192 Acceso publico para todos.\n\u2022 Intranet \u2192 Acceso privado solo para la organizacion.\n\u2022 Extranet \u2192 Acceso parcial para usuarios externos autorizados.",
        { illustration: "InternetIntranetyExtranet.png", conceptBox: "Internet = publica. Intranet = privada. Extranet = acceso limitado." }),
      pg("b1-3-p7", "Resumen",
        "\u2714 PAN \u2192 Red personal, hasta 10 metros (Bluetooth).\n\n\u2714 LAN \u2192 Red local, edificios y oficinas (Wi-Fi, Ethernet).\n\n\u2714 MAN \u2192 Red metropolitana, una ciudad completa.\n\n\u2714 WAN \u2192 Red de area amplia, paises y continentes.\n\n\u2714 Internet \u2192 Red global publica.\n\n\u2714 Intranet \u2192 Red privada de una organizacion.\n\n\u2714 Extranet \u2192 Acceso limitado a usuarios externos."),
      pg("b1-3-p8", "Prueba practica", "Demuestra lo que aprendiste sobre los tipos de redes.",
        { quiz: mc(
          "Que tipo de red conecta dispositivos dentro de un edificio?",
          [
            { label: "PAN", isCorrect: false },
            { label: "LAN", isCorrect: true },
            { label: "MAN", isCorrect: false },
            { label: "WAN", isCorrect: false },
          ],
          "La LAN (Local Area Network) conecta dispositivos dentro de un edificio o area pequena como una casa, oficina o escuela."
        ) }),
    ],
  },
  {
    id: "b1-4", moduleId: "basic", title: "Tecnologias de Red que usamos diariamente",
    pages: [
      pg("b1-4-p1", "Diferentes formas de conectar",
        "No todas las conexiones utilizan cables. Hoy en dia existen tecnologias que permiten transmitir informacion tanto por medios fisicos como inalambricos."),
      pg("b1-4-p2", "Ethernet",
        "Ethernet es la tecnologia mas utilizada en redes cableadas. Se caracteriza por:\n\n\u2022 Gran velocidad.\n\u2022 Alta estabilidad.\n\u2022 Baja interferencia.\n\nEs muy comun en empresas y laboratorios.",
        { illustration: "CabelEthernet.png" }),
      pg("b1-4-p3", "Wi-Fi",
        "Wi-Fi permite conectar dispositivos sin utilizar cables. Sus ventajas son:\n\n\u2022 Movilidad.\n\u2022 Facilidad de instalacion.\n\u2022 Acceso desde diferentes dispositivos.\n\nActualmente es la tecnologia inalambrica mas utilizada.",
        { illustration: "OndasRadio.png" }),
      pg("b1-4-p4", "Bluetooth",
        "Bluetooth conecta dispositivos cercanos utilizando ondas de radio. Algunos ejemplos:\n\n\u2022 Audifonos.\n\u2022 Parlantes.\n\u2022 Mouse.\n\u2022 Teclados.\n\nSu alcance suele ser menor que el de Wi-Fi.",
        { illustration: "OndasRadio.png" }),
      pg("b1-4-p5", "Fibra optica",
        "La fibra optica transmite informacion mediante pulsos de luz. Sus ventajas son:\n\n\u2022 Muy alta velocidad.\n\u2022 Gran capacidad.\n\u2022 Baja perdida de senal.\n\nEs ampliamente utilizada por proveedores de Internet.",
        { illustration: "CabelEthernet.png" }),
      pg("b1-4-p6", "Cual tecnologia elegir?",
        "Ethernet \u2192 Oficinas\nWi-Fi \u2192 Hogares\nBluetooth \u2192 Dispositivos personales\nFibra optica \u2192 Internet de alta velocidad",
        { illustration: "CabelEthernet.png" }),
      pg("b1-4-p7", "Conceptos importantes",
        "\uD83D\uDCE1 Wi-Fi\n\uD83D\uDD0C Ethernet\n\uD83D\uDCF6 Bluetooth\n\uD83D\uDCA1 Fibra optica\n\nCada tecnologia tiene ventajas y aplicaciones especificas segun las necesidades de la red."),
      pg("b1-4-p8", "Mini reto",
        "Cual tecnologia utiliza pulsos de luz para transmitir datos?\n\n\u25CB Bluetooth\n\u25CB Wi-Fi\n\u25CB Ethernet\n\u25CB Fibra optica",
        { illustration: "CabelEthernet.png" }),
      pg("b1-4-p9", "Prueba practica", "Demuestra lo que aprendiste sobre tecnologias de red.",
        { quiz: mc(
          "Cual tecnologia utiliza pulsos de luz para transmitir datos?",
          [
            { label: "Bluetooth", isCorrect: false },
            { label: "Wi-Fi", isCorrect: false },
            { label: "Ethernet", isCorrect: false },
            { label: "Fibra optica", isCorrect: true },
          ],
          "La fibra optica transmite informacion mediante pulsos de luz a traves de cables de vidrio."
        ) }),
    ],
  },
  {
    id: "b1-5", moduleId: "basic", title: "Internet: La Red de Redes",
    pages: [
      pg("b1-5-p1", "Introduccion",
        "Internet es una enorme red que conecta millones de dispositivos alrededor del mundo. Gracias a ella, las personas pueden comunicarse, compartir informacion y acceder a servicios desde cualquier lugar.",
        { illustration: "Topologias.png" }),
      pg("b1-5-p2", "Como funciona Internet?",
        "Cuando utilizas una aplicacion o visitas una pagina web, la informacion viaja desde tu dispositivo hasta un servidor y luego regresa con una respuesta.\n\nEste proceso ocurre en apenas unos segundos.",
        { illustration: "EdificioSiete.png" }),
      pg("b1-5-p3", "Que es un servidor?",
        "Un servidor es una computadora disenada para ofrecer informacion o servicios a otros dispositivos llamados clientes.\n\nEjemplos de servidores:\n\n\u2022 Servidores web.\n\u2022 Servidores de correo.\n\u2022 Servidores de videojuegos.\n\u2022 Servidores en la nube.",
        { illustration: "EdificioSiete.png", conceptBox: "Cliente: solicita informacion.\nServidor: responde a la solicitud." }),
      pg("b1-5-p4", "Servicios que ofrece Internet",
        "Internet permite utilizar diferentes servicios, como:\n\n\u2022 Navegar por paginas web.\n\u2022 Enviar correos electronicos.\n\u2022 Realizar videollamadas.\n\u2022 Almacenar archivos en la nube.\n\u2022 Ver peliculas y escuchar musica.",
        { illustration: "AppsEnPC.png" }),
      pg("b1-5-p5", "Navegando por la Web",
        "La World Wide Web (WWW) es uno de los servicios mas populares de Internet.\n\nCuando escribes una direccion web, tu navegador solicita la informacion a un servidor para mostrar la pagina.",
        { illustration: "HTTP.png" }),
      pg("b1-5-p6", "Curiosidad",
        "Internet y la Web no son lo mismo.\n\nInternet es la infraestructura que conecta millones de dispositivos.\n\nLa Web (WWW) es uno de los muchos servicios que funcionan sobre Internet."),
      pg("b1-5-p7", "Resumen",
        "\u2714 Internet conecta redes de todo el mundo.\n\n\u2714 Los servidores ofrecen servicios.\n\n\u2714 Los clientes solicitan informacion.\n\n\u2714 La Web es uno de los servicios de Internet."),
      pg("b1-5-p8", "Mini reto",
        "Quien proporciona la informacion al usuario?\n\n\u25CB Cliente\n\u25CB Servidor\n\u25CB Switch\n\u25CB Router",
        { illustration: "EdificioSiete.png", quiz: mc(
          "Quien proporciona la informacion al usuario?",
          [
            { label: "Cliente", isCorrect: false },
            { label: "Servidor", isCorrect: true },
            { label: "Switch", isCorrect: false },
            { label: "Router", isCorrect: false },
          ],
          "El servidor responde a las solicitudes del cliente proporcionando la informacion."
        ) }),
    ],
  },
  {
    id: "b1-6", moduleId: "basic", title: "Aplicaciones Cotidianas de las Redes",
    pages: [
      pg("b1-6-p1", "Las redes estan en todas partes",
        "Desde que despiertas hasta que termina el dia, utilizas redes sin darte cuenta.\n\nCada mensaje, busqueda o compra depende de una infraestructura de comunicacion.",
        { illustration: "OndasRadio.png" }),
      pg("b1-6-p2", "En el hogar",
        "Las redes permiten conectar:\n\n\u2022 Computadoras.\n\u2022 Celulares.\n\u2022 Smart TV.\n\u2022 Consolas.\n\u2022 Camaras de seguridad.\n\u2022 Asistentes virtuales.\n\nTodos pueden compartir la misma conexion a Internet.",
        { illustration: "DosPCsConectadas.png" }),
      pg("b1-6-p3", "En la educacion",
        "Las instituciones educativas utilizan redes para:\n\n\u2022 Plataformas virtuales.\n\u2022 Bibliotecas digitales.\n\u2022 Videoconferencias.\n\u2022 Laboratorios.\n\u2022 Compartir documentos.\n\nLas redes facilitan el aprendizaje a distancia.",
        { illustration: "AppsEnPC.png" }),
      pg("b1-6-p4", "En las empresas",
        "Las organizaciones utilizan redes para:\n\n\u2022 Compartir archivos.\n\u2022 Controlar inventarios.\n\u2022 Gestionar clientes.\n\u2022 Comunicarse entre sedes.\n\u2022 Realizar videoconferencias.\n\nSin redes, muchas empresas no funcionarian.",
        { illustration: "EdificioSiete.png" }),
      pg("b1-6-p5", "En hospitales",
        "Las redes ayudan a:\n\n\u2022 Consultar historias clinicas.\n\u2022 Compartir resultados medicos.\n\u2022 Monitorear pacientes.\n\u2022 Coordinar emergencias.\n\nLa informacion puede llegar rapidamente a los especialistas.",
        { illustration: "RedPrivada.png" }),
      pg("b1-6-p6", "En bancos",
        "Cuando realizas una transferencia o pagas con tarjeta, la informacion viaja por una red segura.\n\nEsto permite realizar operaciones financieras en pocos segundos.",
        { illustration: "RedPrivada.png" }),
      pg("b1-6-p7", "Resumen",
        "Las redes estan presentes en:\n\n\u23E2 Hogares\n\u23E2 Escuelas\n\u23E2 Empresas\n\u23E2 Hospitales\n\u23E2 Bancos\n\u23E2 Gobiernos"),
      pg("b1-6-p8", "Mini reto",
        "Cual de estos lugares depende de una red informatica?\n\n\u25CB Hospital\n\u25CB Banco\n\u25CB Escuela\n\u25CB Todos los anteriores",
        { illustration: "SoldadoHenry.png", quiz: mc(
          "Cual de estos lugares depende de una red informatica?",
          [
            { label: "Hospital", isCorrect: false },
            { label: "Banco", isCorrect: false },
            { label: "Escuela", isCorrect: false },
            { label: "Todos los anteriores", isCorrect: true },
          ],
          "Hospitales, bancos y escuelas dependen de redes informaticas."
        ) }),
    ],
  },
  {
    id: "b1-7", moduleId: "basic", title: "Conceptos Fundamentales de Redes",
    pages: [
      pg("b1-7-p1", "Antes de continuar...",
        "Ahora que conoces que es una red, aprenderas algunos terminos que apareceran constantemente durante el curso.",
        { illustration: "SoldadoHenry.png" }),
      pg("b1-7-p2", "Nodo",
        "Un nodo es cualquier dispositivo conectado a una red.\n\nPuede ser:\n\n\u2022 Una computadora.\n\u2022 Un telefono.\n\u2022 Un servidor.\n\u2022 Una impresora.\n\u2022 Un router.",
        { illustration: "Router.png", conceptBox: "Todo dispositivo conectado es un nodo." }),
      pg("b1-7-p3", "Enlace",
        "Un enlace es el medio que permite comunicar dos dispositivos.\n\nPuede ser:\n\n\u2022 Cableado.\n\u2022 Inalambrico.\n\nLos enlaces transportan los datos entre los nodos.",
        { illustration: "CabelEthernet.png" }),
      pg("b1-7-p4", "Paquete de datos",
        "La informacion no viaja completa.\n\nSe divide en pequenas unidades llamadas paquetes.\n\nCada paquete contiene:\n\n\u2022 Origen.\n\u2022 Destino.\n\u2022 Datos.\n\u2022 Informacion de control.",
        { illustration: "Paquete.png" }),
      pg("b1-7-p5", "Ancho de banda",
        "El ancho de banda representa la cantidad de informacion que puede transmitirse por una red en un determinado tiempo.\n\nMayor ancho de banda significa mayor capacidad de transmision."),
      pg("b1-7-p6", "Latencia",
        "La latencia es el tiempo que tarda un dato en viajar desde el origen hasta el destino.\n\nUna menor latencia significa una comunicacion mas rapida."),
      pg("b1-7-p7", "Glosario rapido",
        "Nodo\nEnlace\nPaquete\nAncho de banda\nLatencia\nCliente\nServidor\n\nEstos conceptos apareceran durante todo el curso."),
      pg("b1-7-p8", "Mini reto",
        "Que termino describe el tiempo que tarda un dato en viajar?\n\n\u25CB Nodo\n\u25CB Latencia\n\u25CB Paquete\n\u25CB Ethernet",
        { illustration: "Paquete.png" }),
      pg("b1-7-p9", "Prueba practica", "Demuestra lo que aprendiste sobre conceptos fundamentales.",
        { quiz: order(
          "Ordena estos conceptos del mas basico al mas avanzado:",
          ["Nodo", "Enlace", "Paquete", "Ancho de banda", "Latencia"],
          "Un nodo es un dispositivo, un enlace lo conecta, los datos viajan en paquetes, el ancho de banda mide capacidad y la latencia mide tiempo."
        ) }),
    ],
  },
  {
    id: "b1-8", moduleId: "basic", title: "Recorrido de un Dato en una Red",
    pages: [
      pg("b1-8-p1", "Introduccion",
        "Cuando envias un mensaje o abres una pagina web, la informacion no aparece por arte de magia. Los datos recorren un camino pasando por varios dispositivos antes de llegar a su destino.",
        { illustration: "DosPCsConectadas.png" }),
      pg("b1-8-p2", "Paso 1: El dispositivo crea los datos",
        "Todo comienza cuando realizas una accion, como enviar un mensaje, abrir una pagina web o reproducir un video.\n\nTu dispositivo convierte esa accion en informacion digital.",
        { illustration: "Paquete.png" }),
      pg("b1-8-p3", "Paso 2: Los datos llegan al router",
        "El router recibe la informacion y decide hacia donde debe enviarla.\n\nEs el encargado de conectar tu red local con Internet.",
        { illustration: "Router.png", conceptBox: "El router actua como un guia que indica el mejor camino para los datos." }),
      pg("b1-8-p4", "Paso 3: Viaje por Internet",
        "Los datos recorren diferentes redes hasta llegar al servidor o al dispositivo destino.\n\nEste recorrido puede atravesar ciudades, paises o incluso continentes.",
        { illustration: "Topologias.png" }),
      pg("b1-8-p5", "Paso 4: El servidor responde",
        "Si la informacion solicitada esta en un servidor (por ejemplo, una pagina web), este procesa la peticion y envia una respuesta.",
        { illustration: "EdificioSiete.png" }),
      pg("b1-8-p6", "Paso 5: Los datos regresan",
        "La respuesta vuelve por la red hasta llegar a tu dispositivo.\n\nTodo este proceso ocurre en pocos segundos.",
        { illustration: "EdificioSiete.png" }),
      pg("b1-8-p7", "Resumen",
        "Todo mensaje sigue un recorrido similar:\n\n\u2714 Dispositivo\n\u27A1 Router\n\u27A1 Internet\n\u27A1 Servidor\n\u27A1 Internet\n\u27A1 Router\n\u27A1 Dispositivo",
        { illustration: "Topologias.png" }),
      pg("b1-8-p8", "Mini reto",
        "Quien conecta normalmente tu red domestica con Internet?\n\n\u25CB Switch\n\u25CB Router\n\u25CB Impresora\n\u25CB Servidor",
        { illustration: "Router.png", quiz: mc(
          "Quien conecta normalmente tu red domestica con Internet?",
          [
            { label: "Switch", isCorrect: false },
            { label: "Router", isCorrect: true },
            { label: "Impresora", isCorrect: false },
            { label: "Servidor", isCorrect: false },
          ],
          "El router conecta tu red local con Internet."
        ) }),
    ],
  },
  {
    id: "b1-9", moduleId: "basic", title: "Repaso General del Modulo",
    pages: [
      pg("b1-9-p1", "Felicidades!",
        "Has completado el primer modulo de BitProgress.\n\nAhora es momento de repasar todo lo aprendido antes de continuar.",
        { illustration: "SoldadoHenry.png" }),
      pg("b1-9-p2", "Lo que aprendiste",
        "Durante este modulo conociste:\n\n\u2022 Que es una red.\n\u2022 Para que sirven.\n\u2022 Tipos de redes.\n\u2022 Tecnologias de comunicacion.\n\u2022 Internet.\n\u2022 Aplicaciones cotidianas.\n\u2022 Conceptos basicos.\n\u2022 Como viajan los datos."),
      pg("b1-9-p3", "Conceptos clave",
        "\u2714 Red\n\n\u2714 Nodo\n\n\u2714 Router\n\n\u2714 Servidor\n\n\u2714 Cliente\n\n\u2714 Internet\n\n\u2714 LAN\n\n\u2714 WAN\n\n\u2714 Ethernet\n\n\u2714 Wi-Fi\n\n\u2714 Paquete"),
      pg("b1-9-p4", "Relaciona los conceptos",
        "Actividad interactiva:\n\n\u2022 Router \u2192 Conecta redes\n\u2022 Servidor \u2192 Proporciona servicios\n\u2022 Cliente \u2192 Solicita informacion\n\u2022 Nodo \u2192 Dispositivo conectado\n\nActividad: Arrastra cada definicion al concepto correcto.",
        { illustration: "SoldadoHenry.png" }),
      pg("b1-9-p5", "Completa la oracion",
        "Una red informatica permite que varios __________ puedan compartir __________ e intercambiar __________.\n\nRespuesta: Dispositivos \u2013 recursos \u2013 informacion."),
      pg("b1-9-p6", "Verdadero o falso",
        "Internet es una red local. \u274C Falso.\n\nUna LAN conecta paises. \u274C Falso.\n\nEl Wi-Fi permite conexiones inalambricas. \u2705 Verdadero.\n\nLos servidores ofrecen servicios a los clientes. \u2705 Verdadero."),
      pg("b1-9-p7", "Desafio Final",
        "Cual seria el orden correcto?\n\n\u2022 Computadora\n\u2022 Internet\n\u2022 Servidor\n\u2022 Router\n\nRespuesta: Computadora \u27A1 Router \u27A1 Internet \u27A1 Servidor",
        { illustration: "SoldadoHenry.png" }),
      pg("b1-9-p8", "Prueba practica", "Pon a prueba todo lo que aprendiste en el Modulo 1.",
        { quiz: order(
          "Ordena el recorrido correcto de un dato en una red:",
          ["Dispositivo", "Router", "Internet", "Servidor"],
          "Los datos viajan desde tu dispositivo, pasan por el router, recorren Internet hasta el servidor, y regresan por el mismo camino."
        ) }),
    ],
  },
  {
    id: "b2", moduleId: "basic", title: "Tipos de redes",
    pages: [
      pg("b2-p1", "Clasificacion por alcance",
        "Las redes se clasifican segun la distancia que cubren. Una PAN conecta dispositivos muy cercanos. Una LAN cubre un edificio. Una WAN abarca ciudades o paises.",
        { illustration: "Topologias.png" }),
      pg("b2-p2", "LAN y WAN",
        "La LAN es la red mas comun, se encuentra en hogares, oficinas y escuelas. La WAN conecta multiples LAN entre si, siendo Internet el ejemplo mas grande de WAN del mundo.",
        { illustration: "LANyWAN.png" }),
      pg("b2-p3", "MAN y PAN",
        "La MAN (Metropolitan Area Network) cubre una ciudad entera. La PAN es la mas personal, conectando tus dispositivos como celular, audifonos y reloj inteligente mediante Bluetooth.",
        { illustration: "MANyPAN.png" }),
      pg("b2-p4", "Internet, Intranet y Extranet",
        "Internet es la red global. Una Intranet es una red privada de una organizacion. Una Extranet permite acceso limitado a usuarios externos de una Intranet.",
        { illustration: "RedPrivada.png" }),
      pg("b2-p5", "Topologias de red",
        "Las topologias describen como estan organizados los dispositivos en una red. La topologia estrella es la mas comun: todos se conectan a un punto central (switch). La topologia bus usa un cable principal compartido. La topologia anillo forma un circulo cerrado.",
        { illustration: "StarTopologia.png" }),
      pg("b2-p6", "Ejemplos cotidianos",
        "En tu hogar, tu WiFi es una PAN/LAN que conecta celular, laptop y TV. Tu escuela tiene una LAN que conecta computers y impresoras. Internet es la WAN que conecta todo el mundo. Bluetooth es un ejemplo perfecto de PAN.",
        { illustration: "EdificioSiete.png" }),
      pg("b2-p7", "Resumen",
        "\u2714 Las redes se clasifican por alcance: PAN, LAN, MAN y WAN.\n\n\u2714 Internet es la WAN mas grande.\n\n\u2714 Intranet y Extranet son variantes privadas.\n\n\u2714 Las topologias describen la forma de la red.\n\n\u2714 Bluetooth es un ejemplo de PAN."),
      pg("b2-p8", "Prueba practica", "Demuestra lo que aprendiste sobre tipos de redes.",
        { quiz: mc(
          "Que tipo de red cubre un edificio completo?",
          [
            { label: "PAN", isCorrect: false },
            { label: "LAN", isCorrect: true },
            { label: "MAN", isCorrect: false },
            { label: "WAN", isCorrect: false },
          ],
          "Una LAN (Local Area Network) conecta dispositivos dentro de un edificio o area local."
        ) }),
    ],
  },
  {
    id: "b3", moduleId: "basic", title: "Dispositivos de red",
    pages: [
      pg("b3-p1", "Dispositivos de conexion",
        "Para que una red exista necesitas dispositivos que permitan la comunicacion. Los mas comunes son el modem, el router y el switch, cada uno con una funcion diferente dentro de la red.",
        { illustration: "DispositivosdeConexion.png" }),
      pg("b3-p2", "Router y Switch",
        "El router conecta redes diferentes y dirige el trafico de datos. El switch conecta dispositivos dentro de la misma red local, enviando datos solo al dispositivo correcto.",
        { illustration: "RouterySwiches.png" }),
      pg("b3-p3", "Otros dispositivos",
        "Un punto de acceso WiFi permite la conexion inalambrica. Un firewall protege la red de accesos no autorizados. Los servidores almacenan y distribuyen datos a los demas dispositivos.",
        { illustration: "OtrosDispositivos.png" }),
      pg("b3-p4", "Resumen",
        "\u2714 Los dispositivos de red incluyen modems, routers, switches, puntos de acceso WiFi, firewalls y servidores.\n\n\u2714 Cada uno cumple una funcion especifica para mantener la red funcionando."),
      pg("b3-p5", "Prueba practica", "Demuestra lo que aprendiste sobre dispositivos de red.",
        { quiz: tf(
          "El switch conecta dispositivos dentro de la misma red local.",
          true,
          "El switch envia datos solo al dispositivo correcto dentro de la misma red local."
        ) }),
    ],
  },
  {
    id: "i1", moduleId: "intermediate", title: "Direccionamiento IP",
    pages: [
      pg("i1-p1", "Que es una IP",
        "Una direccion IP es un identificador numerico asignado a cada dispositivo dentro de una red. Su funcion es permitir que los dispositivos se encuentren y se comuniquen entre si.",
        { illustration: "QueesunaIP.png" }),
      pg("i1-p2", "IPv4",
        "IPv4 utiliza direcciones de 32 bits, lo que permite aproximadamente 4.3 mil millones de direcciones unicas. Se escribe en cuatro grupos de numeros del 0 al 255 separados por puntos, como 192.168.1.1.",
        { illustration: "IPv4.png" }),
      pg("i1-p3", "IPv6",
        "IPv6 utiliza direcciones de 128 bits para resolver el agotamiento de IPv4. Se escribe en ocho grupos de numeros hexadecimales separados por dos puntos.",
        { illustration: "IPv6.png" }),
      pg("i1-p4", "Direccion IP publica vs privada",
        "Una IP publica es visible en Internet y la asigna tu proveedor. Una IP privada solo funciona dentro de tu red local, como 192.168.x.x, y no es visible desde fuera.",
        { illustration: "DireccionIPpublicavsIPprivada.png" }),
      pg("i1-p5", "MAC Address",
        "La direccion MAC es un identificador fisico unico grabado en la tarjeta de red de cada dispositivo. A diferencia de la IP, la MAC no cambia independientemente de la red a la que te conectes.",
        { illustration: "MACAddress.png" }),
      pg("i1-p6", "Resumen",
        "\u2714 Las direcciones IP identifican dispositivos en una red.\n\n\u2714 IPv4 usa 32 bits, IPv6 usa 128 bits.\n\n\u2714 Las IPs publicas son para Internet, las privadas para redes locales.\n\n\u2714 La MAC Address es el ID fisico del dispositivo."),
      pg("i1-p7", "Prueba practica", "Demuestra lo que aprendiste sobre direccionamiento IP.",
        { quiz: mc(
          "Cuantos bits utiliza una direccion IPv4?",
          [
            { label: "16 bits", isCorrect: false },
            { label: "32 bits", isCorrect: true },
            { label: "64 bits", isCorrect: false },
            { label: "128 bits", isCorrect: false },
          ],
          "IPv4 utiliza direcciones de 32 bits, lo que permite aproximadamente 4.3 mil millones de direcciones."
        ) }),
    ],
  },
  {
    id: "i2", moduleId: "intermediate", title: "Subredes y mascara",
    pages: [
      pg("i2-p1", "Que es una subred",
        "Una subred es una division de una red mas grande. Permite organizar los dispositivos en grupos, mejorar el rendimiento y facilitar la administracion del trafico de datos.",
        { illustration: "QueesUnaSubred.png" }),
      pg("i2-p2", "La mascara de subred",
        "La mascara de subred determina que parte de una direccion IP corresponde a la red y cual a los dispositivos. Se escribe como 255.255.255.0, indicando que los primeros tres octetos son la red.",
        { illustration: "LaMasccaraDeSubred.png" }),
      pg("i2-p3", "CIDR",
        "CIDR (Classless Inter-Domain Routing) es una forma mas flexible de representar subredes usando una barra y un numero, como /24. Indica cuantos bits corresponden a la red.",
        { illustration: "CIDR.png" }),
      pg("i2-p4", "Calcular subredes",
        "Para calcular subredes necesitas saber cuantos dispositivos conectados tendras. Cada subred necesita una direccion de red, una de broadcast y al menos una IP para el router.",
        { illustration: "CalcularSubredes.png" }),
      pg("i2-p5", "Resumen",
        "\u2714 Las subredes dividen una red grande en partes mas pequenas.\n\n\u2714 La mascara determina la red vs los dispositivos.\n\n\u2714 CIDR es la notacion moderna para representar subredes."),
      pg("i2-p6", "Prueba practica", "Demuestra lo que aprendiste sobre subredes y mascaras.",
        { quiz: fill(
          "La mascara de subred 255.255.255.0 indica que los primeros ___ octetos son la red.",
          ["tres", "3"],
          "255.255.255.0 indica que los primeros tres octetos identifican la red y el ultimo identifica los dispositivos."
        ) }),
    ],
  },
  {
    id: "i3", moduleId: "intermediate", title: "Topologias de red",
    pages: [
      pg("i3-p1", "Que es una topologia",
        "La topologia de red es la forma en que los dispositivos estan organizados y conectados. Puede ser fisica (cableado real) o logica (como fluyen los datos).",
        { illustration: "QueesUnaTopologia.png" }),
      pg("i3-p2", "Topologia estrella",
        "En la topologia estrella todos los dispositivos se conectan a un punto central, normalmente un switch. Es la mas comun en hogares y oficinas por su facilidad de administracion.",
        { illustration: "TopologiadeEstrella.png" }),
      pg("i3-p3", "Topologia bus y anillo",
        "En la topologia bus todos comparten un cable principal. En la topologia anillo los dispositivos forman un circulo cerrado. Ambas son menos utilizadas hoy en dia.",
        { illustration: "TopologiadeBusyAnillo.png" }),
      pg("i3-p4", "Topologia malla",
        "En la topologia malla cada dispositivo se conecta con varios otros. Ofrece alta disponibilidad pero es costosa. Se usa en redes criticas como las de telecomunicaciones.",
        { illustration: "Topologiademalla.png" }),
      pg("i3-p5", "Prueba practica", "Demuestra lo que aprendiste sobre topologias de red.",
        { quiz: mc(
          "En que topologia todos los dispositivos se conectan a un punto central?",
          [
            { label: "Bus", isCorrect: false },
            { label: "Anillo", isCorrect: false },
            { label: "Estrella", isCorrect: true },
            { label: "Malla", isCorrect: false },
          ],
          "En la topologia estrella todos los dispositivos se conectan a un punto central, normalmente un switch."
        ) }),
    ],
  },
  {
    id: "a1", moduleId: "advanced", title: "Protocolos TCP/IP",
    pages: [
      pg("a1-p1", "Que es TCP/IP",
        "TCP/IP es el conjunto de protocolos que hace funcionar a Internet. TCP se encarga de dividir y reensamblar los datos. IP se encarga de dirigir los paquetes al destino correcto.",
        { illustration: "QueesTCP_IP.png" }),
      pg("a1-p2", "Capas del modelo TCP/IP",
        "El modelo tiene 4 capas: Acceso a red, Internet (direccionamiento IP), Transporte (TCP/UDP) y Aplicacion (HTTP, DNS, FTP). Cada capa tiene un rol especifico.",
        { illustration: "ModeloTCP.png" }),
      pg("a1-p3", "TCP vs UDP",
        "TCP es confiable: verifica que todos los paquetes lleguen en orden. UDP es rapido pero no garantiza la entrega. TCP se usa en web y correo. UDP se usa en videojuegos y streaming.",
        { illustration: "TCPvsUDP.png" }),
      pg("a1-p4", "DNS y HTTP",
        "DNS traduce nombres de dominio a direcciones IP. HTTP es el protocolo para transferir paginas web. HTTPS anade cifrado para mayor seguridad.",
        { illustration: "DNSyHTTP.png" }),
      pg("a1-p5", "Resumen",
        "\u2714 TCP/IP es la base de Internet.\n\n\u2714 Tiene 4 capas y usa TCP para datos confiables y UDP para datos rapidos.\n\n\u2714 DNS resuelve nombres y HTTP transfiere paginas web."),
      pg("a1-p6", "Prueba practica", "Demuestra lo que aprendiste sobre protocolos TCP/IP.",
        { quiz: tf(
          "TCP es mas rapido que UDP pero no garantiza la entrega.",
          false,
          "UDP es mas rapido que TCP, pero no garantiza la entrega. TCP es confiable pero mas lento."
        ) }),
    ],
  },
  {
    id: "a2", moduleId: "advanced", title: "Puertos y servicios",
    pages: [
      pg("a2-p1", "Que es un puerto",
        "Un puerto es un numero del 0 al 65535 que identifica un servicio o aplicacion especifica dentro de un dispositivo. Permite que multiples servicios funcionen en el mismo equipo simultaneamente.",
        { illustration: "QueesunPuerto.png" }),
      pg("a2-p2", "Puertos comunes",
        "Puerto 80: HTTP (web sin cifrar).\nPuerto 443: HTTPS (web cifrada).\nPuerto 22: SSH (acceso remoto).\nPuerto 53: DNS (resolucion de nombres).\nPuerto 25: SMTP (correo saliente).",
        { illustration: "PuertosComunes.png" }),
      pg("a2-p3", "Servicios de red",
        "Un servicio es una funcion que ofrece un servidor a los clientes. Los mas comunes son web (HTTP), correo (SMTP/IMAP), DNS, FTP y DHCP (asignacion automatica de IPs).",
        { illustration: "ServiciosdeRed.png" }),
      pg("a2-p4", "Firewall y puertos",
        "Un firewall controla que puertos estan abiertos o cerrados. Cerrar puertos innecesarios reduce la superficie de ataque. Solo se deben abrir los puertos que realmente se necesitan.",
        { illustration: "FirewallyPuertos.png" }),
      pg("a2-p5", "Prueba practica", "Demuestra lo que aprendiste sobre puertos y servicios.",
        { quiz: fill(
          "El puerto ___ se utiliza para conexiones HTTPS (web cifrada).",
          "443",
          "El puerto 443 se utiliza para HTTPS, que es la version cifrada del protocolo HTTP."
        ) }),
    ],
  },
  {
    id: "a3", moduleId: "advanced", title: "Seguridad en red",
    pages: [
      pg("a3-p1", "Principales amenazas",
        "Las redes enfrentan amenazas como malware, phishing, ataques DDoS y accesos no autorizados. Conocer estas amenazas es el primer paso para protegerse.",
        { illustration: "PrincipalesAmenazas.png" }),
      pg("a3-p2", "Cifrado de datos",
        "El cifrado convierte los datos en codigo ilegible para quien no tenga la clave. TLS/SSL protege el trafico web. WPA2/WPA3 cifra las conexiones WiFi.",
        { illustration: "CifradodeDatos.png" }),
      pg("a3-p3", "Autenticacion y contrasenas",
        "La autenticacion verifica tu identidad. Usa contrasenas fuertes (12+ caracteres, mezcla de tipos). La autenticacion de dos factores (2FA) anade una capa extra de seguridad.",
        { illustration: "AutenticacionyContraceñas.png" }),
      pg("a3-p4", "Buenas practicas",
        "Mantene tus dispositivos actualizados. No hagas clic en enlaces sospechosos. Usa antivirus. Configura tu firewall. Haz copias de seguridad periodicas. Usa VPN en redes publicas.",
        { illustration: "BuenasPracticas.png" }),
      pg("a3-p5", "Resumen",
        "\u2714 La seguridad de red requiere cifrado, autenticacion fuerte y buenas practicas.\n\n\u2714 Conocer las amenazas y aplicar medidas basicas protege tu informacion."),
      pg("a3-p6", "Prueba practica", "Demuestra lo que aprendiste sobre seguridad en red.",
        { quiz: order(
          "Ordena estas buenas practicas de seguridad de menor a mayor complejidad:",
          ["No hagas clic en enlaces sospechosos", "Usa contrasenas fuertes", "Configura tu firewall", "Usa VPN en redes publicas"],
          "Desde habitos simples como no clickear enlaces sospechosos, hasta configuraciones mas avanzadas como firewalls y VPNs."
        ) }),
    ],
  },
];

const evaluations = [
  {
    id: "b1", moduleId: "basic", title: "Fundamentos de Redes",
    pages: [
      { id: "b1-e1", title: "Pregunta 1", quiz: mc("Que es una red informatica?", [
        { label: "Dispositivos conectados para compartir informacion", isCorrect: true },
        { label: "Un tipo de cable", isCorrect: false },
        { label: "Un programa de computadora", isCorrect: false },
        { label: "Un dispositivo solitario", isCorrect: false },
      ])},
      { id: "b1-e2", title: "Pregunta 2", quiz: mc("Cual de estos dispositivos puede formar parte de una red?", [
        { label: "Router", isCorrect: true },
        { label: "Microondas", isCorrect: false },
        { label: "Ventilador", isCorrect: false },
        { label: "Licuadora", isCorrect: false },
      ])},
      { id: "b1-e3", title: "Pregunta 3", quiz: mc("Que tipo de red es el Wi-Fi de tu casa?", [
        { label: "LAN", isCorrect: true },
        { label: "WAN", isCorrect: false },
        { label: "PAN", isCorrect: false },
        { label: "MAN", isCorrect: false },
      ])},
      { id: "b1-e4", title: "Pregunta 4", quiz: mc("Que tecnologia utiliza pulsos de luz para transmitir datos?", [
        { label: "Fibra optica", isCorrect: true },
        { label: "Wi-Fi", isCorrect: false },
        { label: "Bluetooth", isCorrect: false },
        { label: "Ethernet", isCorrect: false },
      ])},
      { id: "b1-e5", title: "Pregunta 5", quiz: mc("Que es un servidor?", [
        { label: "Una computadora que ofrece servicios a otros dispositivos", isCorrect: true },
        { label: "Un tipo de cable", isCorrect: false },
        { label: "Un celular conectado a internet", isCorrect: false },
        { label: "Un programa de messenger", isCorrect: false },
      ])},
      { id: "b1-e6", title: "Pregunta 6", quiz: mc("Que permite una red informatica?", [
        { label: "Comunicarse y compartir recursos", isCorrect: true },
        { label: "Solo enviar correos", isCorrect: false },
        { label: "Imprimir documentos unicamente", isCorrect: false },
        { label: "Nada mas navegar en internet", isCorrect: false },
      ])},
      { id: "b1-e7", title: "Pregunta 7", quiz: order("Ordena el recorrido correcto de un dato en una red:", ["Dispositivo", "Router", "Internet", "Servidor"])},
      { id: "b1-e8", title: "Pregunta 8", quiz: tf("Internet es la red mas grande del mundo.", true)},
    ],
  },
  {
    id: "b2", moduleId: "basic", title: "Tipos de Redes",
    pages: [
      { id: "b2-e1", title: "Pregunta 1", quiz: mc("Que tipo de red conecta dispositivos dentro de un edificio?", [
        { label: "LAN", isCorrect: true },
        { label: "WAN", isCorrect: false },
        { label: "PAN", isCorrect: false },
        { label: "MAN", isCorrect: false },
      ])},
      { id: "b2-e2", title: "Pregunta 2", quiz: mc("Cual es el alcance maximo de una PAN?", [
        { label: "10 metros", isCorrect: true },
        { label: "1 km", isCorrect: false },
        { label: "50 km", isCorrect: false },
        { label: "Sin limite", isCorrect: false },
      ])},
      { id: "b2-e3", title: "Pregunta 3", quiz: mc("Que tipo de red cubre una ciudad completa?", [
        { label: "MAN", isCorrect: true },
        { label: "LAN", isCorrect: false },
        { label: "PAN", isCorrect: false },
        { label: "WAN", isCorrect: false },
      ])},
      { id: "b2-e4", title: "Pregunta 4", quiz: mc("Que es una Intranet?", [
        { label: "Una red privada de una organizacion", isCorrect: true },
        { label: "Internet publico", isCorrect: false },
        { label: "Una red social", isCorrect: false },
        { label: "Un tipo de WAN", isCorrect: false },
      ])},
      { id: "b2-e5", title: "Pregunta 5", quiz: mc("Que tecnologia usa comunmente la PAN?", [
        { label: "Bluetooth", isCorrect: true },
        { label: "Fibra optica", isCorrect: false },
        { label: "Cable Ethernet", isCorrect: false },
        { label: "Satelite", isCorrect: false },
      ])},
      { id: "b2-e6", title: "Pregunta 6", quiz: tf("Una Extranet permite acceso limitado a usuarios externos.", true)},
      { id: "b2-e7", title: "Pregunta 7", quiz: mc("Que conecta una MAN?", [
        { label: "Varias LAN dentro de una ciudad", isCorrect: true },
        { label: "Dispositivos en un escritorio", isCorrect: false },
        { label: "Paises enteros", isCorrect: false },
        { label: "Solo dispositivos moviles", isCorrect: false },
      ])},
      { id: "b2-e8", title: "Pregunta 8", quiz: order("Ordena las redes de menor a mayor alcance:", ["PAN", "LAN", "MAN", "WAN"])},
    ],
  },
  {
    id: "b3", moduleId: "basic", title: "Dispositivos de Red",
    pages: [
      { id: "b3-e1", title: "Pregunta 1", quiz: mc("Que hace un router?", [
        { label: "Conecta redes diferentes y dirige el trafico", isCorrect: true },
        { label: "Solo imprime documentos", isCorrect: false },
        { label: "Almacena archivos", isCorrect: false },
        { label: "Conecta solo audifonos", isCorrect: false },
      ])},
      { id: "b3-e2", title: "Pregunta 2", quiz: tf("El switch conecta dispositivos dentro de la misma red local.", true)},
      { id: "b3-e3", title: "Pregunta 3", quiz: mc("Que hace un firewall?", [
        { label: "Protege la red de accesos no autorizados", isCorrect: true },
        { label: "Acelera la conexion a internet", isCorrect: false },
        { label: "Amplia la senal WiFi", isCorrect: false },
        { label: "Imprime documentos en red", isCorrect: false },
      ])},
      { id: "b3-e4", title: "Pregunta 4", quiz: mc("Que es un punto de acceso WiFi?", [
        { label: "Permite conexion inalambrica a la red", isCorrect: true },
        { label: "Un tipo de servidor", isCorrect: false },
        { label: "Un cable de red", isCorrect: false },
        { label: "Un programa de seguridad", isCorrect: false },
      ])},
      { id: "b3-e5", title: "Pregunta 5", quiz: mc("Que funcion tienen los servidores en una red?", [
        { label: "Almacenan y distribuyen datos", isCorrect: true },
        { label: "Solo navegan por internet", isCorrect: false },
        { label: "Conectan impresoras", isCorrect: false },
        { label: "Cargan dispositivos moviles", isCorrect: false },
      ])},
      { id: "b3-e6", title: "Pregunta 6", quiz: tf("El modem convierte las senales digitales en analogicas y viceversa.", true)},
      { id: "b3-e7", title: "Pregunta 7", quiz: mc("Cual es la diferencia principal entre un router y un switch?", [
        { label: "El router conecta redes; el switch conecta dispositivos en la misma red", isCorrect: true },
        { label: "Son exactamente lo mismo", isCorrect: false },
        { label: "El switch es mas caro", isCorrect: false },
        { label: "El router solo sirve para WiFi", isCorrect: false },
      ])},
      { id: "b3-e8", title: "Pregunta 8", quiz: mc("Que dispositivos forman la infraestructura basica de una red?", [
        { label: "Modem, router y switch", isCorrect: true },
        { label: "Solo una impresora", isCorrect: false },
        { label: "Un televisor y un decoder", isCorrect: false },
        { label: "Un mouse y un teclado", isCorrect: false },
      ])},
    ],
  },
  {
    id: "i1", moduleId: "intermediate", title: "Direccionamiento IP",
    pages: [
      { id: "i1-e1", title: "Pregunta 1", quiz: mc("Cuantos bits utiliza una direccion IPv4?", [
        { label: "32 bits", isCorrect: true },
        { label: "16 bits", isCorrect: false },
        { label: "64 bits", isCorrect: false },
        { label: "128 bits", isCorrect: false },
      ])},
      { id: "i1-e2", title: "Pregunta 2", quiz: mc("Cuantos bits utiliza IPv6?", [
        { label: "128 bits", isCorrect: true },
        { label: "32 bits", isCorrect: false },
        { label: "64 bits", isCorrect: false },
        { label: "256 bits", isCorrect: false },
      ])},
      { id: "i1-e3", title: "Pregunta 3", quiz: mc("Que es una IP publica?", [
        { label: "Una direccion visible en Internet asignada por el proveedor", isCorrect: true },
        { label: "Una direccion que solo funciona en tu casa", isCorrect: false },
        { label: "Una direccion de correo electronico", isCorrect: false },
        { label: "Un tipo de contrasena", isCorrect: false },
      ])},
      { id: "i1-e4", title: "Pregunta 4", quiz: tf("La MAC Address cambia cuando te conectas a otra red.", false)},
      { id: "i1-e5", title: "Pregunta 5", quiz: mc("Cuantas direcciones permite IPv4 aproximadamente?", [
        { label: "4.3 mil millones", isCorrect: true },
        { label: "4 mil millones de mil millones", isCorrect: false },
        { label: "400 mil", isCorrect: false },
        { label: "4 mil", isCorrect: false },
      ])},
      { id: "i1-e6", title: "Pregunta 6", quiz: mc("Que es una IP privada?", [
        { label: "Una direccion que solo funciona dentro de la red local", isCorrect: true },
        { label: "Una direccion visible en todo internet", isCorrect: false },
        { label: "Una direccion de servidor publico", isCorrect: false },
        { label: "Un tipo de dominio web", isCorrect: false },
      ])},
      { id: "i1-e7", title: "Pregunta 7", quiz: tf("IPv6 fue creada para resolver el agotamiento de direcciones IPv4.", true)},
      { id: "i1-e8", title: "Pregunta 8", quiz: mc("Donde esta grabada la direccion MAC?", [
        { label: "En la tarjeta de red del dispositivo", isCorrect: true },
        { label: "En el router", isCorrect: false },
        { label: "En el servidor DNS", isCorrect: false },
        { label: "En el cable Ethernet", isCorrect: false },
      ])},
    ],
  },
  {
    id: "i2", moduleId: "intermediate", title: "Subredes y Mascara",
    pages: [
      { id: "i2-e1", title: "Pregunta 1", quiz: mc("Que es una subred?", [
        { label: "Una division de una red mas grande", isCorrect: true },
        { label: "Un tipo de internet", isCorrect: false },
        { label: "Un servidor pequeno", isCorrect: false },
        { label: "Un programa de red", isCorrect: false },
      ])},
      { id: "i2-e2", title: "Pregunta 2", quiz: fill("La mascara de subred 255.255.255.0 indica que los primeros ___ octetos son la red.", ["tres", "3"])},
      { id: "i2-e3", title: "Pregunta 3", quiz: mc("Que significa CIDR?", [
        { label: "Classless Inter-Domain Routing", isCorrect: true },
        { label: "Computer Internet Data Route", isCorrect: false },
        { label: "Central Internet Data Repository", isCorrect: false },
        { label: "Connected Internal Device Ring", isCorrect: false },
      ])},
      { id: "i2-e4", title: "Pregunta 4", quiz: mc("Que representa /24 en notacion CIDR?", [
        { label: "24 bits corresponden a la red", isCorrect: true },
        { label: "24 dispositivos conectados", isCorrect: false },
        { label: "24 subredes disponibles", isCorrect: false },
        { label: "Velocidad de 24 Mbps", isCorrect: false },
      ])},
      { id: "i2-e5", title: "Pregunta 5", quiz: tf("Las subredes mejoran el rendimiento de una red grande.", true)},
      { id: "i2-e6", title: "Pregunta 6", quiz: mc("Que necesitas saber para calcular subredes?", [
        { label: "Cuantos dispositivos conectados habra", isCorrect: true },
        { label: "El color del cable", isCorrect: false },
        { label: "El nombre del proveedor", isCorrect: false },
        { label: "La marca del router", isCorrect: false },
      ])},
      { id: "i2-e7", title: "Pregunta 7", quiz: mc("Que direccion necesita cada subred como minimo?", [
        { label: "Una direccion de red y una de broadcast", isCorrect: true },
        { label: "Solo una IP privada", isCorrect: false },
        { label: "Una direccion MAC", isCorrect: false },
        { label: "Un nombre de dominio", isCorrect: false },
      ])},
      { id: "i2-e8", title: "Pregunta 8", quiz: tf("La mascara de subred determina que parte es la red y que parte son los dispositivos.", true)},
    ],
  },
  {
    id: "i3", moduleId: "intermediate", title: "Topologias de Red",
    pages: [
      { id: "i3-e1", title: "Pregunta 1", quiz: mc("En que topologia todos los dispositivos se conectan a un punto central?", [
        { label: "Estrella", isCorrect: true },
        { label: "Bus", isCorrect: false },
        { label: "Anillo", isCorrect: false },
        { label: "Malla", isCorrect: false },
      ])},
      { id: "i3-e2", title: "Pregunta 2", quiz: mc("Que es la topologia de red?", [
        { label: "La forma en que los dispositivos estan organizados y conectados", isCorrect: true },
        { label: "El tipo de cable utilizado", isCorrect: false },
        { label: "La velocidad de la conexion", isCorrect: false },
        { label: "El proveedor de internet", isCorrect: false },
      ])},
      { id: "i3-e3", title: "Pregunta 3", quiz: mc("Cual es la topologia mas comun en hogares y oficinas?", [
        { label: "Estrella", isCorrect: true },
        { label: "Bus", isCorrect: false },
        { label: "Anillo", isCorrect: false },
        { label: "Malla completa", isCorrect: false },
      ])},
      { id: "i3-e4", title: "Pregunta 4", quiz: mc("En la topologia bus, como se conectan los dispositivos?", [
        { label: "Comparten un cable principal", isCorrect: true },
        { label: "Cada uno tiene su cable al servidor", isCorrect: false },
        { label: "Forman un circulo cerrado", isCorrect: false },
        { label: "Se conectan por bluetooth", isCorrect: false },
      ])},
      { id: "i3-e5", title: "Pregunta 5", quiz: mc("Cual es la caracteristica de la topologia malla?", [
        { label: "Cada dispositivo se conecta con varios otros", isCorrect: true },
        { label: "Todos comparten un solo cable", isCorrect: false },
        { label: "Solo funciona con WiFi", isCorrect: false },
        { label: "Es la mas economica", isCorrect: false },
      ])},
      { id: "i3-e6", title: "Pregunta 6", quiz: tf("La topologia anillo forma un circulo cerrado de dispositivos.", true)},
      { id: "i3-e7", title: "Pregunta 7", quiz: mc("En que tipo de red se usa la topologia malla?", [
        { label: "Redes criticas como telecomunicaciones", isCorrect: true },
        { label: "Solo en hogares", isCorrect: false },
        { label: "Solo en escuelas", isCorrect: false },
        { label: "En redes personales", isCorrect: false },
      ])},
      { id: "i3-e8", title: "Pregunta 8", quiz: mc("Que tipo de topologia puede ser fisica o logica?", [
        { label: "Cualquier topologia de red", isCorrect: true },
        { label: "Solo la estrella", isCorrect: false },
        { label: "Solo la malla", isCorrect: false },
        { label: "Solo el bus", isCorrect: false },
      ])},
    ],
  },
  {
    id: "a1", moduleId: "advanced", title: "Protocolos TCP/IP",
    pages: [
      { id: "a1-e1", title: "Pregunta 1", quiz: mc("Cuantas capas tiene el modelo TCP/IP?", [
        { label: "4 capas", isCorrect: true },
        { label: "7 capas", isCorrect: false },
        { label: "5 capas", isCorrect: false },
        { label: "3 capas", isCorrect: false },
      ])},
      { id: "a1-e2", title: "Pregunta 2", quiz: tf("TCP es mas rapido que UDP pero no garantiza la entrega.", false)},
      { id: "a1-e3", title: "Pregunta 3", quiz: mc("Que hace DNS?", [
        { label: "Traduce nombres de dominio a direcciones IP", isCorrect: true },
        { label: "Envia correos electronicos", isCorrect: false },
        { label: "Conecta cables de red", isCorrect: false },
        { label: "Almacena archivos en la nube", isCorrect: false },
      ])},
      { id: "a1-e4", title: "Pregunta 4", quiz: mc("Que protocolo se usa para transferir paginas web?", [
        { label: "HTTP/HTTPS", isCorrect: true },
        { label: "SMTP", isCorrect: false },
        { label: "FTP", isCorrect: false },
        { label: "DHCP", isCorrect: false },
      ])},
      { id: "a1-e5", title: "Pregunta 5", quiz: mc("Que protocolo es confiable y verifica que todos los paquetes lleguen?", [
        { label: "TCP", isCorrect: true },
        { label: "UDP", isCorrect: false },
        { label: "IP", isCorrect: false },
        { label: "HTTP", isCorrect: false },
      ])},
      { id: "a1-e6", title: "Pregunta 6", quiz: mc("Que protocolo se usa en videojuegos online por su velocidad?", [
        { label: "UDP", isCorrect: true },
        { label: "TCP", isCorrect: false },
        { label: "HTTP", isCorrect: false },
        { label: "SMTP", isCorrect: false },
      ])},
      { id: "a1-e7", title: "Pregunta 7", quiz: tf("HTTPS anade cifrado a las conexiones web.", true)},
      { id: "a1-e8", title: "Pregunta 8", quiz: mc("Que es la capa de Aplicacion en TCP/IP?", [
        { label: "Donde funcionan HTTP, DNS y FTP", isCorrect: true },
        { label: "Donde se conectan los cables", isCorrect: false },
        { label: "Donde se direccionan los paquetes", isCorrect: false },
        { label: "Donde se verifican los datos", isCorrect: false },
      ])},
    ],
  },
  {
    id: "a2", moduleId: "advanced", title: "Puertos y Servicios",
    pages: [
      { id: "a2-e1", title: "Pregunta 1", quiz: mc("Que es un puerto en red?", [
        { label: "Un numero que identifica un servicio o aplicacion", isCorrect: true },
        { label: "Un tipo de cable", isCorrect: false },
        { label: "Un lugar fisico donde se conecta un dispositivo", isCorrect: false },
        { label: "Una direccion de internet", isCorrect: false },
      ])},
      { id: "a2-e2", title: "Pregunta 2", quiz: fill("El puerto ___ se utiliza para conexiones HTTPS (web cifrada).", "443")},
      { id: "a2-e3", title: "Pregunta 3", quiz: mc("Que puerto se usa para HTTP?", [
        { label: "Puerto 80", isCorrect: true },
        { label: "Puerto 443", isCorrect: false },
        { label: "Puerto 22", isCorrect: false },
        { label: "Puerto 25", isCorrect: false },
      ])},
      { id: "a2-e4", title: "Pregunta 4", quiz: mc("Que servicio utiliza el puerto 22?", [
        { label: "SSH (acceso remoto)", isCorrect: true },
        { label: "HTTP (web)", isCorrect: false },
        { label: "DNS (nombres)", isCorrect: false },
        { label: "SMTP (correo)", isCorrect: false },
      ])},
      { id: "a2-e5", title: "Pregunta 5", quiz: mc("Que es un servicio de red?", [
        { label: "Una funcion que ofrece un servidor a los clientes", isCorrect: true },
        { label: "Un tipo de cable", isCorrect: false },
        { label: "Una direccion IP", isCorrect: false },
        { label: "Un dispositivo de red", isCorrect: false },
      ])},
      { id: "a2-e6", title: "Pregunta 6", quiz: mc("Que hace un firewall con los puertos?", [
        { label: "Controla que puertos estan abiertos o cerrados", isCorrect: true },
        { label: "Los abre todos automaticamente", isCorrect: false },
        { label: "Los cierra permanentemente", isCorrect: false },
        { label: "Los convierte en direcciones IP", isCorrect: false },
      ])},
      { id: "a2-e7", title: "Pregunta 7", quiz: tf("Solo se deben abrir los puertos que realmente se necesitan.", true)},
      { id: "a2-e8", title: "Pregunta 8", quiz: mc("Que protocolo asigna direcciones IP automaticamente?", [
        { label: "DHCP", isCorrect: true },
        { label: "DNS", isCorrect: false },
        { label: "HTTP", isCorrect: false },
        { label: "SMTP", isCorrect: false },
      ])},
    ],
  },
  {
    id: "a3", moduleId: "advanced", title: "Seguridad en Red",
    pages: [
      { id: "a3-e1", title: "Pregunta 1", quiz: mc("Que es el cifrado de datos?", [
        { label: "Convertir datos en codigo ilegible sin la clave", isCorrect: true },
        { label: "Eliminar datos innecesarios", isCorrect: false },
        { label: "Compartir datos por bluetooth", isCorrect: false },
        { label: "Almacenar datos en la nube", isCorrect: false },
      ])},
      { id: "a3-e2", title: "Pregunta 2", quiz: mc("Que protocolo cifra el trafico web?", [
        { label: "TLS/SSL", isCorrect: true },
        { label: "HTTP", isCorrect: false },
        { label: "FTP", isCorrect: false },
        { label: "SMTP", isCorrect: false },
      ])},
      { id: "a3-e3", title: "Pregunta 3", quiz: mc("Que tecnologia cifra las conexiones WiFi?", [
        { label: "WPA2/WPA3", isCorrect: true },
        { label: "HTTP", isCorrect: false },
        { label: "DNS", isCorrect: false },
        { label: "TCP", isCorrect: false },
      ])},
      { id: "a3-e4", title: "Pregunta 4", quiz: mc("Que es phishing?", [
        { label: "Un ataque para robar datos haciendose pasar por otro", isCorrect: true },
        { label: "Un tipo de cifrado", isCorrect: false },
        { label: "Un protocolo de red", isCorrect: false },
        { label: "Un tipo de cable", isCorrect: false },
      ])},
      { id: "a3-e5", title: "Pregunta 5", quiz: mc("Que es la autenticacion de dos factores (2FA)?", [
        { label: "Una capa extra de seguridad ademas de la contrasena", isCorrect: true },
        { label: "Usar dos contrasenas iguales", isCorrect: false },
        { label: "Conectarse a dos redes a la vez", isCorrect: false },
        { label: "Usar dos navegadores diferentes", isCorrect: false },
      ])},
      { id: "a3-e6", title: "Pregunta 6", quiz: tf("Una contrasena fuerte debe tener al menos 12 caracteres con mezcla de tipos.", true)},
      { id: "a3-e7", title: "Pregunta 7", quiz: mc("Que es un ataque DDoS?", [
        { label: "Saturar un servidor con trafico para dejarlo fuera de servicio", isCorrect: true },
        { label: "Un tipo de cifrado", isCorrect: false },
        { label: "Una forma de autenticacion", isCorrect: false },
        { label: "Un protocolo de red", isCorrect: false },
      ])},
      { id: "a3-e8", title: "Pregunta 8", quiz: order("Ordena estas practicas de seguridad de menor a mayor complejidad:", [
        "No hagas clic en enlaces sospechosos",
        "Usa contrasenas fuertes",
        "Configura tu firewall",
        "Usa VPN en redes publicas",
      ])},
    ],
  },
];

async function main() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  db.exec(SCHEMA);

  const evalMap = {};
  for (const ev of evaluations) {
    evalMap[ev.id] = ev;
  }

  function lastId() {
    return db.exec("SELECT last_insert_rowid()")[0].values[0][0];
  }

  for (const lesson of lessons) {
    const pagesJson = JSON.stringify(
      lesson.pages.map((p) => {
        const out = { id: p.id, title: p.title, content: p.content };
        if (p.illustration) out.illustration = p.illustration;
        if (p.conceptBox) out.conceptBox = p.conceptBox;
        if (p.quiz) out.quiz = p.quiz;
        return out;
      })
    );

    db.run(
      "INSERT INTO Leccion (external_id, titulo, descripcion, contenido, nivel, xp_recompensa, estado) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        lesson.id,
        lesson.title,
        lesson.pages[0]?.content.slice(0, 100) ?? "",
        pagesJson,
        lesson.moduleId,
        20,
        1,
      ]
    );
    const lessonId = lastId();

    const evaluation = evalMap[lesson.id];
    if (!evaluation) continue;

    db.run(
      "INSERT INTO Evaluacion (id_leccion, titulo, descripcion, puntaje_minimo) VALUES (?, ?, ?, ?)",
      [lessonId, evaluation.title, "Evaluacion del modulo", 75.0]
    );
    const evalId = lastId();

    for (let qi = 0; qi < evaluation.pages.length; qi++) {
      const page = evaluation.pages[qi];
      const q = page.quiz;

      db.run(
        "INSERT INTO Pregunta (id_evaluacion, enunciado, tipo_pregunta, puntaje, orden_pregunta) VALUES (?, ?, ?, ?, ?)",
        [evalId, q.question, q.type, 10.0, qi + 1]
      );
      const pregId = lastId();

      if (q.options) {
        for (const opt of q.options) {
          db.run(
            "INSERT INTO Respuesta (id_pregunta, texto_respuesta, es_correcta) VALUES (?, ?, ?)",
            [pregId, opt.label, opt.isCorrect ? 1 : 0]
          );
        }
      }

      if (q.correctOrder) {
        for (const item of q.correctOrder) {
          db.run(
            "INSERT INTO Respuesta (id_pregunta, texto_respuesta, es_correcta) VALUES (?, ?, ?)",
            [pregId, item, 1]
          );
        }
      }

      if (q.blankAnswer) {
        const answers = Array.isArray(q.blankAnswer) ? q.blankAnswer : [q.blankAnswer];
        for (const ans of answers) {
          db.run(
            "INSERT INTO Respuesta (id_pregunta, texto_respuesta, es_correcta) VALUES (?, ?, ?)",
            [pregId, ans, 1]
          );
        }
      }
    }
  }

  db.run(
    "INSERT INTO Usuario (nombre, apellido, correo, password_hash, xp_total, fecha_registro, estado, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    ["Usuario", "Default", "default@bitprogress.app", "", 0, new Date().toISOString(), 1, "boy"]
  );

  const data = db.export();
  const buffer = Buffer.from(data);
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, buffer);
  console.log(`Database written to ${OUTPUT} (${buffer.length} bytes)`);

  db.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
