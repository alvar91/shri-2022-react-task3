import { v4 as uuid } from "uuid";
import { TAGS_COLORS, BUTTON_TITLES } from "../constants";

export const data = {
  [uuid()]: {
    title: "Todo",

    tasks: [
      {
        id: uuid(),
        title: "Нарисовать иллюстрации",
        description: "Нарисовать иллюстрации для нового альбома",
        tags: [
          TAGS_COLORS.violet,
          TAGS_COLORS.green,
          TAGS_COLORS.red,
          TAGS_COLORS.orange,
          TAGS_COLORS.blue,
          TAGS_COLORS.warmGreen,
          TAGS_COLORS.darkBlue,
          TAGS_COLORS.yellow,
        ],
        comments: [],
      },
      {
        id: uuid(),
        title: "Сверстать лендинг по готовому шаблону",
        description: "",
        tags: [],
        comments: [],
      },
      {
        id: uuid(),
        title: "Сверстать лендинг по готовому шаблону",
        description: "",
        tags: [
          TAGS_COLORS.blue,
          TAGS_COLORS.warmGreen,
          TAGS_COLORS.darkBlue,
          TAGS_COLORS.yellow,
        ],
        comments: [],
      },
      {
        id: uuid(),
        title: "Нарисовать иллюстрации",
        description: "",
        tags: [TAGS_COLORS.blue, TAGS_COLORS.warmGreen, TAGS_COLORS.darkBlue],
        comments: [
          {
            id: uuid(),
            userName: "Варов Алексей",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
          {
            id: uuid(),
            userName: "Варов Алексей",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
        ],
      },
    ],
    buttonContent: BUTTON_TITLES.add,
  },
  [uuid()]: {
    title: "In Progress",
    tasks: [
      {
        id: uuid(),
        title: "Нарисовать иллюстрации",
        description: "",
        tags: [
          TAGS_COLORS.violet,
          TAGS_COLORS.green,
          TAGS_COLORS.red,
          TAGS_COLORS.orange,
          TAGS_COLORS.blue,
          TAGS_COLORS.warmGreen,
          TAGS_COLORS.darkBlue,
          TAGS_COLORS.yellow,
        ],
        comments: [],
      },
      {
        id: uuid(),
        title: "Сверстать лендинг по готовому шаблону",
        description: "Верстка - дело серьезное",
        tags: [TAGS_COLORS.violet, TAGS_COLORS.green, TAGS_COLORS.red],
        comments: [],
      },
      {
        id: uuid(),
        title: "Нарисовать иллюстрации",
        description: "Нарисовать от и до",
        tags: [TAGS_COLORS.warmGreen, TAGS_COLORS.darkBlue],
        comments: [
          {
            id: uuid(),
            userName: "Иванов Иван",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
          {
            id: uuid(),
            userName: "Варов Алексей",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
        ],
      },
    ],
    buttonContent: BUTTON_TITLES.add,
  },
  [uuid()]: {
    title: "Done",
    tasks: [
      {
        id: uuid(),
        title: "Нарисовать иллюстрации",
        description: "",
        tags: [
          TAGS_COLORS.orange,
          TAGS_COLORS.blue,
          TAGS_COLORS.warmGreen,
          TAGS_COLORS.darkBlue,
          TAGS_COLORS.yellow,
        ],
        comments: [],
      },
      {
        id: uuid(),
        title: "Сверстать лендинг по готовому шаблону",
        description: "",
        tags: [
          TAGS_COLORS.violet,
          TAGS_COLORS.green,
          TAGS_COLORS.red,
          TAGS_COLORS.orange,
        ],
        comments: [],
      },
      {
        id: uuid(),
        title: "Сверстать лендинг по готовому шаблону",
        description: "",
        tags: [
          TAGS_COLORS.blue,
          TAGS_COLORS.warmGreen,
          TAGS_COLORS.darkBlue,
          TAGS_COLORS.yellow,
        ],
        comments: [],
      },
      {
        id: uuid(),
        title: "Нарисовать иллюстрации",
        description: "",
        tags: [
          TAGS_COLORS.violet,
          TAGS_COLORS.green,
          TAGS_COLORS.red,
          TAGS_COLORS.orange,
          TAGS_COLORS.blue,
          TAGS_COLORS.warmGreen,
          TAGS_COLORS.darkBlue,
          TAGS_COLORS.yellow,
        ],
        comments: [],
      },
      {
        id: uuid(),
        title: "Нарисовать иллюстрации",
        description: "",
        tags: [TAGS_COLORS.green, TAGS_COLORS.red],
        comments: [],
      },
    ],
    buttonContent: "",
  },
};
