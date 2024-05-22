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
const asciiArt = ` \x1b[33m

██████╗ ██████╗ ███╗   ██╗ ██████╗██╗   ██╗██████╗     
██╔════╝██╔═══██╗████╗  ██║██╔════╝██║   ██║██╔══██╗    
██║     ██║   ██║██╔██╗ ██║██║     ██║   ██║██████╔╝    
██║     ██║   ██║██║╚██╗██║██║     ██║   ██║██╔══██╗    
╚██████╗╚██████╔╝██║ ╚████║╚██████╗╚██████╔╝██║  ██║    
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝  \x1b[0m
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
    // console.log(
    //   `Received answer for ${question.name}: ${answer[question.name]}`
    // );
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

    console.log("\x1b[32mPress enter to start...\x1b[0m");
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

    // Step 4: Create file with content from response if available
    if (response.data.file_name && response.data.file_content) {
      createFile(response.data.file_name, response.data.file_content);
    }
    createYmlFile();
  } catch (error) {
    // console.error("Error from API:", error);

    // Create .env file with default values
    saveToEnv({ application_key: "", user_key: "" });

    // Create concur.md file
    createFile(
      "concur.md",
      "# Concurrency Issues\nDetails of concurrency issues and resolutions."
    );
    createYmlFile();
  }
};

const saveToEnv = (data) => {
  const envFilePath = ".env";
  let envContent = "";

  // Check if .env file exists
  if (fs.existsSync(envFilePath)) {
    // Read existing .env file content
    envContent = fs.readFileSync(envFilePath, "utf8");

    // Update APPLICATION_KEY and USER_KEY if they exist, otherwise add them
    let applicationKeyFound = false;
    let userKeyFound = false;
    const lines = envContent.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("APPLICATION_KEY=")) {
        lines[i] = `APPLICATION_KEY=${data.application_key}`;
        applicationKeyFound = true;
      }
      if (lines[i].startsWith("USER_KEY=")) {
        lines[i] = `USER_KEY=${data.user_key}`;
        userKeyFound = true;
      }
    }
    // If APPLICATION_KEY or USER_KEY not found, add them
    if (!applicationKeyFound) {
      lines.push(`APPLICATION_KEY=${data.application_key}`);
    }
    if (!userKeyFound) {
      lines.push(`USER_KEY=${data.user_key}`);
    }
    // Join the lines back together
    envContent = lines.join("\n");
  } else {
    // If .env file doesn't exist, create it with APPLICATION_KEY and USER_KEY
    envContent = `APPLICATION_KEY=${data.application_key}\nUSER_KEY=${data.user_key}\n`;
  }

  // Write to .env file
  fs.writeFile(envFilePath, envContent, (err) => {
    if (err) {
      // console.error("Error writing to .env file:", err);
    } else {
      console.log(".env file updated successfully.");
    }
  });
};

const createFile = (fileName, fileContent) => {
  fs.writeFile(fileName, fileContent, (err) => {
    if (err) {
      // console.error(`Error writing to file ${fileName}:`, err);
    } else {
      console.log(`${fileName} created successfully.`);
    }
  });
};

const createYmlFile = () => {
  const ymlData = `
collection_point:
id: CP001
name: Main Collection Point
location:
  address: 123 Main Street
  city: Sampleville
  state: CA
  zip_code: 12345
  country: USA
contact:
  name: John Doe
  phone: +1-800-555-1234
  email: johndoe@example.com
operating_hours:
  monday:
    open: "08:00"
    close: "18:00"
  tuesday:
    open: "08:00"
    close: "18:00"
  wednesday:
    open: "08:00"
    close: "18:00"
  thursday:
    open: "08:00"
    close: "18:00"
  friday:
    open: "08:00"
    close: "18:00"
  saturday:
    open: "10:00"
    close: "16:00"
  sunday:
    open: "10:00"
    close: "14:00"
services_offered:
  - recycling
  - waste collection
  - hazardous material disposal
notes: >
  This collection point accepts household waste, recyclables, and hazardous materials.
  Please follow the guidelines for each type of material.
  `;
  createFile("collection_point.yml", ymlData);
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
