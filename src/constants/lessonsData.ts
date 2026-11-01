import { ImageSourcePropType } from "react-native";

export type QuizType =
  | "multiple-choice"
  | "true-false"
  | "ordering"
  | "fill-blank";

export interface QuizOption {
  label: string;
  isCorrect: boolean;
}

export interface QuizData {
  type: QuizType;
  question: string;
  options?: QuizOption[];
  correctOrder?: string[];
  blankAnswer?: string | string[];
  explanation?: string;
}

export interface LessonPage {
  id: string;
  title: string;
  content: string;
  illustration?: ImageSourcePropType | string;
  conceptBox?: string;
  quiz?: QuizData;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  pages: LessonPage[];
}

export const lessonsData: Lesson[] = [
  {
    id: "b1",
    moduleId: "basic",
    title: "Que es una red",
    pages: [
      {
        id: "b1-p1",
        title: "Bienvenida",
        content:
          "Una red informatica permite que varios dispositivos puedan comunicarse entre si para compartir informacion y recursos.",
        illustration: "Bienvenida.png",
      },
      {
        id: "b1-p2",
        title: "Que es una red?",
        content:
          "Una red informatica es el conjunto de dos o mas dispositivos conectados para intercambiar informacion. No importa si estan en una casa, una empresa o incluso en diferentes paises; mientras puedan comunicarse, forman parte de una red.",
        illustration: "Queesunared.png",
        conceptBox: "Red = dispositivos + conexion + comunicacion.",
      },
      {
        id: "b1-p3",
        title: "Que dispositivos forman una red?",
        content:
          "Una red puede estar formada por:\n\n• Computadoras\n• Telefonos\n• Tablets\n• Servidores\n• Impresoras\n• Camaras IP",
        illustration: "Quedispositivosformanpartedeunared.png",
      },
      {
        id: "b1-p4",
        title: "Como se comunican?",
        content:
          "La informacion viaja en pequenos paquetes de datos. Cada paquete contiene informacion sobre quien lo envia, quien lo recibe y que informacion transporta.",
        illustration: "Comosecomunican.png",
      },
      {
        id: "b1-p5",
        title: "Ejemplo cotidiano",
        content:
          "Cuando envias un mensaje por WhatsApp:\n\n1. Escribes el mensaje.\n2. Se convierte en datos.\n3. Viaja por Internet.\n4. Llega al telefono del destinatario.\n\nAunque parezca instantaneo, detras ocurre todo un proceso de comunicacion.",
        illustration: "Ejemplocotiano.png",
      },
      {
        id: "b1-p6",
        title: "Resumen",
        content:
          "✔ Una red conecta dispositivos.\n\n✔ Permite compartir informacion.\n\n✔ Los datos viajan mediante paquetes.\n\n✔ Internet es la red mas grande del mundo.",
      },
      {
        id: "b1-p7",
        title: "Sabias que...?",
        content:
          "El primer mensaje enviado por Internet ocurrio en 1969. Solo llegaron las letras: LO. El sistema fallo antes de escribir LOGIN.",
        illustration: "Sabiasque.png",
      },
      {
        id: "b1-p8",
        title: "Mini reto",
        content:
          "Cual de los siguientes dispositivos puede formar parte de una red?\n\n○ Microondas\n○ Router\n○ Ventilador\n○ Licuadora",
        illustration: "Router.png",
        quiz: {
          type: "multiple-choice",
          question:
            "Cual de los siguientes dispositivos puede formar parte de una red?",
          options: [
            { label: "Microondas", isCorrect: false },
            { label: "Router", isCorrect: true },
            { label: "Ventilador", isCorrect: false },
            { label: "Licuadora", isCorrect: false },
          ],
          explanation:
            "El router es un dispositivo de red que permite la conexion entre dispositivos.",
        },
      },
    ],
  },
  {
    id: "b1-2",
    moduleId: "basic",
    title: "Por que son importantes las redes",
    pages: [
      {
        id: "b1-2-p1",
        title: "Introduccion",
        content:
          "Aunque muchas personas no lo notan, las redes forman parte de casi todas las actividades diarias. Desde enviar un mensaje hasta ver un video, siempre hay una red trabajando detras.",
        illustration: "OndasRadio.png",
      },
      {
        id: "b1-2-p2",
        title: "Compartir informacion",
        content:
          "Una de las principales funciones de una red es permitir que la informacion viaje rapidamente entre dispositivos. Gracias a esto podemos:\n\n• Enviar documentos.\n• Compartir fotografias.\n• Realizar videollamadas.\n• Intercambiar archivos.",
        illustration: "DosPCsConectadas.png",
        conceptBox:
          "Compartir informacion significa que varios dispositivos pueden acceder a los mismos datos.",
      },
      {
        id: "b1-2-p3",
        title: "Compartir recursos",
        content:
          "Las redes tambien permiten compartir recursos fisicos sin necesidad de duplicarlos. Algunos ejemplos son:\n\n• Impresoras.\n• Escanneres.\n• Servidores.\n• Espacio de almacenamiento.\n\nEsto reduce costos y mejora la organizacion.",
        illustration: "Impresora.png",
      },
      {
        id: "b1-2-p4",
        title: "Comunicacion en tiempo real",
        content:
          "Las redes hacen posible que personas ubicadas en diferentes lugares puedan comunicarse de forma inmediata. Ejemplos:\n\n• WhatsApp\n• Zoom\n• Microsoft Teams\n• Google Meet\n\nToda esta informacion viaja en cuestion de segundos.",
        illustration: "OndasRadio.png",
      },
      {
        id: "b1-2-p5",
        title: "Acceso a Internet",
        content:
          "Internet es la red mas grande del mundo. Gracias a ella podemos:\n\n• Buscar informacion.\n• Estudiar.\n• Comprar en linea.\n• Trabajar desde casa.\n• Utilizar redes sociales.\n\nSin redes de computadoras, Internet no existiria.",
        illustration: "Topologias.png",
      },
      {
        id: "b1-2-p6",
        title: "Redes en nuestra vida diaria",
        content:
          "Las redes estan presentes en:\n\n🏠 Hogares\n🏫 Escuelas\n🏢 Empresas\n🏥 Hospitales\n🏦 Bancos\n🏭 Industrias\n\nActualmente casi todas las organizaciones dependen de una red informatica.",
      },
      {
        id: "b1-2-p7",
        title: "Resumen",
        content:
          "✔ Permiten compartir informacion.\n\n✔ Facilitan la comunicacion.\n\n✔ Reducen costos.\n\n✔ Hacen posible Internet.\n\n✔ Conectan personas y dispositivos.",
      },
      {
        id: "b1-2-p8",
        title: "Mini reto",
        content:
          "Cual NO es una ventaja de una red?\n\n○ Compartir archivos.\n○ Compartir impresoras.\n○ Aumentar la comunicacion.\n○ Evitar totalmente el uso de dispositivos.",
        illustration: "SoldadoHenry.png",
        quiz: {
          type: "multiple-choice",
          question: "Cual NO es una ventaja de una red?",
          options: [
            { label: "Compartir archivos", isCorrect: false },
            { label: "Compartir impresoras", isCorrect: false },
            { label: "Aumentar la comunicacion", isCorrect: false },
            {
              label: "Evitar totalmente el uso de dispositivos",
              isCorrect: true,
            },
          ],
          explanation:
            "Las redes facilitan el uso de dispositivos, no lo evitan.",
        },
      },
    ],
  },
  {
    id: "b1-3",
    moduleId: "basic",
    title: "Tipos de Redes Informaticas",
    pages: [
      {
        id: "b1-3-p1",
        title: "Clasificacion de redes por su alcance",
        content:
          "No todas las redes tienen el mismo tamano. Algunas conectan dispositivos muy cercanos, mientras que otras conectan millones de equipos alrededor del mundo.\n\nLas redes se clasifican segun la distancia que cubren:\n\n• PAN → Persona (hasta 10 metros)\n• LAN → Edificio (hasta 1 km)\n• MAN → Ciudad (5 a 50 km)\n• WAN → Paises y continentes (sin limite)\n\nCada tipo de red tiene caracteristicas diferentes dependiendo de su alcance.",
        illustration: "ClasificaciondeRedesporsuAlcance.png",
      },
      {
        id: "b1-3-p2",
        title: "Red LAN (Local Area Network)",
        content:
          "La LAN es la red mas comun y la que utilizas con mas frecuencia. Conecta dispositivos dentro de un area limitada como una casa, una oficina, una escuela o un hospital.\n\nCaracteristicas principales:\n\n• Usa cables Ethernet o Wi-Fi.\n• Alta velocidad de conexion (100 Mbps a 1 Gbps).\n• El administrador de la red es una sola persona o empresa.\n• Cobertura: un piso, un edificio o un campus pequeno.\n\nEjemplos:\n\n• El Wi-Fi de tu casa que conecta tu celular, computadora y smart TV.\n• La red de una oficina donde todos los computadores estan conectados.\n• El laboratorio de una escuela con 30 computadoras en red.",
        illustration: "EdificioSiete.png",
        conceptBox:
          "LAN = Red Local. Conecta dispositivos en un edificio o area pequena.",
      },
      {
        id: "b1-3-p3",
        title: "Red WAN (Wide Area Network)",
        content:
          "La WAN es la red mas grande que existe. Conecta redes en diferentes ciudades, paises o incluso continentes. El ejemplo mas grande de WAN es Internet.\n\nCaracteristicas:\n\n• Cobertura: miles de kilometros.\n• Usa tecnologias como fibra optica, satelites y enlaces submarinos.\n• Requiere multiples proveedores y administradores.\n• La velocidad puede variar dependiendo de la distancia.\n\nEjemplos:\n\n• Internet: la WAN mas grande del mundo.\n• La red interna de una empresa multinational que conecta sus oficinas en Mexico, USA y Europa.\n• Las redes de telefonía movil (4G/5G) que cubren paises enteros.",
        illustration: "Topologias.png",
        conceptBox: "WAN = Red de Area Amplia. Conecta paises y continentes.",
      },
      {
        id: "b1-3-p4",
        title: "Red MAN (Metropolitan Area Network)",
        content:
          "La MAN conecta varias redes LAN distribuidas dentro de una ciudad o zona metropolitana. Es mas grande que una LAN pero mas pequeña que una WAN.\n\nCaracteristicas:\n\n• Cobertura de 5 a 50 kilometros.\n• Puede usar fibra optica o enlaces inalambricos.\n• Generalmente la administra una sola organizacion o un proveedor de servicios.\n\nEjemplos:\n\n• Una universidad con varios campus repartidos por la ciudad, donde todos comparten la misma red.\n• Una empresa con multiples oficinas en la misma ciudad conectadas entre si.\n• La red de una municipalidad que conecta sus oficinas en diferentes colonias.",
        illustration: "EdificioSiete.png",
        conceptBox: "MAN = Red Metropolitana. Conecta una ciudad completa.",
      },
      {
        id: "b1-3-p5",
        title: "Red PAN (Personal Area Network)",
        content:
          "La PAN es la red mas personal y pequeña que existe. Conecta dispositivos muy cercanos entre si, generalmente dentro de un radio de 10 metros.\n\nCaracteristicas:\n\n• Alcance maximo: 10 metros.\n• No necesita cables ni configuracion complicada.\n• Usa tecnologias como Bluetooth e Infrarrojo.\n• Es la red mas sencilla de configurar.\n\nEjemplos del dia a dia:\n\n• Conectar tus audifonos Bluetooth al celular.\n• Sincronizar tu smartwatch con el telefono.\n• Conectar un teclado inalambrico a tu computadora.\n• Enviar un archivo por Bluetooth de un celular a otro.",
        illustration: "OndasRadio.png",
        conceptBox: "PAN = Red Personal. Alcance: hasta 10 metros.",
      },
      {
        id: "b1-3-p6",
        title: "Internet, Intranet y Extranet",
        content:
          "Ademas de los tipos de red por alcance, existen otras clasificaciones importantes:\n\n• Internet: es la red global mas grande del mundo. Conecta millones de dispositivos en todos los paises y permite acceder a servicios como paginas web, correos y redes sociales.\n\n• Intranet: es una red privada que pertenece a una sola organizacion. Solo las personas autorizadas pueden acceder. Se usa en empresas, hospitales y universidades para compartir informacion interna.\n\n• Extranet: es una extension de la Intranet que permite acceso limitado a usuarios externos. Por ejemplo, un proveedor que necesita consultar inventarios de una empresa.\n\nComparacion:\n\n• Internet → Acceso publico para todos.\n• Intranet → Acceso privado solo para la organizacion.\n• Extranet → Acceso parcial para usuarios externos autorizados.",
        illustration: "InternetIntranetyExtranet.png",
        conceptBox:
          "Internet = publica. Intranet = privada. Extranet = acceso limitado.",
      },
      {
        id: "b1-3-p7",
        title: "Resumen",
        content:
          "✔ PAN → Red personal, hasta 10 metros (Bluetooth).\n\n✔ LAN → Red local, edificios y oficinas (Wi-Fi, Ethernet).\n\n✔ MAN → Red metropolitana, una ciudad completa.\n\n✔ WAN → Red de area amplia, paises y continentes.\n\n✔ Internet → Red global publica.\n\n✔ Intranet → Red privada de una organizacion.\n\n✔ Extranet → Acceso limitado a usuarios externos.",
      },
      {
        id: "b1-3-p8",
        title: "Prueba practica",
        content: "Demuestra lo que aprendiste sobre los tipos de redes.",
        quiz: {
          type: "multiple-choice",
          question:
            "Que tipo de red conecta dispositivos dentro de un edificio?",
          options: [
            { label: "PAN", isCorrect: false },
            { label: "LAN", isCorrect: true },
            { label: "MAN", isCorrect: false },
            { label: "WAN", isCorrect: false },
          ],
          explanation:
            "La LAN (Local Area Network) conecta dispositivos dentro de un edificio o area pequena como una casa, oficina o escuela.",
        },
      },
    ],
  },
  {
    id: "b1-4",
    moduleId: "basic",
    title: "Tecnologias de Red que usamos diariamente",
    pages: [
      {
        id: "b1-4-p1",
        title: "Diferentes formas de conectar",
        content:
          "No todas las conexiones utilizan cables. Hoy en dia existen tecnologias que permiten transmitir informacion tanto por medios fisicos como inalambricos.",
      },
      {
        id: "b1-4-p2",
        title: "Ethernet",
        content:
          "Ethernet es la tecnologia mas utilizada en redes cableadas. Se caracteriza por:\n\n• Gran velocidad.\n• Alta estabilidad.\n• Baja interferencia.\n\nEs muy comun en empresas y laboratorios.",
        illustration: "CabelEthernet.png",
      },
      {
        id: "b1-4-p3",
        title: "Wi-Fi",
        content:
          "Wi-Fi permite conectar dispositivos sin utilizar cables. Sus ventajas son:\n\n• Movilidad.\n• Facilidad de instalacion.\n• Acceso desde diferentes dispositivos.\n\nActualmente es la tecnologia inalambrica mas utilizada.",
        illustration: "OndasRadio.png",
      },
      {
        id: "b1-4-p4",
        title: "Bluetooth",
        content:
          "Bluetooth conecta dispositivos cercanos utilizando ondas de radio. Algunos ejemplos:\n\n• Audifonos.\n• Parlantes.\n• Mouse.\n• Teclados.\n\nSu alcance suele ser menor que el de Wi-Fi.",
        illustration: "OndasRadio.png",
      },
      {
        id: "b1-4-p5",
        title: "Fibra optica",
        content:
          "La fibra optica transmite informacion mediante pulsos de luz. Sus ventajas son:\n\n• Muy alta velocidad.\n• Gran capacidad.\n• Baja perdida de senal.\n\nEs ampliamente utilizada por proveedores de Internet.",
        illustration: "CabelEthernet.png",
      },
      {
        id: "b1-4-p6",
        title: "Cual tecnologia elegir?",
        content:
          "Ethernet → Oficinas\nWi-Fi → Hogares\nBluetooth → Dispositivos personales\nFibra optica → Internet de alta velocidad",
        illustration: "CabelEthernet.png",
      },
      {
        id: "b1-4-p7",
        title: "Conceptos importantes",
        content:
          "📡 Wi-Fi\n🔌 Ethernet\n📶 Bluetooth\n💡 Fibra optica\n\nCada tecnologia tiene ventajas y aplicaciones especificas segun las necesidades de la red.",
      },
      {
        id: "b1-4-p8",
        title: "Mini reto",
        content:
          "Cual tecnologia utiliza pulsos de luz para transmitir datos?\n\n○ Bluetooth\n○ Wi-Fi\n○ Ethernet\n○ Fibra optica",
        illustration: "CabelEthernet.png",
      },
      {
        id: "b1-4-p9",
        title: "Prueba practica",
        content: "Demuestra lo que aprendiste sobre tecnologias de red.",
        quiz: {
          type: "multiple-choice",
          question:
            "Cual tecnologia utiliza pulsos de luz para transmitir datos?",
          options: [
            { label: "Bluetooth", isCorrect: false },
            { label: "Wi-Fi", isCorrect: false },
            { label: "Ethernet", isCorrect: false },
            { label: "Fibra optica", isCorrect: true },
          ],
          explanation:
            "La fibra optica transmite informacion mediante pulsos de luz a traves de cables de vidrio.",
        },
      },
    ],
  },
  {
    id: "b1-5",
    moduleId: "basic",
    title: "Internet: La Red de Redes",
    pages: [
      {
        id: "b1-5-p1",
        title: "Introduccion",
        content:
          "Internet es una enorme red que conecta millones de dispositivos alrededor del mundo. Gracias a ella, las personas pueden comunicarse, compartir informacion y acceder a servicios desde cualquier lugar.",
        illustration: "Topologias.png",
      },
      {
        id: "b1-5-p2",
        title: "Como funciona Internet?",
        content:
          "Cuando utilizas una aplicacion o visitas una pagina web, la informacion viaja desde tu dispositivo hasta un servidor y luego regresa con una respuesta.\n\nEste proceso ocurre en apenas unos segundos.",
        illustration: "EdificioSiete.png",
      },
      {
        id: "b1-5-p3",
        title: "Que es un servidor?",
        content:
          "Un servidor es una computadora disenada para ofrecer informacion o servicios a otros dispositivos llamados clientes.\n\nEjemplos de servidores:\n\n• Servidores web.\n• Servidores de correo.\n• Servidores de videojuegos.\n• Servidores en la nube.",
        illustration: "EdificioSiete.png",
        conceptBox:
          "Cliente: solicita informacion.\nServidor: responde a la solicitud.",
      },
      {
        id: "b1-5-p4",
        title: "Servicios que ofrece Internet",
        content:
          "Internet permite utilizar diferentes servicios, como:\n\n• Navegar por paginas web.\n• Enviar correos electronicos.\n• Realizar videollamadas.\n• Almacenar archivos en la nube.\n• Ver peliculas y escuchar musica.",
        illustration: "AppsEnPC.png",
      },
      {
        id: "b1-5-p5",
        title: "Navegando por la Web",
        content:
          "La World Wide Web (WWW) es uno de los servicios mas populares de Internet.\n\nCuando escribes una direccion web, tu navegador solicita la informacion a un servidor para mostrar la pagina.",
        illustration: "HTTP.png",
      },
      {
        id: "b1-5-p6",
        title: "Curiosidad",
        content:
          "Internet y la Web no son lo mismo.\n\nInternet es la infraestructura que conecta millones de dispositivos.\n\nLa Web (WWW) es uno de los muchos servicios que funcionan sobre Internet.",
      },
      {
        id: "b1-5-p7",
        title: "Resumen",
        content:
          "✔ Internet conecta redes de todo el mundo.\n\n✔ Los servidores ofrecen servicios.\n\n✔ Los clientes solicitan informacion.\n\n✔ La Web es uno de los servicios de Internet.",
      },
      {
        id: "b1-5-p8",
        title: "Mini reto",
        content:
          "Quien proporciona la informacion al usuario?\n\n○ Cliente\n○ Servidor\n○ Switch\n○ Router",
        illustration: "EdificioSiete.png",
        quiz: {
          type: "multiple-choice",
          question: "Quien proporciona la informacion al usuario?",
          options: [
            { label: "Cliente", isCorrect: false },
            { label: "Servidor", isCorrect: true },
            { label: "Switch", isCorrect: false },
            { label: "Router", isCorrect: false },
          ],
          explanation:
            "El servidor responde a las solicitudes del cliente proporcionando la informacion.",
        },
      },
    ],
  },
  {
    id: "b1-6",
    moduleId: "basic",
    title: "Aplicaciones Cotidianas de las Redes",
    pages: [
      {
        id: "b1-6-p1",
        title: "Las redes estan en todas partes",
        content:
          "Desde que despiertas hasta que termina el dia, utilizas redes sin darte cuenta.\n\nCada mensaje, busqueda o compra depende de una infraestructura de comunicacion.",
        illustration: "OndasRadio.png",
      },
      {
        id: "b1-6-p2",
        title: "En el hogar",
        content:
          "Las redes permiten conectar:\n\n• Computadoras.\n• Celulares.\n• Smart TV.\n• Consolas.\n• Camaras de seguridad.\n• Asistentes virtuales.\n\nTodos pueden compartir la misma conexion a Internet.",
        illustration: "DosPCsConectadas.png",
      },
      {
        id: "b1-6-p3",
        title: "En la educacion",
        content:
          "Las instituciones educativas utilizan redes para:\n\n• Plataformas virtuales.\n• Bibliotecas digitales.\n• Videoconferencias.\n• Laboratorios.\n• Compartir documentos.\n\nLas redes facilitan el aprendizaje a distancia.",
        illustration: "AppsEnPC.png",
      },
      {
        id: "b1-6-p4",
        title: "En las empresas",
        content:
          "Las organizaciones utilizan redes para:\n\n• Compartir archivos.\n• Controlar inventarios.\n• Gestionar clientes.\n• Comunicarse entre sedes.\n• Realizar videoconferencias.\n\nSin redes, muchas empresas no funcionarian.",
        illustration: "EdificioSiete.png",
      },
      {
        id: "b1-6-p5",
        title: "En hospitales",
        content:
          "Las redes ayudan a:\n\n• Consultar historias clinicas.\n• Compartir resultados medicos.\n• Monitorear pacientes.\n• Coordinar emergencias.\n\nLa informacion puede llegar rapidamente a los especialistas.",
        illustration: "RedPrivada.png",
      },
      {
        id: "b1-6-p6",
        title: "En bancos",
        content:
          "Cuando realizas una transferencia o pagas con tarjeta, la informacion viaja por una red segura.\n\nEsto permite realizar operaciones financieras en pocos segundos.",
        illustration: "RedPrivada.png",
      },
      {
        id: "b1-6-p7",
        title: "Resumen",
        content:
          "Las redes estan presentes en:\n\n🏠 Hogares\n🏫 Escuelas\n🏢 Empresas\n🏥 Hospitales\n🏦 Bancos\n🌎 Gobiernos",
      },
      {
        id: "b1-6-p8",
        title: "Mini reto",
        content:
          "Cual de estos lugares depende de una red informatica?\n\n○ Hospital\n○ Banco\n○ Escuela\n○ Todos los anteriores",
        illustration: "SoldadoHenry.png",
        quiz: {
          type: "multiple-choice",
          question: "Cual de estos lugares depende de una red informatica?",
          options: [
            { label: "Hospital", isCorrect: false },
            { label: "Banco", isCorrect: false },
            { label: "Escuela", isCorrect: false },
            { label: "Todos los anteriores", isCorrect: true },
          ],
          explanation:
            "Hospitales, bancos y escuelas dependen de redes informaticas.",
        },
      },
    ],
  },
  {
    id: "b1-7",
    moduleId: "basic",
    title: "Conceptos Fundamentales de Redes",
    pages: [
      {
        id: "b1-7-p1",
        title: "Antes de continuar...",
        content:
          "Ahora que conoces que es una red, aprenderas algunos terminos que apareceran constantemente durante el curso.",
        illustration: "SoldadoHenry.png",
      },
      {
        id: "b1-7-p2",
        title: "Nodo",
        content:
          "Un nodo es cualquier dispositivo conectado a una red.\n\nPuede ser:\n\n• Una computadora.\n• Un telefono.\n• Un servidor.\n• Una impresora.\n• Un router.",
        illustration: "Router.png",
        conceptBox: "Todo dispositivo conectado es un nodo.",
      },
      {
        id: "b1-7-p3",
        title: "Enlace",
        content:
          "Un enlace es el medio que permite comunicar dos dispositivos.\n\nPuede ser:\n\n• Cableado.\n• Inalambrico.\n\nLos enlaces transportan los datos entre los nodos.",
        illustration: "CabelEthernet.png",
      },
      {
        id: "b1-7-p4",
        title: "Paquete de datos",
        content:
          "La informacion no viaja completa.\n\nSe divide en pequenas unidades llamadas paquetes.\n\nCada paquete contiene:\n\n• Origen.\n• Destino.\n• Datos.\n• Informacion de control.",
        illustration: "Paquete.png",
      },
      {
        id: "b1-7-p5",
        title: "Ancho de banda",
        content:
          "El ancho de banda representa la cantidad de informacion que puede transmitirse por una red en un determinado tiempo.\n\nMayor ancho de banda significa mayor capacidad de transmision.",
      },
      {
        id: "b1-7-p6",
        title: "Latencia",
        content:
          "La latencia es el tiempo que tarda un dato en viajar desde el origen hasta el destino.\n\nUna menor latencia significa una comunicacion mas rapida.",
      },
      {
        id: "b1-7-p7",
        title: "Glosario rapido",
        content:
          "Nodo\nEnlace\nPaquete\nAncho de banda\nLatencia\nCliente\nServidor\n\nEstos conceptos apareceran durante todo el curso.",
      },
      {
        id: "b1-7-p8",
        title: "Mini reto",
        content:
          "Que termino describe el tiempo que tarda un dato en viajar?\n\n○ Nodo\n○ Latencia\n○ Paquete\n○ Ethernet",
        illustration: "Paquete.png",
      },
      {
        id: "b1-7-p9",
        title: "Prueba practica",
        content: "Demuestra lo que aprendiste sobre conceptos fundamentales.",
        quiz: {
          type: "ordering",
          question: "Ordena estos conceptos del mas basico al mas avanzado:",
          correctOrder: [
            "Nodo",
            "Enlace",
            "Paquete",
            "Ancho de banda",
            "Latencia",
          ],
          explanation:
            "Un nodo es un dispositivo, un enlace lo conecta, los datos viajan en paquetes, el ancho de banda mide capacidad y la latencia mide tiempo.",
        },
      },
    ],
  },
  {
    id: "b1-8",
    moduleId: "basic",
    title: "Recorrido de un Dato en una Red",
    pages: [
      {
        id: "b1-8-p1",
        title: "Introduccion",
        content:
          "Cuando envias un mensaje o abres una pagina web, la informacion no aparece por arte de magia. Los datos recorren un camino pasando por varios dispositivos antes de llegar a su destino.",
        illustration: "DosPCsConectadas.png",
      },
      {
        id: "b1-8-p2",
        title: "Paso 1: El dispositivo crea los datos",
        content:
          "Todo comienza cuando realizas una accion, como enviar un mensaje, abrir una pagina web o reproducir un video.\n\nTu dispositivo convierte esa accion en informacion digital.",
        illustration: "Paquete.png",
      },
      {
        id: "b1-8-p3",
        title: "Paso 2: Los datos llegan al router",
        content:
          "El router recibe la informacion y decide hacia donde debe enviarla.\n\nEs el encargado de conectar tu red local con Internet.",
        illustration: "Router.png",
        conceptBox:
          "El router actua como un guia que indica el mejor camino para los datos.",
      },
      {
        id: "b1-8-p4",
        title: "Paso 3: Viaje por Internet",
        content:
          "Los datos recorren diferentes redes hasta llegar al servidor o al dispositivo destino.\n\nEste recorrido puede atravesar ciudades, paises o incluso continentes.",
        illustration: "Topologias.png",
      },
      {
        id: "b1-8-p5",
        title: "Paso 4: El servidor responde",
        content:
          "Si la informacion solicitada esta en un servidor (por ejemplo, una pagina web), este procesa la peticion y envia una respuesta.",
        illustration: "EdificioSiete.png",
      },
      {
        id: "b1-8-p6",
        title: "Paso 5: Los datos regresan",
        content:
          "La respuesta vuelve por la red hasta llegar a tu dispositivo.\n\nTodo este proceso ocurre en pocos segundos.",
        illustration: "EdificioSiete.png",
      },
      {
        id: "b1-8-p7",
        title: "Resumen",
        content:
          "Todo mensaje sigue un recorrido similar:\n\n✔ Dispositivo\n➡ Router\n➡ Internet\n➡ Servidor\n➡ Internet\n➡ Router\n➡ Dispositivo",
        illustration: "Topologias.png",
      },
      {
        id: "b1-8-p8",
        title: "Mini reto",
        content:
          "Quien conecta normalmente tu red domestica con Internet?\n\n○ Switch\n○ Router\n○ Impresora\n○ Servidor",
        illustration: "Router.png",
        quiz: {
          type: "multiple-choice",
          question: "Quien conecta normalmente tu red domestica con Internet?",
          options: [
            { label: "Switch", isCorrect: false },
            { label: "Router", isCorrect: true },
            { label: "Impresora", isCorrect: false },
            { label: "Servidor", isCorrect: false },
          ],
          explanation: "El router conecta tu red local con Internet.",
        },
      },
    ],
  },
  {
    id: "b1-9",
    moduleId: "basic",
    title: "Repaso General del Modulo",
    pages: [
      {
        id: "b1-9-p1",
        title: "Felicidades!",
        content:
          "Has completado el primer modulo de BitProgress.\n\nAhora es momento de repasar todo lo aprendido antes de continuar.",
        illustration: "SoldadoHenry.png",
      },
      {
        id: "b1-9-p2",
        title: "Lo que aprendiste",
        content:
          "Durante este modulo conociste:\n\n• Que es una red.\n• Para que sirven.\n• Tipos de redes.\n• Tecnologias de comunicacion.\n• Internet.\n• Aplicaciones cotidianas.\n• Conceptos basicos.\n• Como viajan los datos.",
      },
      {
        id: "b1-9-p3",
        title: "Conceptos clave",
        content:
          "✔ Red\n\n✔ Nodo\n\n✔ Router\n\n✔ Servidor\n\n✔ Cliente\n\n✔ Internet\n\n✔ LAN\n\n✔ WAN\n\n✔ Ethernet\n\n✔ Wi-Fi\n\n✔ Paquete",
      },
      {
        id: "b1-9-p4",
        title: "Relaciona los conceptos",
        content:
          "Actividad interactiva:\n\n• Router → Conecta redes\n• Servidor → Proporciona servicios\n• Cliente → Solicita informacion\n• Nodo → Dispositivo conectado\n\nActividad: Arrastra cada definicion al concepto correcto.",
        illustration: "SoldadoHenry.png",
      },
      {
        id: "b1-9-p5",
        title: "Completa la oracion",
        content:
          "Una red informatica permite que varios __________ puedan compartir __________ e intercambiar __________.\n\nRespuesta: Dispositivos – recursos – informacion.",
      },
      {
        id: "b1-9-p6",
        title: "Verdadero o falso",
        content:
          "Internet es una red local. ❌ Falso.\n\nUna LAN conecta paises. ❌ Falso.\n\nEl Wi-Fi permite conexiones inalambricas. ✅ Verdadero.\n\nLos servidores ofrecen servicios a los clientes. ✅ Verdadero.",
      },
      {
        id: "b1-9-p7",
        title: "Desafio Final",
        content:
          "Cual seria el orden correcto?\n\n• Computadora\n• Internet\n• Servidor\n• Router\n\nRespuesta: Computadora ➡ Router ➡ Internet ➡ Servidor",
        illustration: "SoldadoHenry.png",
      },
      {
        id: "b1-9-p8",
        title: "Prueba practica",
        content: "Pon a prueba todo lo que aprendiste en el Modulo 1.",
        quiz: {
          type: "ordering",
          question: "Ordena el recorrido correcto de un dato en una red:",
          correctOrder: ["Dispositivo", "Router", "Internet", "Servidor"],
          explanation:
            "Los datos viajan desde tu dispositivo, pasan por el router, recorren Internet hasta el servidor, y regresan por el mismo camino.",
        },
      },
    ],
  },
  {
    id: "b2",
    moduleId: "basic",
    title: "Tipos de redes",
    pages: [
      {
        id: "b2-p1",
        title: "Clasificacion por alcance",
        content:
          "Las redes se clasifican segun la distancia que cubren. Una PAN conecta dispositivos muy cercanos. Una LAN cubre un edificio. Una WAN abarca ciudades o paises.",
        illustration: "Topologias.png",
      },
      {
        id: "b2-p2",
        title: "LAN y WAN",
        content:
          "La LAN es la red mas comun, se encuentra en hogares, oficinas y escuelas. La WAN conecta multiples LAN entre si, siendo Internet el ejemplo mas grande de WAN del mundo.",
        illustration: "LANyWAN.png",
      },
      {
        id: "b2-p3",
        title: "MAN y PAN",
        content:
          "La MAN (Metropolitan Area Network) cubre una ciudad entera. La PAN es la mas personal, conectando tus dispositivos como celular, audifonos y reloj inteligente mediante Bluetooth.",
        illustration: "MANyPAN.png",
      },
      {
        id: "b2-p4",
        title: "Internet, Intranet y Extranet",
        content:
          "Internet es la red global. Una Intranet es una red privada de una organizacion. Una Extranet permite acceso limitado a usuarios externos de una Intranet.",
        illustration: "RedPrivada.png",
      },
      {
        id: "b2-p5",
        title: "Topologias de red",
        content:
          "Las topologias describen como estan organizados los dispositivos en una red. La topologia estrella es la mas comun: todos se conectan a un punto central (switch). La topologia bus usa un cable principal compartido. La topologia anillo forma un circulo cerrado.",
        illustration: "StarTopologia.png",
      },
      {
        id: "b2-p6",
        title: "Ejemplos cotidianos",
        content:
          "En tu hogar, tu WiFi es una PAN/LAN que conecta celular, laptop y TV. Tu escuela tiene una LAN que conecta computers y impresoras. Internet es la WAN que conecta todo el mundo. Bluetooth es un ejemplo perfecto de PAN.",
        illustration: "EdificioSiete.png",
      },
      {
        id: "b2-p7",
        title: "Resumen",
        content:
          "✔ Las redes se clasifican por alcance: PAN, LAN, MAN y WAN.\n\n✔ Internet es la WAN mas grande.\n\n✔ Intranet y Extranet son variantes privadas.\n\n✔ Las topologias describen la forma de la red.\n\n✔ Bluetooth es un ejemplo de PAN.",
      },
      {
        id: "b2-p8",
        title: "Prueba practica",
        content: "Demuestra lo que aprendiste sobre tipos de redes.",
        quiz: {
          type: "multiple-choice",
          question: "Que tipo de red cubre un edificio completo?",
          options: [
            { label: "PAN", isCorrect: false },
            { label: "LAN", isCorrect: true },
            { label: "MAN", isCorrect: false },
            { label: "WAN", isCorrect: false },
          ],
          explanation:
            "Una LAN (Local Area Network) conecta dispositivos dentro de un edificio oarea local.",
        },
      },
    ],
  },
  {
    id: "b3",
    moduleId: "basic",
    title: "Dispositivos de red",
    pages: [
      {
        id: "b3-p1",
        title: "Dispositivos de conexion",
        content:
          "Para que una red exista necesitas dispositivos que permitan la comunicacion. Los mas comunes son el modem, el router y el switch, cada uno con una funcion diferente dentro de la red.",
        illustration: "DispositivosdeConexion.png",
      },
      {
        id: "b3-p2",
        title: "Router y Switch",
        content:
          "El router conecta redes diferentes y dirige el trafico de datos. El switch conecta dispositivos dentro de la misma red local, enviando datos solo al dispositivo correcto.",
        illustration: "RouterySwiches.png",
      },
      {
        id: "b3-p3",
        title: "Otros dispositivos",
        content:
          "Un punto de acceso WiFi permite la conexion inalambrica. Un firewall protege la red de accesos no autorizados. Los servidores almacenan y distribuyen datos a los demas dispositivos.",
        illustration: "OtrosDispositivos.png",
      },
      {
        id: "b3-p4",
        title: "Resumen",
        content:
          "✔ Los dispositivos de red incluyen modems, routers, switches, puntos de acceso WiFi, firewalls y servidores.\n\n✔ Cada uno cumple una funcion especifica para mantener la red funcionando.",
      },
      {
        id: "b3-p5",
        title: "Prueba practica",
        content: "Demuestra lo que aprendiste sobre dispositivos de red.",
        quiz: {
          type: "true-false",
          question:
            "El switch conecta dispositivos dentro de la misma red local.",
          options: [
            { label: "Verdadero", isCorrect: true },
            { label: "Falso", isCorrect: false },
          ],
          explanation:
            "El switch envia datos solo al dispositivo correcto dentro de la misma red local.",
        },
      },
    ],
  },
  {
    id: "i1",
    moduleId: "intermediate",
    title: "Direccionamiento IP",
    pages: [
      {
        id: "i1-p1",
        title: "Que es una IP",
        content:
          "Una direccion IP es un identificador numerico asignado a cada dispositivo dentro de una red. Su funcion es permitir que los dispositivos se encuentren y se comuniquen entre si.",
        illustration: "QueesunaIP.png",
      },
      {
        id: "i1-p2",
        title: "IPv4",
        content:
          "IPv4 utiliza direcciones de 32 bits, lo que permite aproximadamente 4.3 mil millones de direcciones unicas. Se escribe en cuatro grupos de numeros del 0 al 255 separados por puntos, como 192.168.1.1.",
        illustration: "IPv4.png",
      },
      {
        id: "i1-p3",
        title: "IPv6",
        content:
          "IPv6 utiliza direcciones de 128 bits para resolver el agotamiento de IPv4. Se escribe en ocho grupos de numeros hexadecimales separados por dos puntos.",
        illustration: "IPv6.png",
      },
      {
        id: "i1-p4",
        title: "Direccion IP publica vs privada",
        content:
          "Una IP publica es visible en Internet y la asigna tu proveedor. Una IP privada solo funciona dentro de tu red local, como 192.168.x.x, y no es visible desde fuera.",
        illustration: "DireccionIPpublicavsIPprivada.png",
      },
      {
        id: "i1-p5",
        title: "MAC Address",
        content:
          "La direccion MAC es un identificador fisico unico grabado en la tarjeta de red de cada dispositivo. A diferencia de la IP, la MAC no cambia independientemente de la red a la que te conectes.",
        illustration: "MACAddress.png",
      },
      {
        id: "i1-p6",
        title: "Resumen",
        content:
          "✔ Las direcciones IP identifican dispositivos en una red.\n\n✔ IPv4 usa 32 bits, IPv6 usa 128 bits.\n\n✔ Las IPs publicas son para Internet, las privadas para redes locales.\n\n✔ La MAC Address es el ID fisico del dispositivo.",
      },
      {
        id: "i1-p7",
        title: "Prueba practica",
        content: "Demuestra lo que aprendiste sobre direccionamiento IP.",
        quiz: {
          type: "multiple-choice",
          question: "Cuantos bits utiliza una direccion IPv4?",
          options: [
            { label: "16 bits", isCorrect: false },
            { label: "32 bits", isCorrect: true },
            { label: "64 bits", isCorrect: false },
            { label: "128 bits", isCorrect: false },
          ],
          explanation:
            "IPv4 utiliza direcciones de 32 bits, lo que permite aproximadamente 4.3 mil millones de direcciones.",
        },
      },
    ],
  },
  {
    id: "i2",
    moduleId: "intermediate",
    title: "Subredes y mascara",
    pages: [
      {
        id: "i2-p1",
        title: "Que es una subred",
        content:
          "Una subred es una division de una red mas grande. Permite organizar los dispositivos en grupos, mejorar el rendimiento y facilitar la administracion del trafico de datos.",
        illustration: "QueesUnaSubred.png",
      },
      {
        id: "i2-p2",
        title: "La mascara de subred",
        content:
          "La mascara de subred determina que parte de una direccion IP corresponde a la red y cual a los dispositivos. Se escribe como 255.255.255.0, indicando que los primeros tres octetos son la red.",
        illustration: "LaMasccaraDeSubred.png",
      },
      {
        id: "i2-p3",
        title: "CIDR",
        content:
          "CIDR (Classless Inter-Domain Routing) es una forma mas flexible de representar subredes usando una barra y un numero, como /24. Indica cuantos bits corresponden a la red.",
        illustration: "CIDR.png",
      },
      {
        id: "i2-p4",
        title: "Calcular subredes",
        content:
          "Para calcular subredes necesitas saber cuantos dispositivos conectados tendras. Cada subred necesita una direccion de red, una de broadcast y al menos una IP para el router.",
        illustration: "CalcularSubredes.png",
      },
      {
        id: "i2-p5",
        title: "Resumen",
        content:
          "✔ Las subredes dividen una red grande en partes mas pequenas.\n\n✔ La mascara determina la red vs los dispositivos.\n\n✔ CIDR es la notacion moderna para representar subredes.",
      },
      {
        id: "i2-p6",
        title: "Prueba practica",
        content: "Demuestra lo que aprendiste sobre subredes y mascaras.",
        quiz: {
          type: "fill-blank",
          question:
            "La mascara de subred 255.255.255.0 indica que los primeros ___ octetos son la red.",
          blankAnswer: ["tres", "3"],
          explanation:
            "255.255.255.0 indica que los primeros tres octetos identifican la red y el ultimo identifica los dispositivos.",
        },
      },
    ],
  },
  {
    id: "i3",
    moduleId: "intermediate",
    title: "Topologias de red",
    pages: [
      {
        id: "i3-p1",
        title: "Que es una topologia",
        content:
          "La topologia de red es la forma en que los dispositivos estan organizados y conectados. Puede ser fisica (cableado real) o logica (como fluyen los datos).",
        illustration: "QueesUnaTopologia.png",
      },
      {
        id: "i3-p2",
        title: "Topologia estrella",
        content:
          "En la topologia estrella todos los dispositivos se conectan a un punto central, normalmente un switch. Es la mas comun en hogares y oficinas por su facilidad de administracion.",
        illustration: "TopologiadeEstrella.png",
      },
      {
        id: "i3-p3",
        title: "Topologia bus y anillo",
        content:
          "En la topologia bus todos comparten un cable principal. En la topologia anillo los dispositivos forman un circulo cerrado. Ambas son menos utilizadas hoy en dia.",
        illustration: "TopologiadeBusyAnillo.png",
      },
      {
        id: "i3-p4",
        title: "Topologia malla",
        content:
          "En la topologia malla cada dispositivo se conecta con varios otros. Ofrece alta disponibilidad pero es costosa. Se usa en redes criticas como las de telecomunicaciones.",
        illustration: "Topologiademalla.png",
      },
      {
        id: "i3-p5",
        title: "Prueba practica",
        content: "Demuestra lo que aprendiste sobre topologias de red.",
        quiz: {
          type: "multiple-choice",
          question:
            "En que topologia todos los dispositivos se conectan a un punto central?",
          options: [
            { label: "Bus", isCorrect: false },
            { label: "Anillo", isCorrect: false },
            { label: "Estrella", isCorrect: true },
            { label: "Malla", isCorrect: false },
          ],
          explanation:
            "En la topologia estrella todos los dispositivos se conectan a un punto central, normalmente un switch.",
        },
      },
    ],
  },
  {
    id: "a1",
    moduleId: "advanced",
    title: "Protocolos TCP/IP",
    pages: [
      {
        id: "a1-p1",
        title: "Que es TCP/IP",
        content:
          "TCP/IP es el conjunto de protocolos que hace funcionar a Internet. TCP se encarga de dividir y reensamblar los datos. IP se encarga de dirigir los paquetes al destino correcto.",
        illustration: "QueesTCP_IP.png",
      },
      {
        id: "a1-p2",
        title: "Capas del modelo TCP/IP",
        content:
          "El modelo tiene 4 capas: Acceso a red, Internet (direccionamiento IP), Transporte (TCP/UDP) y Aplicacion (HTTP, DNS, FTP). Cada capa tiene un rol especifico.",
        illustration: "ModeloTCP.png",
      },
      {
        id: "a1-p3",
        title: "TCP vs UDP",
        content:
          "TCP es confiable: verifica que todos los paquetes lleguen en orden. UDP es rapido pero no garantiza la entrega. TCP se usa en web y correo. UDP se usa en videojuegos y streaming.",
        illustration: "TCPvsUDP.png",
      },
      {
        id: "a1-p4",
        title: "DNS y HTTP",
        content:
          "DNS traduce nombres de dominio a direcciones IP. HTTP es el protocolo para transferir paginas web. HTTPS anade cifrado para mayor seguridad.",
        illustration: "DNSyHTTP.png",
      },
      {
        id: "a1-p5",
        title: "Resumen",
        content:
          "✔ TCP/IP es la base de Internet.\n\n✔ Tiene 4 capas y usa TCP para datos confiables y UDP para datos rapidos.\n\n✔ DNS resuelve nombres y HTTP transfiere paginas web.",
      },
      {
        id: "a1-p6",
        title: "Prueba practica",
        content: "Demuestra lo que aprendiste sobre protocolos TCP/IP.",
        quiz: {
          type: "true-false",
          question: "TCP es mas rapido que UDP pero no garantiza la entrega.",
          options: [
            { label: "Verdadero", isCorrect: false },
            { label: "Falso", isCorrect: true },
          ],
          explanation:
            "UDP es mas rapido que TCP, pero no garantiza la entrega. TCP es confiable pero mas lento.",
        },
      },
    ],
  },
  {
    id: "a2",
    moduleId: "advanced",
    title: "Puertos y servicios",
    pages: [
      {
        id: "a2-p1",
        title: "Que es un puerto",
        content:
          "Un puerto es un numero del 0 al 65535 que identifica un servicio o aplicacion especifica dentro de un dispositivo. Permite que multiples servicios funcionen en el mismo equipo simultaneamente.",
        illustration: "QueesunPuerto.png",
      },
      {
        id: "a2-p2",
        title: "Puertos comunes",
        content:
          "Puerto 80: HTTP (web sin cifrar).\nPuerto 443: HTTPS (web cifrada).\nPuerto 22: SSH (acceso remoto).\nPuerto 53: DNS (resolucion de nombres).\nPuerto 25: SMTP (correo saliente).",
        illustration: "PuertosComunes.png",
      },
      {
        id: "a2-p3",
        title: "Servicios de red",
        content:
          "Un servicio es una funcion que ofrece un servidor a los clientes. Los mas comunes son web (HTTP), correo (SMTP/IMAP), DNS, FTP y DHCP (asignacion automatica de IPs).",
        illustration: "ServiciosdeRed.png",
      },
      {
        id: "a2-p4",
        title: "Firewall y puertos",
        content:
          "Un firewall controla que puertos estan abiertos o cerrados. Cerrar puertos innecesarios reduce la superficie de ataque. Solo se deben abrir los puertos que realmente se necesitan.",
        illustration: "FirewallyPuertos.png",
      },
      {
        id: "a2-p5",
        title: "Prueba practica",
        content: "Demuestra lo que aprendiste sobre puertos y servicios.",
        quiz: {
          type: "fill-blank",
          question:
            "El puerto ___ se utiliza para conexiones HTTPS (web cifrada).",
          blankAnswer: "443",
          explanation:
            "El puerto 443 se utiliza para HTTPS, que es la version cifrada del protocolo HTTP.",
        },
      },
    ],
  },
  {
    id: "a3",
    moduleId: "advanced",
    title: "Seguridad en red",
    pages: [
      {
        id: "a3-p1",
        title: "Principales amenazas",
        content:
          "Las redes enfrentan amenazas como malware, phishing, ataques DDoS y accesos no autorizados. Conocer estas amenazas es el primer paso para protegerse.",
        illustration: "PrincipalesAmenazas.png",
      },
      {
        id: "a3-p2",
        title: "Cifrado de datos",
        content:
          "El cifrado convierte los datos en codigo ilegible para quien no tenga la clave. TLS/SSL protege el trafico web. WPA2/WPA3 cifra las conexiones WiFi.",
        illustration: "CifradodeDatos.png",
      },
      {
        id: "a3-p3",
        title: "Autenticacion y contrasenas",
        content:
          "La autenticacion verifica tu identidad. Usa contrasenas fuertes (12+ caracteres, mezcla de tipos). La autenticacion de dos factores (2FA) anade una capa extra de seguridad.",
        illustration: "AutenticacionyContraceñas.png",
      },
      {
        id: "a3-p4",
        title: "Buenas practicas",
        content:
          "Mantene tus dispositivos actualizados. No hagas clic en enlaces sospechosos. Usa antivirus. Configura tu firewall. Haz copias de seguridad periodicas. Usa VPN en redes publicas.",
        illustration: "BuenasPracticas.png",
      },
      {
        id: "a3-p5",
        title: "Resumen",
        content:
          "✔ La seguridad de red requiere cifrado, autenticacion fuerte y buenas practicas.\n\n✔ Conocer las amenazas y aplicar medidas basicas protege tu informacion.",
      },
      {
        id: "a3-p6",
        title: "Prueba practica",
        content: "Demuestra lo que aprendiste sobre seguridad en red.",
        quiz: {
          type: "ordering",
          question:
            "Ordena estas buenas practicas de seguridad de menor a mayor complejidad:",
          correctOrder: [
            "No hagas clic en enlaces sospechosos",
            "Usa contrasenas fuertes",
            "Configura tu firewall",
            "Usa VPN en redes publicas",
          ],
          explanation:
            "Desde habitos simples como no clickear enlaces sospechosos, hasta configuraciones mas avanzadas como firewalls y VPNs.",
        },
      },
    ],
  },
];
