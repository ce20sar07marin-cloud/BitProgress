import type { QuizData } from "@/types/lesson";

export interface EvaluationPage {
  id: string;
  title: string;
  quiz: QuizData;
}

export interface Evaluation {
  id: string;
  moduleId: string;
  title: string;
  pages: EvaluationPage[];
}

export const evaluationsData: Evaluation[] = [
  {
    id: "b1",
    moduleId: "basic",
    title: "Fundamentos de Redes",
    pages: [
      {
        id: "b1-e1",
        title: "Pregunta 1",
        quiz: {
          type: "multiple-choice",
          question: "Que es una red informatica?",
          options: [
            { label: "Dispositivos conectados para compartir informacion", isCorrect: true },
            { label: "Un tipo de cable", isCorrect: false },
            { label: "Un programa de computadora", isCorrect: false },
            { label: "Un dispositivo solitario", isCorrect: false },
          ],
        },
      },
      {
        id: "b1-e2",
        title: "Pregunta 2",
        quiz: {
          type: "multiple-choice",
          question: "Cual de estos dispositivos puede formar parte de una red?",
          options: [
            { label: "Router", isCorrect: true },
            { label: "Microondas", isCorrect: false },
            { label: "Ventilador", isCorrect: false },
            { label: "Licuadora", isCorrect: false },
          ],
        },
      },
      {
        id: "b1-e3",
        title: "Pregunta 3",
        quiz: {
          type: "multiple-choice",
          question: "Que tipo de red es el Wi-Fi de tu casa?",
          options: [
            { label: "LAN", isCorrect: true },
            { label: "WAN", isCorrect: false },
            { label: "PAN", isCorrect: false },
            { label: "MAN", isCorrect: false },
          ],
        },
      },
      {
        id: "b1-e4",
        title: "Pregunta 4",
        quiz: {
          type: "multiple-choice",
          question: "Que tecnologia utiliza pulsos de luz para transmitir datos?",
          options: [
            { label: "Fibra optica", isCorrect: true },
            { label: "Wi-Fi", isCorrect: false },
            { label: "Bluetooth", isCorrect: false },
            { label: "Ethernet", isCorrect: false },
          ],
        },
      },
      {
        id: "b1-e5",
        title: "Pregunta 5",
        quiz: {
          type: "multiple-choice",
          question: "Que es un servidor?",
          options: [
            { label: "Una computadora que ofrece servicios a otros dispositivos", isCorrect: true },
            { label: "Un tipo de cable", isCorrect: false },
            { label: "Un celular conectado a internet", isCorrect: false },
            { label: "Un programa de messenger", isCorrect: false },
          ],
        },
      },
      {
        id: "b1-e6",
        title: "Pregunta 6",
        quiz: {
          type: "multiple-choice",
          question: "Que permite una red informatica?",
          options: [
            { label: "Comunicarse y compartir recursos", isCorrect: true },
            { label: "Solo enviar correos", isCorrect: false },
            { label: "Imprimir documentos unicamente", isCorrect: false },
            { label: "Nada mas navegar en internet", isCorrect: false },
          ],
        },
      },
      {
        id: "b1-e7",
        title: "Pregunta 7",
        quiz: {
          type: "ordering",
          question: "Ordena el recorrido correcto de un dato en una red:",
          correctOrder: ["Dispositivo", "Router", "Internet", "Servidor"],
        },
      },
      {
        id: "b1-e8",
        title: "Pregunta 8",
        quiz: {
          type: "true-false",
          question: "Internet es la red mas grande del mundo.",
          options: [
            { label: "Verdadero", isCorrect: true },
            { label: "Falso", isCorrect: false },
          ],
        },
      },
    ],
  },
  {
    id: "b2",
    moduleId: "basic",
    title: "Tipos de Redes",
    pages: [
      {
        id: "b2-e1",
        title: "Pregunta 1",
        quiz: {
          type: "multiple-choice",
          question: "Que tipo de red conecta dispositivos dentro de un edificio?",
          options: [
            { label: "LAN", isCorrect: true },
            { label: "WAN", isCorrect: false },
            { label: "PAN", isCorrect: false },
            { label: "MAN", isCorrect: false },
          ],
        },
      },
      {
        id: "b2-e2",
        title: "Pregunta 2",
        quiz: {
          type: "multiple-choice",
          question: "Cual es el alcance maximo de una PAN?",
          options: [
            { label: "10 metros", isCorrect: true },
            { label: "1 km", isCorrect: false },
            { label: "50 km", isCorrect: false },
            { label: "Sin limite", isCorrect: false },
          ],
        },
      },
      {
        id: "b2-e3",
        title: "Pregunta 3",
        quiz: {
          type: "multiple-choice",
          question: "Que tipo de red cubre una ciudad completa?",
          options: [
            { label: "MAN", isCorrect: true },
            { label: "LAN", isCorrect: false },
            { label: "PAN", isCorrect: false },
            { label: "WAN", isCorrect: false },
          ],
        },
      },
      {
        id: "b2-e4",
        title: "Pregunta 4",
        quiz: {
          type: "multiple-choice",
          question: "Que es una Intranet?",
          options: [
            { label: "Una red privada de una organizacion", isCorrect: true },
            { label: "Internet publico", isCorrect: false },
            { label: "Una red social", isCorrect: false },
            { label: "Un tipo de WAN", isCorrect: false },
          ],
        },
      },
      {
        id: "b2-e5",
        title: "Pregunta 5",
        quiz: {
          type: "multiple-choice",
          question: "Que tecnologia usa comunmente la PAN?",
          options: [
            { label: "Bluetooth", isCorrect: true },
            { label: "Fibra optica", isCorrect: false },
            { label: "Cable Ethernet", isCorrect: false },
            { label: "Satelite", isCorrect: false },
          ],
        },
      },
      {
        id: "b2-e6",
        title: "Pregunta 6",
        quiz: {
          type: "true-false",
          question: "Una Extranet permite acceso limitado a usuarios externos.",
          options: [
            { label: "Verdadero", isCorrect: true },
            { label: "Falso", isCorrect: false },
          ],
        },
      },
      {
        id: "b2-e7",
        title: "Pregunta 7",
        quiz: {
          type: "multiple-choice",
          question: "Que conecta una MAN?",
          options: [
            { label: "Varias LAN dentro de una ciudad", isCorrect: true },
            { label: "Dispositivos en un escritorio", isCorrect: false },
            { label: "Paises enteros", isCorrect: false },
            { label: "Solo dispositivos moviles", isCorrect: false },
          ],
        },
      },
      {
        id: "b2-e8",
        title: "Pregunta 8",
        quiz: {
          type: "ordering",
          question: "Ordena las redes de menor a mayor alcance:",
          correctOrder: ["PAN", "LAN", "MAN", "WAN"],
        },
      },
    ],
  },
  {
    id: "b3",
    moduleId: "basic",
    title: "Dispositivos de Red",
    pages: [
      {
        id: "b3-e1",
        title: "Pregunta 1",
        quiz: {
          type: "multiple-choice",
          question: "Que hace un router?",
          options: [
            { label: "Conecta redes diferentes y dirige el trafico", isCorrect: true },
            { label: "Solo imprime documentos", isCorrect: false },
            { label: "Almacena archivos", isCorrect: false },
            { label: "Conecta solo audifonos", isCorrect: false },
          ],
        },
      },
      {
        id: "b3-e2",
        title: "Pregunta 2",
        quiz: {
          type: "true-false",
          question: "El switch conecta dispositivos dentro de la misma red local.",
          options: [
            { label: "Verdadero", isCorrect: true },
            { label: "Falso", isCorrect: false },
          ],
        },
      },
      {
        id: "b3-e3",
        title: "Pregunta 3",
        quiz: {
          type: "multiple-choice",
          question: "Que hace un firewall?",
          options: [
            { label: "Protege la red de accesos no autorizados", isCorrect: true },
            { label: "Acelera la conexion a internet", isCorrect: false },
            { label: "Amplia la senal WiFi", isCorrect: false },
            { label: "Imprime documentos en red", isCorrect: false },
          ],
        },
      },
      {
        id: "b3-e4",
        title: "Pregunta 4",
        quiz: {
          type: "multiple-choice",
          question: "Que es un punto de acceso WiFi?",
          options: [
            { label: "Permite conexion inalambrica a la red", isCorrect: true },
            { label: "Un tipo de servidor", isCorrect: false },
            { label: "Un cable de red", isCorrect: false },
            { label: "Un programa de seguridad", isCorrect: false },
          ],
        },
      },
      {
        id: "b3-e5",
        title: "Pregunta 5",
        quiz: {
          type: "multiple-choice",
          question: "Que funcion tienen los servidores en una red?",
          options: [
            { label: "Almacenan y distribuyen datos", isCorrect: true },
            { label: "Solo navegan por internet", isCorrect: false },
            { label: "Conectan impresoras", isCorrect: false },
            { label: "Cargan dispositivos moviles", isCorrect: false },
          ],
        },
      },
      {
        id: "b3-e6",
        title: "Pregunta 6",
        quiz: {
          type: "true-false",
          question: "El router y el modem son exactamente lo mismo.",
          options: [
            { label: "Verdadero", isCorrect: false },
            { label: "Falso", isCorrect: true },
          ],
        },
      },
      {
        id: "b3-e7",
        title: "Pregunta 7",
        quiz: {
          type: "multiple-choice",
          question: "Cual es la diferencia principal entre un router y un switch?",
          options: [
            { label: "El router conecta redes; el switch conecta dispositivos en la misma red", isCorrect: true },
            { label: "Son exactamente lo mismo", isCorrect: false },
            { label: "El switch es mas caro", isCorrect: false },
            { label: "El router solo sirve para WiFi", isCorrect: false },
          ],
        },
      },
      {
        id: "b3-e8",
        title: "Pregunta 8",
        quiz: {
          type: "multiple-choice",
          question: "Que dispositivos forman la infraestructura basica de una red?",
          options: [
            { label: "Modem, router y switch", isCorrect: true },
            { label: "Solo una impresora", isCorrect: false },
            { label: "Un televisor y un decoder", isCorrect: false },
            { label: "Un mouse y un teclado", isCorrect: false },
          ],
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
        id: "i1-e1",
        title: "Pregunta 1",
        quiz: {
          type: "multiple-choice",
          question: "Cuantos bits utiliza una direccion IPv4?",
          options: [
            { label: "32 bits", isCorrect: true },
            { label: "16 bits", isCorrect: false },
            { label: "64 bits", isCorrect: false },
            { label: "128 bits", isCorrect: false },
          ],
        },
      },
      {
        id: "i1-e2",
        title: "Pregunta 2",
        quiz: {
          type: "multiple-choice",
          question: "Cuantos bits utiliza IPv6?",
          options: [
            { label: "128 bits", isCorrect: true },
            { label: "32 bits", isCorrect: false },
            { label: "64 bits", isCorrect: false },
            { label: "256 bits", isCorrect: false },
          ],
        },
      },
      {
        id: "i1-e3",
        title: "Pregunta 3",
        quiz: {
          type: "multiple-choice",
          question: "Que es una IP publica?",
          options: [
            { label: "Una direccion visible en Internet asignada por el proveedor", isCorrect: true },
            { label: "Una direccion que solo funciona en tu casa", isCorrect: false },
            { label: "Una direccion de correo electronico", isCorrect: false },
            { label: "Un tipo de contrasena", isCorrect: false },
          ],
        },
      },
      {
        id: "i1-e4",
        title: "Pregunta 4",
        quiz: {
          type: "true-false",
          question: "La MAC Address cambia cuando te conectas a otra red.",
          options: [
            { label: "Falso", isCorrect: true },
            { label: "Verdadero", isCorrect: false },
          ],
        },
      },
      {
        id: "i1-e5",
        title: "Pregunta 5",
        quiz: {
          type: "multiple-choice",
          question: "Cuantas direcciones permite IPv4 aproximadamente?",
          options: [
            { label: "4.3 mil millones", isCorrect: true },
            { label: "4 mil millones de mil millones", isCorrect: false },
            { label: "400 mil", isCorrect: false },
            { label: "4 mil", isCorrect: false },
          ],
        },
      },
      {
        id: "i1-e6",
        title: "Pregunta 6",
        quiz: {
          type: "multiple-choice",
          question: "Que es una IP privada?",
          options: [
            { label: "Una direccion que solo funciona dentro de la red local", isCorrect: true },
            { label: "Una direccion visible en todo internet", isCorrect: false },
            { label: "Una direccion de servidor publico", isCorrect: false },
            { label: "Un tipo de dominio web", isCorrect: false },
          ],
        },
      },
      {
        id: "i1-e7",
        title: "Pregunta 7",
        quiz: {
          type: "true-false",
          question: "IPv4 tiene mas direcciones disponibles que IPv6.",
          options: [
            { label: "Verdadero", isCorrect: false },
            { label: "Falso", isCorrect: true },
          ],
        },
      },
      {
        id: "i1-e8",
        title: "Pregunta 8",
        quiz: {
          type: "multiple-choice",
          question: "Donde esta grabada la direccion MAC?",
          options: [
            { label: "En la tarjeta de red del dispositivo", isCorrect: true },
            { label: "En el router", isCorrect: false },
            { label: "En el servidor DNS", isCorrect: false },
            { label: "En el cable Ethernet", isCorrect: false },
          ],
        },
      },
    ],
  },
  {
    id: "i2",
    moduleId: "intermediate",
    title: "Subredes y Mascara",
    pages: [
      {
        id: "i2-e1",
        title: "Pregunta 1",
        quiz: {
          type: "multiple-choice",
          question: "Que es una subred?",
          options: [
            { label: "Una division de una red mas grande", isCorrect: true },
            { label: "Un tipo de internet", isCorrect: false },
            { label: "Un servidor pequeno", isCorrect: false },
            { label: "Un programa de red", isCorrect: false },
          ],
        },
      },
      {
        id: "i2-e2",
        title: "Pregunta 2",
        quiz: {
          type: "fill-blank",
          question: "La mascara de subred 255.255.255.0 indica que los primeros ___ octetos son la red.",
          blankAnswer: ["tres", "3"],
        },
      },
      {
        id: "i2-e3",
        title: "Pregunta 3",
        quiz: {
          type: "multiple-choice",
          question: "Que significa CIDR?",
          options: [
            { label: "Classless Inter-Domain Routing", isCorrect: true },
            { label: "Computer Internet Data Route", isCorrect: false },
            { label: "Central Internet Data Repository", isCorrect: false },
            { label: "Connected Internal Device Ring", isCorrect: false },
          ],
        },
      },
      {
        id: "i2-e4",
        title: "Pregunta 4",
        quiz: {
          type: "multiple-choice",
          question: "Que representa /24 en notacion CIDR?",
          options: [
            { label: "24 bits corresponden a la red", isCorrect: true },
            { label: "24 dispositivos conectados", isCorrect: false },
            { label: "24 subredes disponibles", isCorrect: false },
            { label: "Velocidad de 24 Mbps", isCorrect: false },
          ],
        },
      },
      {
        id: "i2-e5",
        title: "Pregunta 5",
        quiz: {
          type: "true-false",
          question: "Las subredes dificultan la administracion de una red grande.",
          options: [
            { label: "Verdadero", isCorrect: false },
            { label: "Falso", isCorrect: true },
          ],
        },
      },
      {
        id: "i2-e6",
        title: "Pregunta 6",
        quiz: {
          type: "multiple-choice",
          question: "Que necesitas saber para calcular subredes?",
          options: [
            { label: "Cuantos dispositivos conectados habra", isCorrect: true },
            { label: "El color del cable", isCorrect: false },
            { label: "El nombre del proveedor", isCorrect: false },
            { label: "La marca del router", isCorrect: false },
          ],
        },
      },
      {
        id: "i2-e7",
        title: "Pregunta 7",
        quiz: {
          type: "multiple-choice",
          question: "Que direccion necesita cada subred como minimo?",
          options: [
            { label: "Una direccion de red y una de broadcast", isCorrect: true },
            { label: "Solo una IP privada", isCorrect: false },
            { label: "Una direccion MAC", isCorrect: false },
            { label: "Un nombre de dominio", isCorrect: false },
          ],
        },
      },
      {
        id: "i2-e8",
        title: "Pregunta 8",
        quiz: {
          type: "true-false",
          question: "La mascara de subred determina que parte es la red y que parte son los dispositivos.",
          options: [
            { label: "Verdadero", isCorrect: true },
            { label: "Falso", isCorrect: false },
          ],
        },
      },
    ],
  },
  {
    id: "i3",
    moduleId: "intermediate",
    title: "Topologias de Red",
    pages: [
      {
        id: "i3-e1",
        title: "Pregunta 1",
        quiz: {
          type: "multiple-choice",
          question: "En que topologia todos los dispositivos se conectan a un punto central?",
          options: [
            { label: "Estrella", isCorrect: true },
            { label: "Bus", isCorrect: false },
            { label: "Anillo", isCorrect: false },
            { label: "Malla", isCorrect: false },
          ],
        },
      },
      {
        id: "i3-e2",
        title: "Pregunta 2",
        quiz: {
          type: "multiple-choice",
          question: "Que es la topologia de red?",
          options: [
            { label: "La forma en que los dispositivos estan organizados y conectados", isCorrect: true },
            { label: "El tipo de cable utilizado", isCorrect: false },
            { label: "La velocidad de la conexion", isCorrect: false },
            { label: "El proveedor de internet", isCorrect: false },
          ],
        },
      },
      {
        id: "i3-e3",
        title: "Pregunta 3",
        quiz: {
          type: "multiple-choice",
          question: "Cual es la topologia mas comun en hogares y oficinas?",
          options: [
            { label: "Estrella", isCorrect: true },
            { label: "Bus", isCorrect: false },
            { label: "Anillo", isCorrect: false },
            { label: "Malla completa", isCorrect: false },
          ],
        },
      },
      {
        id: "i3-e4",
        title: "Pregunta 4",
        quiz: {
          type: "multiple-choice",
          question: "En la topologia bus, como se conectan los dispositivos?",
          options: [
            { label: "Comparten un cable principal", isCorrect: true },
            { label: "Cada uno tiene su cable al servidor", isCorrect: false },
            { label: "Forman un circulo cerrado", isCorrect: false },
            { label: "Se conectan por bluetooth", isCorrect: false },
          ],
        },
      },
      {
        id: "i3-e5",
        title: "Pregunta 5",
        quiz: {
          type: "multiple-choice",
          question: "Cual es la caracteristica de la topologia malla?",
          options: [
            { label: "Cada dispositivo se conecta con varios otros", isCorrect: true },
            { label: "Todos comparten un solo cable", isCorrect: false },
            { label: "Solo funciona con WiFi", isCorrect: false },
            { label: "Es la mas economica", isCorrect: false },
          ],
        },
      },
      {
        id: "i3-e6",
        title: "Pregunta 6",
        quiz: {
          type: "true-false",
          question: "La topologia anillo forma un circulo cerrado de dispositivos.",
          options: [
            { label: "Verdadero", isCorrect: true },
            { label: "Falso", isCorrect: false },
          ],
        },
      },
      {
        id: "i3-e7",
        title: "Pregunta 7",
        quiz: {
          type: "multiple-choice",
          question: "En que tipo de red se usa la topologia malla?",
          options: [
            { label: "Redes criticas como telecomunicaciones", isCorrect: true },
            { label: "Solo en hogares", isCorrect: false },
            { label: "Solo en escuelas", isCorrect: false },
            { label: "En redes personales", isCorrect: false },
          ],
        },
      },
      {
        id: "i3-e8",
        title: "Pregunta 8",
        quiz: {
          type: "multiple-choice",
          question: "Que tipo de topologia puede ser fisica o logica?",
          options: [
            { label: "Cualquier topologia de red", isCorrect: true },
            { label: "Solo la estrella", isCorrect: false },
            { label: "Solo la malla", isCorrect: false },
            { label: "Solo el bus", isCorrect: false },
          ],
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
        id: "a1-e1",
        title: "Pregunta 1",
        quiz: {
          type: "multiple-choice",
          question: "Cuantas capas tiene el modelo TCP/IP?",
          options: [
            { label: "4 capas", isCorrect: true },
            { label: "7 capas", isCorrect: false },
            { label: "5 capas", isCorrect: false },
            { label: "3 capas", isCorrect: false },
          ],
        },
      },
      {
        id: "a1-e2",
        title: "Pregunta 2",
        quiz: {
          type: "true-false",
          question: "TCP es mas rapido que UDP pero no garantiza la entrega.",
          options: [
            { label: "Falso", isCorrect: true },
            { label: "Verdadero", isCorrect: false },
          ],
        },
      },
      {
        id: "a1-e3",
        title: "Pregunta 3",
        quiz: {
          type: "multiple-choice",
          question: "Que hace DNS?",
          options: [
            { label: "Traduce nombres de dominio a direcciones IP", isCorrect: true },
            { label: "Envia correos electronicos", isCorrect: false },
            { label: "Conecta cables de red", isCorrect: false },
            { label: "Almacena archivos en la nube", isCorrect: false },
          ],
        },
      },
      {
        id: "a1-e4",
        title: "Pregunta 4",
        quiz: {
          type: "multiple-choice",
          question: "Que protocolo se usa para transferir paginas web?",
          options: [
            { label: "HTTP/HTTPS", isCorrect: true },
            { label: "SMTP", isCorrect: false },
            { label: "FTP", isCorrect: false },
            { label: "DHCP", isCorrect: false },
          ],
        },
      },
      {
        id: "a1-e5",
        title: "Pregunta 5",
        quiz: {
          type: "multiple-choice",
          question: "Que protocolo es confiable y verifica que todos los paquetes lleguen?",
          options: [
            { label: "TCP", isCorrect: true },
            { label: "UDP", isCorrect: false },
            { label: "IP", isCorrect: false },
            { label: "HTTP", isCorrect: false },
          ],
        },
      },
      {
        id: "a1-e6",
        title: "Pregunta 6",
        quiz: {
          type: "multiple-choice",
          question: "Que protocolo se usa en videojuegos online por su velocidad?",
          options: [
            { label: "UDP", isCorrect: true },
            { label: "TCP", isCorrect: false },
            { label: "HTTP", isCorrect: false },
            { label: "SMTP", isCorrect: false },
          ],
        },
      },
      {
        id: "a1-e7",
        title: "Pregunta 7",
        quiz: {
          type: "true-false",
          question: "HTTPS y HTTP ofrecen el mismo nivel de seguridad.",
          options: [
            { label: "Verdadero", isCorrect: false },
            { label: "Falso", isCorrect: true },
          ],
        },
      },
      {
        id: "a1-e8",
        title: "Pregunta 8",
        quiz: {
          type: "multiple-choice",
          question: "Que es la capa de Aplicacion en TCP/IP?",
          options: [
            { label: "Donde funcionan HTTP, DNS y FTP", isCorrect: true },
            { label: "Donde se conectan los cables", isCorrect: false },
            { label: "Donde se direccionan los paquetes", isCorrect: false },
            { label: "Donde se verifican los datos", isCorrect: false },
          ],
        },
      },
    ],
  },
  {
    id: "a2",
    moduleId: "advanced",
    title: "Puertos y Servicios",
    pages: [
      {
        id: "a2-e1",
        title: "Pregunta 1",
        quiz: {
          type: "multiple-choice",
          question: "Que es un puerto en red?",
          options: [
            { label: "Un numero que identifica un servicio o aplicacion", isCorrect: true },
            { label: "Un tipo de cable", isCorrect: false },
            { label: "Un lugar fisico donde se conecta un dispositivo", isCorrect: false },
            { label: "Una direccion de internet", isCorrect: false },
          ],
        },
      },
      {
        id: "a2-e2",
        title: "Pregunta 2",
        quiz: {
          type: "fill-blank",
          question: "El puerto ___ se utiliza para conexiones HTTPS (web cifrada).",
          blankAnswer: "443",
        },
      },
      {
        id: "a2-e3",
        title: "Pregunta 3",
        quiz: {
          type: "multiple-choice",
          question: "Que puerto se usa para HTTP?",
          options: [
            { label: "Puerto 80", isCorrect: true },
            { label: "Puerto 443", isCorrect: false },
            { label: "Puerto 22", isCorrect: false },
            { label: "Puerto 25", isCorrect: false },
          ],
        },
      },
      {
        id: "a2-e4",
        title: "Pregunta 4",
        quiz: {
          type: "multiple-choice",
          question: "Que servicio utiliza el puerto 22?",
          options: [
            { label: "SSH (acceso remoto)", isCorrect: true },
            { label: "HTTP (web)", isCorrect: false },
            { label: "DNS (nombres)", isCorrect: false },
            { label: "SMTP (correo)", isCorrect: false },
          ],
        },
      },
      {
        id: "a2-e5",
        title: "Pregunta 5",
        quiz: {
          type: "multiple-choice",
          question: "Que es un servicio de red?",
          options: [
            { label: "Una funcion que ofrece un servidor a los clientes", isCorrect: true },
            { label: "Un tipo de cable", isCorrect: false },
            { label: "Una direccion IP", isCorrect: false },
            { label: "Un dispositivo de red", isCorrect: false },
          ],
        },
      },
      {
        id: "a2-e6",
        title: "Pregunta 6",
        quiz: {
          type: "multiple-choice",
          question: "Que hace un firewall con los puertos?",
          options: [
            { label: "Controla que puertos estan abiertos o cerrados", isCorrect: true },
            { label: "Los abre todos automaticamente", isCorrect: false },
            { label: "Los cierra permanentemente", isCorrect: false },
            { label: "Los convierte en direcciones IP", isCorrect: false },
          ],
        },
      },
      {
        id: "a2-e7",
        title: "Pregunta 7",
        quiz: {
          type: "true-false",
          question: "Es seguro mantener todos los puertos abiertos en un servidor.",
          options: [
            { label: "Verdadero", isCorrect: false },
            { label: "Falso", isCorrect: true },
          ],
        },
      },
      {
        id: "a2-e8",
        title: "Pregunta 8",
        quiz: {
          type: "multiple-choice",
          question: "Que protocolo asigna direcciones IP automaticamente?",
          options: [
            { label: "DHCP", isCorrect: true },
            { label: "DNS", isCorrect: false },
            { label: "HTTP", isCorrect: false },
            { label: "SMTP", isCorrect: false },
          ],
        },
      },
    ],
  },
  {
    id: "a3",
    moduleId: "advanced",
    title: "Seguridad en Red",
    pages: [
      {
        id: "a3-e1",
        title: "Pregunta 1",
        quiz: {
          type: "multiple-choice",
          question: "Que es el cifrado de datos?",
          options: [
            { label: "Convertir datos en codigo ilegible sin la clave", isCorrect: true },
            { label: "Eliminar datos innecesarios", isCorrect: false },
            { label: "Compartir datos por bluetooth", isCorrect: false },
            { label: "Almacenar datos en la nube", isCorrect: false },
          ],
        },
      },
      {
        id: "a3-e2",
        title: "Pregunta 2",
        quiz: {
          type: "multiple-choice",
          question: "Que protocolo cifra el trafico web?",
          options: [
            { label: "TLS/SSL", isCorrect: true },
            { label: "HTTP", isCorrect: false },
            { label: "FTP", isCorrect: false },
            { label: "SMTP", isCorrect: false },
          ],
        },
      },
      {
        id: "a3-e3",
        title: "Pregunta 3",
        quiz: {
          type: "multiple-choice",
          question: "Que tecnologia cifra las conexiones WiFi?",
          options: [
            { label: "WPA2/WPA3", isCorrect: true },
            { label: "HTTP", isCorrect: false },
            { label: "DNS", isCorrect: false },
            { label: "TCP", isCorrect: false },
          ],
        },
      },
      {
        id: "a3-e4",
        title: "Pregunta 4",
        quiz: {
          type: "multiple-choice",
          question: "Que es phishing?",
          options: [
            { label: "Un ataque para robar datos haciendose pasar por otro", isCorrect: true },
            { label: "Un tipo de cifrado", isCorrect: false },
            { label: "Un protocolo de red", isCorrect: false },
            { label: "Un tipo de cable", isCorrect: false },
          ],
        },
      },
      {
        id: "a3-e5",
        title: "Pregunta 5",
        quiz: {
          type: "multiple-choice",
          question: "Que es la autenticacion de dos factores (2FA)?",
          options: [
            { label: "Una capa extra de seguridad ademas de la contrasena", isCorrect: true },
            { label: "Usar dos contrasenas iguales", isCorrect: false },
            { label: "Conectarse a dos redes a la vez", isCorrect: false },
            { label: "Usar dos navegadores diferentes", isCorrect: false },
          ],
        },
      },
      {
        id: "a3-e6",
        title: "Pregunta 6",
        quiz: {
          type: "true-false",
          question: "Una contrasena de solo 4 caracteres es suficiente para proteger tu cuenta.",
          options: [
            { label: "Verdadero", isCorrect: false },
            { label: "Falso", isCorrect: true },
          ],
        },
      },
      {
        id: "a3-e7",
        title: "Pregunta 7",
        quiz: {
          type: "multiple-choice",
          question: "Que es un ataque DDoS?",
          options: [
            { label: "Saturar un servidor con trafico para dejarlo fuera de servicio", isCorrect: true },
            { label: "Un tipo de cifrado", isCorrect: false },
            { label: "Una forma de autenticacion", isCorrect: false },
            { label: "Un protocolo de red", isCorrect: false },
          ],
        },
      },
      {
        id: "a3-e8",
        title: "Pregunta 8",
        quiz: {
          type: "ordering",
          question: "Ordena estas practicas de seguridad de menor a mayor complejidad:",
          correctOrder: [
            "No clickear enlaces sospechosos",
            "Usar contrasenas fuertes",
            "Configurar firewall",
            "Usar VPN en redes publicas",
          ],
        },
      },
    ],
  },
];
