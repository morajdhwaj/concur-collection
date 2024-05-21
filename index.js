#!/usr/bin/env node

import inquirer from "inquirer";

// displayAsciiArt.js

// Step 1: Define ANSI escape codes for colors
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

// Step 2: Define the ASCII art with color
const asciiArt = `
${colors.yellow} ██████╗ ██████╗ ███╗   ██╗ ██████╗██╗   ██╗██████╗     ${colors.reset}
${colors.yellow}██╔════╝██╔═══██╗████╗  ██║██╔════╝██║   ██║██╔══██╗    ${colors.reset}
${colors.yellow}██║     ██║   ██║██╔██╗ ██║██║     ██║   ██║██████╔╝    ${colors.reset}
${colors.yellow}██║     ██║   ██║██║╚██╗██║██║     ██║   ██║██╔══██╗    ${colors.reset}
${colors.yellow}╚██████╗╚██████╔╝██║ ╚████║╚██████╗╚██████╔╝██║  ██║    ${colors.reset}
${colors.yellow} ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝    ${colors.reset}
`;
const decs = `Concur - Consent Manager is open source consent manager that 
helps companies comply with Digital Personal Data Protection Act, 
2023. Some more content will come here for ready to read and get
education about concur To Know more Visit: https://concur.live
Enter to continue to integrate Consent Collection in our applicationy `;

console.log(asciiArt);
console.log(decs);

const questions = [
  {
    type: "input",
    name: "firstName",
    message: "What is your first name?",
  },
  {
    type: "input",
    name: "lastName",
    message: "What is your last name?",
  },
  {
    type: "input",
    name: "country",
    message: "What is your country name?",
  },
  {
    type: "input",
    name: "age",
    message: "What is your age?",
  },
];

inquirer
  .prompt(questions)
  .then((answers) => {
    console.log(
      `Hello ${answers.firstName} ${answers.lastName} from ${answers.country}, aged ${answers.age}!`
    );
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
