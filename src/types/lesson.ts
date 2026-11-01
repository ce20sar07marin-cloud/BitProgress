import { ImageSourcePropType } from "react-native";

export type QuizType =
  | "multiple-choice"
  | "true-false"
  | "ordering"
  | "fill-blank";

export interface QuizOption {
  label: string;
  isCorrect: boolean;
}

export interface QuizData {
  type: QuizType;
  question: string;
  options?: QuizOption[];
  correctOrder?: string[];
  blankAnswer?: string | string[];
  explanation?: string;
}

export interface LessonPage {
  id: string;
  title: string;
  content: string;
  illustration?: ImageSourcePropType;
  conceptBox?: string;
  quiz?: QuizData;
}

export interface LessonConfig {
  id: string;
  title: string;
  pages: LessonPage[];
}
