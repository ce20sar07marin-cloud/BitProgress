import { LessonConfig, LessonPage } from "@/types/lesson";

const i1: LessonConfig = {
  id: "i1",
  title: "Direccionamiento IP",
  pages: [
    {
      id: "i1-p1",
      title: "Que es una IP",
      content:
        "Una direccion IP es un identificador numerico asignado a cada dispositivo dentro de una red. Su funcion es permitir que los dispositivos se encuentren y se comuniquen entre si.",
      illustration: require("@/assets/images/i1/QueesunaIP.png"),
    },
    {
      id: "i1-p2",
      title: "IPv4",
      content:
        "IPv4 utiliza direcciones de 32 bits, lo que permite aproximadamente 4.3 mil millones de direcciones unicas. Se escribe en cuatro grupos de numeros del 0 al 255 separados por puntos, como 192.168.1.1.",
      illustration: require("@/assets/images/i1/IPv4.png"),
    },
    {
      id: "i1-p3",
      title: "IPv6",
      content:
        "IPv6 utiliza direcciones de 128 bits para resolver el agotamiento de IPv4. Se escribe en ocho grupos de numeros hexadecimales separados por dos puntos.",
      illustration: require("@/assets/images/i1/IPv6.png"),
    },
    {
      id: "i1-p4",
      title: "Direccion IP publica vs privada",
      content:
        "Una IP publica es visible en Internet y la asigna tu proveedor. Una IP privada solo funciona dentro de tu red local, como 192.168.x.x, y no es visible desde fuera.",
      illustration: require("@/assets/images/i1/DireccionIPpublicavsIPprivada.png"),
    },
    {
      id: "i1-p5",
      title: "MAC Address",
      content:
        "La direccion MAC es un identificador fisico unico grabado en la tarjeta de red de cada dispositivo. A diferencia de la IP, la MAC no cambia independientemente de la red a la que te conectes.",
      illustration: require("@/assets/images/i1/MACAddress.png"),
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
      content: "",
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
};

export default i1;
