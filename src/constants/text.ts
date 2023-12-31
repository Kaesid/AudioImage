const appName = "AudioImage";

enum Messages {
  WRONG_PAGE = "It seems like you're lost, mate...",
  ABOUT__FIRST_BLOCK = `Just a small application to enhance my understanding of certain technologies and libraries. `,
  ABOUT__SECOND_BLOCK = `React + Typescript + Redux-toolkit as a foundation, Styled-components for some styling, a few unit tests with the help of the React Testing Library and Jest-dom, and, obviously, a lot of canvas fun with the help of THREE.js.`,
  ABOUT__THIRD_BLOCK = `A fully responsive application with mobile first philosophy.`,
  ABOUT__PARTING_WORDS = `I hope you're having as much fun using it as I had creating it.`,
  HOME__BUTTON_TEXT = `Begin`,
  HOME__BUTTON_TEXT_ACTIVE = `Resume`,
  HOME__INSTRUCTION = `An audio player that has a function to visualize audio. Just add your favorite tracks to the playlist and enjoy.`,
  ERROR = "Sorry... there was an error",
}

export { appName, Messages };
