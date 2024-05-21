#!/usr/bin/env node

import inquirer from "inquirer";
import readline from "readline";

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
${colors.yellow} ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝    ${colors.reset}
`;
const decs = `Concur - Consent Manager is open source consent manager that 
helps companies comply with Digital Personal Data Protection Act, 
2023. Some more content will come here for ready to read and get
education about concur To Know more Visit: https://concur.live
Enter to continue to integrate Consent Collection in our application `;

console.log(asciiArt);
console.log(decs);

const questions = [
  {
    type: "input",
    name: "ProjectName",
    message: "What is your project name?",
  },
  {
    type: "input",
    name: "Email",
    message: "What is your  email?",
  },
  {
    type: "input",
    name: "Mobile ",
    message: "What is your mobile number?",
  },

  {
    type: "list",
    name: "Customers",
    message: "Number of tentative customers for consent collection:",
    choices: ["1-1k", "1k-100k", "100k-500k", "500k+"],
  },
];

const askQuestions = async () => {
  const answers = {};
  for (const question of questions) {
    const answer = await askQuestion(question);
    answers[question.name] = answer[question.name];
  }
  return answers;
};

const askQuestion = async (question) => {
  try {
    const answer = await inquirer.prompt([question]);
    console.log(
      `Received answer for ${question.name}: ${answer[question.name]}`
    );
    return answer;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const waitForEnter = async () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log(`${colors.green}Press enter to start...${colors.reset}`);
    rl.question("", () => {
      rl.close();
      resolve();
    });
  });
};

(async () => {
  await waitForEnter();
  const answers = await askQuestions();
  console.log("\nAll answers received:");
  console.log(answers);
})();
