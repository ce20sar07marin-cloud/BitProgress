import { LessonConfig, LessonPage } from "@/types/lesson";

const a1: LessonConfig = {
  id: "a1",
  title: "Protocolos TCP/IP",
  pages: [
    {
      id: "a1-p1",
      title: "Que es TCP/IP",
      content:
        "TCP/IP es el conjunto de protocolos que hace funcionar a Internet. TCP se encarga de dividir y reensamblar los datos. IP se encarga de dirigir los paquetes al destino correcto.",
      illustration: require("@/assets/images/a1/QueesTCP_IP.png"),
    },
    {
      id: "a1-p2",
      title: "Capas del modelo TCP/IP",
      content:
        "El modelo tiene 4 capas: Acceso a red, Internet (direccionamiento IP), Transporte (TCP/UDP) y Aplicación (HTTP, DNS, FTP). Cada capa tiene un rol especíco.",
      illustration: require("@/assets/images/a1/ModeloTCP.png"),
    },
    {
      id: "a1-p3",
      title: "TCP vs UDP",
      content:
        "TCP es confiable: verifica que todos los paquetes lleguen en orden. UDP es rápido pero no garantiza la entrega. TCP se usa en web y correo. UDP se usa en videojuegos y streaming.",
      illustration: require("@/assets/images/a1/TCPvsUDP.png"),
    },
    {
      id: "a1-p4",
      title: "DNS y HTTP",
      content:
        "DNS traduce nombres de dominio a direcciones IP. HTTP es el protocolo para transferir páginas web. HTTPS añade cifrado para mayor seguridad.",
      illustration: require("@/assets/images/a1/DNSyHTTP.png"),
    },
    {
      id: "a1-p5",
      title: "Resumen",
      content:
        "✔ TCP/IP es la base de Internet.\n\n✔ Tiene 4 capas y usa TCP para datos confiables y UDP para datos rápidos.\n\n✔ DNS resuelve nombres y HTTP transfiere páginas web.",
    },
    {
      id: "a1-p6",
      title: "Prueba practica",
      content: "",
      quiz: {
        type: "true-false",
        question: "TCP es más rápido que UDP pero no garantiza la entrega.",
        options: [
          { label: "Verdadero", isCorrect: false },
          { label: "Falso", isCorrect: true },
        ],
        explanation:
          "UDP es más rápido que TCP, pero no garantiza la entrega. TCP es confiable pero más lento.",
      },
    },
  ],
};

export default a1;