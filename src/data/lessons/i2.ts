import { LessonConfig, LessonPage } from "@/types/lesson";

const i2: LessonConfig = {
  id: "i2",
  title: "Subredes y mascara",
  pages: [
    {
      id: "i2-p1",
      title: "Que es una subred",
      content:
        "Una subred es una division de una red mas grande. Permite organizar los dispositivos en grupos, mejorar el rendimiento y facilitar la administracion del trafico de datos.",
      illustration: require("@/assets/images/i2/QueesUnaSubred.png"),
    },
    {
      id: "i2-p2",
      title: "La mascara de subred",
      content:
        "La mascara de subred determina que parte de una direccion IP corresponde a la red y cual a los dispositivos. Se escribe como 255.255.255.0, indicando que los primeros tres octetos son la red.",
      illustration: require("@/assets/images/i2/LaMascaraDeSubred.png"),
    },
    {
      id: "i2-p3",
      title: "CIDR",
      content:
        "CIDR (Classless Inter-Domain Routing) es una forma mas flexible de representar subredes usando una barra y un numero, como /24. Indica cuantos bits corresponden a la red.",
      illustration: require("@/assets/images/i2/CIDR.png"),
    },
    {
      id: "i2-p4",
      title: "Calcular subredes",
      content:
        "Para calcular subredes necesitas saber cuantos dispositivos conectados tendras. Cada subred necesita una direccion de red, una de broadcast y al menos una IP para el router.",
      illustration: require("@/assets/images/i2/CalcularSubredes.png"),
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
      content: "",
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
};

export default i2;