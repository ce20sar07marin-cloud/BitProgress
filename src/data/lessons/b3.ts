import { LessonConfig } from "@/types/lesson";

const b3: LessonConfig = {
  id: "b3",
  title: "Dispositivos de red",
  pages: [
    {
      id: "b3-p1",
      title: "Dispositivos de conexion",
      content:
        "Para que una red exista necesitas dispositivos que permitan la comunicacion. Los mas comunes son el modem, el router y el switch, cada uno con una funcion diferente dentro de la red.",
      illustration: require("@/assets/images/b3/DispositivosdeConexion.png"),
    },
    {
      id: "b3-p2",
      title: "Router y Switch",
      content:
        "El router conecta redes diferentes y dirige el trafico de datos. El switch conecta dispositivos dentro de la misma red local, enviando datos solo al dispositivo correcto.",
      illustration: require("@/assets/images/b3/RouterySwiches.png"),
    },
    {
      id: "b3-p3",
      title: "Otros dispositivos",
      content:
        "Un punto de acceso WiFi permite la conexion inalambrica. Un firewall protege la red de accesos no autorizados. Los servidores almacenan y distribuyen datos a los demas dispositivos.",
      illustration: require("@/assets/images/b3/OtrosDispositivos.png"),
    },
    {
      id: "b3-p4",
      title: "Resumen",
      content:
        "\u2714 Los dispositivos de red incluyen modems, routers, switches, puntos de acceso WiFi, firewalls y servidores.\n\n\u2714 Cada uno cumple una funcion especifica para mantener la red funcionando.",
    },
    {
      id: "b3-p5",
      title: "Prueba practica",
      content: "",
      quiz: {
        type: "true-false",
        question: "El switch conecta dispositivos dentro de la misma red local.",
        options: [
          { label: "Verdadero", isCorrect: true },
          { label: "Falso", isCorrect: false },
        ],
        explanation:
          "El switch envia datos solo al dispositivo correcto dentro de la misma red local.",
      },
    },
  ],
};

export { b3 };
export default b3;