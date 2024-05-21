#!/usr/bin/env node

import inquirer from "inquirer";
import readline from "readline";
import axios from "axios";
import fs from "fs"; // Step 1: Import the fs module

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
    name: "projectName",
    message: "What is your project name?",
    validate: (input) => {
      return input !== "" ? true : "Project name is required";
    },
  },
  {
    type: "input",
    name: "email",
    message: "What is your email?",
    validate: (input) => {
      return input !== "" ? true : "Email is required";
    },
  },
  {
    type: "input",
    name: "mobile",
    message: "What is your mobile number?",
    validate: (input) => {
      return input !== "" ? true : "Mobile number is required";
    },
  },
  {
    type: "list",
    name: "Customers",
    message: "Number of tentative customers for consent collection:",
    choices: ["1-1k", "1k-100k", "100k-500k", "500k+"],
    validate: (input) => {
      return input !== "" ? true : "Please select number of customers";
    },
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

const sendData = async (data) => {
  const options = {
    method: "POST",
    url: "https://npm-info-user-backend.onrender.com/user-form",
    headers: { "Content-Type": "application/json" },
    data: data,
  };

  try {
    const response = await axios.request(options);
    console.log("Response from API:", response.data);

    // Step 3: Save response to .env file
    saveToEnv(response.data);
  } catch (error) {
    console.error("Error from API:", error);
  }
};

// Step 2: Create function to write to .env file
const saveToEnv = (data) => {
  const envFilePath = ".env";
  let envContent = "";

  // Prepare content to write
  for (const key in data) {
    envContent += `${key.toUpperCase()}=${data[key]}\n`;
  }

  // Write or append to .env file
  fs.appendFile(envFilePath, envContent, (err) => {
    if (err) {
      console.error("Error writing to .env file:", err);
    } else {
      console.log(".env file updated successfully.");
    }
  });
};

(async () => {
  await waitForEnter();
  const answers = await askQuestions();
  console.log("\nAll answers received:");
  console.log(answers);

  // Send data to API
  await sendData({
    project_name: answers.projectName,
    email: answers.email,
    mobile: answers.mobile,
    number_of_customers: answers.Customers,
  });
})();
