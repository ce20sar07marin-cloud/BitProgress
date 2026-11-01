import { LessonConfig } from "@/types/lesson";

const b2: LessonConfig = {
  id: "b2",
  title: "Tipos de redes",
  pages: [
    {
      id: "b2-p1",
      title: "Clasificacion por alcance",
      content:
        "Las redes se clasifican según la distancia que cubren. Una PAN conecta dispositivos muy cercanos. Una LAN cubre un edificio. Una WAN abarca ciudades o países.",
    },
    {
      id: "b2-p2",
      title: "LAN y WAN",
      content:
        "La LAN es la red más común, se encuentra en hogares, oficinas y escuelas. La WAN conecta multiples LAN entre sí, siendo Internet el ejemplo mas grande de WAN del mundo.",
      illustration: require("@/assets/images/b2/LANyWAN.png"),
    },
    {
      id: "b2-p3",
      title: "MAN y PAN",
      content:
        "La MAN (Metropolitan Area Network) cubre una ciudad entera. La PAN es la mas personal, conectando tus dispositivos como celular, audifonos y reloj inteligente mediante Bluetooth.",
      illustration: require("@/assets/images/b2/MANyPAN.png"),
    },
    {
      id: "b2-p4",
      title: "Internet, Intranet y Extranet",
      content:
        "Internet es la red global. Una Intranet es una red privada de una organizacion. Una Extranet permite acceso limitado a usuarios externos de una Intranet.",
      illustration: require("@/assets/images/b2/InternetIntraneyExtranet.png"),
    },
    {
      id: "b2-p5",
      title: "Topologias de red",
      content:
        "Las topologias describen como estan organizados los dispositivos en una red. La topologia estrella es la mas comun: todos se conectan a un punto central (switch). La topologia bus usa un cable principal compartido. La topologia anillo forma un circulo cerrado.",
      illustration: require("@/assets/images/b2/StarTopologia.png"),
    },
    {
      id: "b2-p6",
      title: "Ejemplos cotidianos",
      content:
        "En tu hogar, tu WiFi es una PAN/LAN que conecta celular, laptop y TV. Tu escuela tiene una LAN que conecta computadoras y impresoras. Internet es la WAN que conecta todo el mundo. Bluetooth es un ejemplo perfecto de PAN.",
    },
    {
      id: "b2-p7",
      title: "Resumen",
      content:
        "\u2714 Las redes se clasifican por alcance: PAN, LAN, MAN y WAN.\n\n\u2714 Internet es la WAN mas grande.\n\n\u2714 Intranet y Extranet son variantes privadas.\n\n\u2714 Las topologias describen la forma de la red.\n\n\u2714 Bluetooth es un ejemplo de PAN.",
    },
    {
      id: "b2-p8",
      title: "Prueba practica",
      content: "",
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
          "Una LAN (Local Area Network) conecta dispositivos dentro de un edificio o área local.",
      },
    },
  ],
};

export { b2 };
export default b2;