import { LessonConfig } from "@/types/lesson";

const b1: LessonConfig = {
  id: "b1",
  title: "Que es una red",
  pages: [
    {
      id: "b1-p1",
      title: "Bienvenida",
      content:
        "Una red informática permite que varios dispositivos puedan comunicarse entre sí para compartir información y recursos.",
      illustration: require("@/assets/images/b1/Bienvenida.png"),
    },
    {
      id: "b1-p2",
      title: "Que es una red?",
      content:
        "Una red informática es el conjunto de dos o más dispositivos conectados para intercambiar información. No importa si están en una casa, una empresa o incluso en diferentes países; mientras puedan comunicarse, forman parte de una red.",
      illustration: require("@/assets/images/b1/Queesunared.png"),
      conceptBox: "Red = dispositivos + conexión + comunicación.",
    },
    {
      id: "b1-p3",
      title: "Que dispositivos forman una red?",
      content:
        "Una red puede estar formada por:\n\n\u2022 Computadoras\n\u2022 Teléfonos\n\u2022 Tablets\n\u2022 Servidores\n\u2022 Impresoras\n\u2022 Cámaras IP",
      illustration: require("@/assets/images/b1/Quedispositivosformanpartedeunared.png"),
    },
    {
      id: "b1-p4",
      title: "Como se comunican?",
      content:
        "La información viaja en pequeños paquetes de datos. Cada paquete contiene información sobre quién lo envía, quién lo recibe y qué información transporta.",
      illustration: require("@/assets/images/b1/Comosecomunican.png"),
    },
    {
      id: "b1-p5",
      title: "Ejemplo cotidiano",
      content:
        "Cuando enviamos un mensaje por WhatsApp:\n\n1. Escribes el mensaje.\n2. Se convierte en datos.\n3. Viaja por Internet.\n4. Llega al teléfono del destinatario.\n\nAunque parezca instantáneo, detrás ocurre todo un proceso de comunicación.",
      illustration: require("@/assets/images/b1/Ejemplocotiano.png"),
    },
    {
      id: "b1-p6",
      title: "Resumen",
      content:
        "\u2714 Una red conecta dispositivos.\n\n\u2714 Permite compartir información.\n\n\u2714 Los datos viajan mediante paquetes.\n\n\u2714 Internet es la red más grande del mundo.",
    },
    {
      id: "b1-p7",
      title: "Sabias que...?",
      content:
        "El primer mensaje enviado por Internet ocurrió en 1969. Solo llegaron las letras: LO. El sistema falló antes de escribir LOGIN.",
      illustration: require("@/assets/images/b1/Sabiasque.png"),
    },
    {
      id: "b1-p8",
      title: "Mini reto",
      content: "",
      quiz: {
        type: "multiple-choice",
        question: "Cual de los siguientes dispositivos puede formar parte de una red?",
        options: [
          { label: "Microondas", isCorrect: false },
          { label: "Router", isCorrect: true },
          { label: "Ventilador", isCorrect: false },
          { label: "Licuadora", isCorrect: false },
        ],
        explanation:
          "El router es un dispositivo de red que permite la conexión entre dispositivos.",
      },
    },
  ],
};

export { b1 };
export default b1;