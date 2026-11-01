import { LessonConfig, LessonPage } from "@/types/lesson";

const a2: LessonConfig = {
  id: "a2",
  title: "Puertos y servicios",
  pages: [
    {
      id: "a2-p1",
      title: "Que es un puerto",
      content:
        "Un puerto es un número del 0 al 65535 que identifica un servicio o aplicación específica dentro de un dispositivo. Permite que múltiples servicios funcionen en el mismo equipo simultáneamente.",
      illustration: require("@/assets/images/a2/QueesunPuerto.png"),
    },
    {
      id: "a2-p2",
      title: "Puertos comunes",
      content:
        "Puerto 80: HTTP (web sin cifrar).\nPuerto 443: HTTPS (web cifrada).\nPuerto 22: SSH (acceso remoto).\nPuerto 53: DNS (resolución de nombres).\nPuerto 25: SMTP (correo saliente).",
      illustration: require("@/assets/images/a2/PuertosComunes.png"),
    },
    {
      id: "a2-p3",
      title: "Servicios de red",
      content:
        "Un servicio es una función que ofrece un servidor a los clientes. Los más comunes son web (HTTP), correo (SMTP/IMAP), DNS, FTP y DHCP (asignación automática de IPs).",
      illustration: require("@/assets/images/a2/ServiciosdeRed.png"),
    },
    {
      id: "a2-p4",
      title: "Firewall y puertos",
      content:
        "Un firewall controla qué puertos están abiertos o cerrados. Cerrar puertos innecesarios reduce la superficie de ataque. Solo se deben abrir los puertos que realmente se necesitan.",
      illustration: require("@/assets/images/a2/FirewallyPuertos.png"),
    },
    {
      id: "a2-p5",
      title: "Prueba practica",
      content: "",
      quiz: {
        type: "fill-blank",
        question:
          "El puerto ___ se utiliza para conexiones HTTPS (web cifrada).",
        blankAnswer: "443",
        explanation:
          "El puerto 443 se utiliza para HTTPS, que es la versión cifrada del protocolo HTTP.",
      },
    },
  ],
};

export default a2;