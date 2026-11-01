import { LessonConfig, LessonPage } from "@/types/lesson";

const i3: LessonConfig = {
  id: "i3",
  title: "Topologias de red",
  pages: [
    {
      id: "i3-p1",
      title: "Que es una topologia",
      content:
        "La topologia de red es la forma en que los dispositivos estan organizados y conectados. Puede ser fisica (cableado real) o logica (como fluyen los datos).",
      illustration: require("@/assets/images/i3/QueesUnaTopologia.png"),
    },
    {
      id: "i3-p2",
      title: "Topologia estrella",
      content:
        "En la topologia estrella todos los dispositivos se conectan a un punto central, normalmente un switch. Es la mas comun en hogares y oficinas por su facilidad de administracion.",
      illustration: require("@/assets/images/i3/TopologiadeEstrella.png"),
    },
    {
      id: "i3-p3",
      title: "Topologia bus y anillo",
      content:
        "En la topologia bus todos comparten un cable principal. En la topologia anillo los dispositivos forman un circulo cerrado. Ambas son menos utilizadas hoy en dia.",
      illustration: require("@/assets/images/i3/TopologiadeBusyAnillo.png"),
    },
    {
      id: "i3-p4",
      title: "Topologia malla",
      content:
        "En la topologia malla cada dispositivo se conecta con varios otros. Ofrece alta disponibilidad pero es costosa. Se usa en redes criticas como las de telecomunicaciones.",
      illustration: require("@/assets/images/i3/Topologiademalla.png"),
    },
    {
      id: "i3-p5",
      title: "Prueba practica",
      content: "",
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
};

export default i3;