import { LessonConfig, LessonPage } from "@/types/lesson";

const a3: LessonConfig = {
  id: "a3",
  title: "Seguridad en red",
  pages: [
    {
      id: "a3-p1",
      title: "Principales amenazas",
      content:
        "Las redes enfrentan amenazas como malware, phishing, ataques DDoS y accesos no autorizados. Conocer estas amenazas es el primer paso para protegerse.",
      illustration: require("@/assets/images/a3/PrincipalesAmenazas.png"),
    },
    {
      id: "a3-p2",
      title: "Cifrado de datos",
      content:
        "El cifrado convierte los datos en codigo ilegible para quien no tenga la clave. TLS/SSL protege el trafico web. WPA2/WPA3 cifra las conexiones WiFi.",
      illustration: require("@/assets/images/a3/CifradodeDatos.png"),
    },
    {
      id: "a3-p3",
      title: "Autenticacion y contrasenas",
      content:
        "La autenticacion verifica tu identidad. Usa contrasenas fuertes (12+ caracteres, mezcla de tipos). La autenticacion de dos factores (2FA) anade una capa extra de seguridad.",
      illustration: require("@/assets/images/a3/AutenticacionyContraceñas.png"),
    },
    {
      id: "a3-p4",
      title: "Buenas practicas",
      content:
        "Mantén tus dispositivos actualizados. No hagas clic en enlaces sospechosos. Usa antivirus. Configura tu firewall. Haz copias de seguridad periódicas. Usa VPN en redes públicas.",
      illustration: require("@/assets/images/a3/BuenasPracticas.png"),
    },
    {
      id: "a3-p5",
      title: "Resumen",
      content:
        "✔ La seguridad de red requiere cifrado, autenticación fuerte y buenas prácticas.\n\n✔ Conocer las amenazas y aplicar medidas básicas protege tu información.",
    },
    {
      id: "a3-p6",
      title: "Prueba practica",
      content: "",
      quiz: {
        type: "ordering",
        question:
          "Ordena estas buenas practicas de seguridad de menor a mayor complejidad:",
        correctOrder: [
          "No hagas clic en enlaces sospechosos",
          "Usa contraseñas fuertes",
          "Configura tu firewall",
          "Usa VPN en redes publicas",
        ],
        explanation:
          "Desde hábitos simples como no clickear enlaces sospechosos, hasta configuraciones más avanzadas como firewalls y VPNs.",
      },
    },
  ],
};

export default a3;
