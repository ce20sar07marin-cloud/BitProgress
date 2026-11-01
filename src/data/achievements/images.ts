import type { ImageSourcePropType } from "react-native";

const achievementImages: Record<string, ImageSourcePropType> = {
  explorador: require("@/assets/images/Logros/ExploradoreEnRedes.png"),
  aprendiz: require("@/assets/images/Logros/AprendizEnDispositivos.png"),
  tecnico: require("@/assets/images/Logros/TonoTécnico.png"),
  disenador: require("@/assets/images/Logros/DiseñadorDeSubredes.png"),
  configurador: require("@/assets/images/Logros/Configurador.png"),
  estandarizado: require("@/assets/images/Logros/Estandariizado.png"),
  destacado: require("@/assets/images/Logros/EstudianteDestacado.png"),
  experto: require("@/assets/images/Logros/UnExpertoEnRedes.png"),
  mejor: require("@/assets/images/Logros/ElMejorEnRedes.png"),
};

export default achievementImages;
