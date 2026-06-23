import { QuizCategory } from '../navigation/types';

export const quizCategories: QuizCategory[] = [
  {
    id: 'houses',
    title: 'Casas y Lemas',
    icon: 'shield',
    questions: [
      {
        q: '¿Cuál es el lema de la Casa Stark?',
        options: ['El Invierno se Acerca', 'Fuego y Sangre', 'Oíd Nuestro Rugido', 'Somos Imbatibles'],
        answer: 0,
      },
      {
        q: '¿Qué animal representa a la Casa Lannister?',
        options: ['Lobo Huargo', 'Dragón', 'León dorado', 'Ciervo'],
        answer: 2,
      },
      {
        q: '¿Cuántas cabezas tiene el dragón del escudo Targaryen?',
        options: ['Una', 'Dos', 'Tres', 'Cuatro'],
        answer: 2,
      },
      {
        q: '¿Qué casa gobierna en Dorne?',
        options: ['Casa Tyrell', 'Casa Martell', 'Casa Arryn', 'Casa Greyjoy'],
        answer: 1,
      },
      {
        q: '¿Cuál es el lema de la Casa Baratheon?',
        options: ['Crecemos Fuertes', 'El Invierno se Acerca', 'Nuestra es la Furia', 'Fuego y Sangre'],
        answer: 2,
      },
    ],
  },
  {
    id: 'deaths',
    title: 'Muertes Épicas',
    icon: 'skull',
    questions: [
      {
        q: '¿Quién mató al Rey de la Noche?',
        options: ['Jon Snow', 'Daenerys', 'Arya Stark', 'Bran Stark'],
        answer: 2,
      },
      {
        q: '¿Cómo muere el Rey Joffrey?',
        options: ['Apuñalado por Tyrion', 'Envenenado en su boda', 'Ahogado por Cersei', 'Quemado por un dragón'],
        answer: 1,
      },
      {
        q: '¿Quién mató a Ramsay Bolton?',
        options: ['Sansa — sus propios perros', 'Jon Snow', 'Arya Stark', 'Tormund'],
        answer: 0,
      },
      {
        q: '¿En qué temporada muere Ned Stark?',
        options: ['Temporada 1', 'Temporada 2', 'Temporada 3', 'Temporada 4'],
        answer: 0,
      },
      {
        q: '¿Quién mató a Cersei?',
        options: ['Daenerys', 'Arya Stark', 'Jon Snow', 'El derrumbe del castillo'],
        answer: 3,
      },
    ],
  },
  {
    id: 'geography',
    title: 'Geografía de Westeros',
    icon: 'map',
    questions: [
      {
        q: '¿Cómo se llama el castillo de la Casa Stark?',
        options: ['Invernalia', 'Roca Casterly', 'Rocadragón', 'Puerto Gaviota'],
        answer: 0,
      },
      {
        q: '¿En qué ciudad están los Hombres sin Cara?',
        options: ['Qarth', 'Braavos', 'Pentos', 'Meereen'],
        answer: 1,
      },
      {
        q: '¿Cómo se llama la gran muralla del Norte?',
        options: ['La Gran Muralla', 'El Muro', 'La Barrera', 'El Bastión de Hielo'],
        answer: 1,
      },
      {
        q: '¿Dónde está el Trono de Hierro?',
        options: ['Invernalia', 'Antigua', 'Desembarco del Rey', 'Lannisport'],
        answer: 2,
      },
      {
        q: '¿Dónde nació Daenerys Targaryen?',
        options: ['Essos', 'Rocadragón', 'Valyria', 'Pentos'],
        answer: 1,
      },
    ],
  },
  {
    id: 'dragons',
    title: 'Dragones y Magia',
    icon: 'flame',
    questions: [
      {
        q: '¿Cómo se llama el dragón negro de Daenerys?',
        options: ['Viserion', 'Rhaegal', 'Drogon', 'Balerion'],
        answer: 2,
      },
      {
        q: '¿Quién crea a los Caminantes Blancos?',
        options: ['Los Primeros Hombres', 'Los Niños del Bosque', 'Los Valyrios', 'Los Maetres'],
        answer: 1,
      },
      {
        q: '¿Cómo se llama la espada de Jon Snow?',
        options: ['Aguja', 'Hielo', 'Garra', 'Colmillo de León'],
        answer: 2,
      },
      {
        q: '¿Qué destruye a los Caminantes Blancos?',
        options: ['Solo acero valyrio', 'Vidriagón y acero valyrio', 'Agua bendita', 'Luz del sol'],
        answer: 1,
      },
      {
        q: '¿Cuántos dragones perdió Daenerys?',
        options: ['Ninguno', 'Dos (Viserion y Rhaegal)', 'Los tres', 'Solo Viserion'],
        answer: 1,
      },
    ],
  },
  {
    id: 'moments',
    title: 'Momentos Icónicos',
    icon: 'movie',
    questions: [
      {
        q: '¿En qué episodio ocurre La Boda Roja?',
        options: ['T3E7', 'T3E9', 'T4E2', 'T2E9'],
        answer: 1,
      },
      {
        q: '¿Cuántos días duró el rodaje de la Batalla de los Bastardos?',
        options: ['10 días', '15 días', '25 días', '40 días'],
        answer: 2,
      },
      {
        q: '¿Qué dice Hodor antes de morir?',
        options: ['"Run Bran run"', '"The door… hold it"', '"Hold the door" (repetido)', '"I am no one"'],
        answer: 2,
      },
      {
        q: '¿Con qué palabra ordena Daenerys quemar al ejército?',
        options: ['"Burn them all"', '"Dracarys"', '"Fire and blood"', '"Valar morghulis"'],
        answer: 1,
      },
      {
        q: '¿Quién dijo "When you play the game of thrones, you win or you die"?',
        options: ['Tyrion', 'Cersei', 'Ned Stark', 'Littlefinger'],
        answer: 1,
      },
    ],
  },
];
