export interface Achievement {
  id: string;
  name: string;
  imageKey: string;
  lessonId: string;
}

export const achievements: Achievement[] = [
  {
    id: "explorador",
    name: "Explorador en Redes",
    imageKey: "ExploradoreEnRedes",
    lessonId: "b1",
  },
  {
    id: "aprendiz",
    name: "Aprendiz en Dispositivos",
    imageKey: "AprendizEnDispositivos",
    lessonId: "b2",
  },
  {
    id: "tecnico",
    name: "Técnico en Progreso",
    imageKey: "TonoTécnico",
    lessonId: "b3",
  },
  {
    id: "disenador",
    name: "Diseñador de Subredes",
    imageKey: "DiseñadorDeSubredes",
    lessonId: "i1",
  },
  {
    id: "configurador",
    name: "Configurador",
    imageKey: "Configurador",
    lessonId: "i2",
  },
  {
    id: "estandarizado",
    name: "Estándarizado",
    imageKey: "Estandariizado",
    lessonId: "i3",
  },
  {
    id: "destacado",
    name: "Estudiante Destacado",
    imageKey: "EstudianteDestacado",
    lessonId: "a1",
  },
  {
    id: "experto",
    name: "Un Experto en Redes",
    imageKey: "UnExpertoEnRedes",
    lessonId: "a2",
  },
  {
    id: "mejor",
    name: "El Mejor en Redes",
    imageKey: "ElMejorEnRedes",
    lessonId: "a3",
  },
];
