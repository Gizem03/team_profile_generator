const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const next_step_question = [
  {
    type: "list",
    name: "next_step",
    message: "Would you like to add more team members?",
    choices: ["Add an engineer", "Add an intern", "Finish building the team"],
  },
];

const questions_manager = [
  {
    type: "input",
    name: "manager_name",
    message: "What is the team manager's name?",
  },
  {
    type: "input",
    name: "manager_id",
    message: "What is the team manager's id?",
  },
  {
    type: "input",
    name: "manager_email",
    message: "What is the team manager's email?",
  },
  {
    type: "input",
    name: "manager_office_number",
    message: "What is the team manager's office number?",
  },
];

const questions_engineer = [
  {
    type: "input",
    name: "engineer_name",
    message: "What is the engineer's name?",
  },
  {
    type: "input",
    name: "engineer_id",
    message: "What is the engineer's id?",
  },
  {
    type: "input",
    name: "engineer_email",
    message: "What is the engineer's email?",
  },
  {
    type: "input",
    name: "engineer_github_username",
    message: "What is the engineer's GitHub username?",
  },
];

const questions_intern = [
  {
    type: "input",
    name: "intern_name",
    message: "What is the intern's name?",
  },
  {
    type: "input",
    name: "intern_id",
    message: "What is the intern's id?",
  },
  {
    type: "input",
    name: "intern_email",
    message: "What is the intern's email?",
  },
  {
    type: "input",
    name: "intern_school",
    message: "What is the intern's school?",
  },
];

const team = [];
function writeTeam() {
  const result = render(team);
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  fs.writeFileSync(outputPath, result);
}

function init() {
  inquirer
    .prompt(questions_manager)
    .then((answers) => {
      const manager = new Manager(
        answers.manager_name,
        answers.manager_id,
        answers.manager_email,
        answers.manager_office_number
      );
      team.push(manager);

      nextStep();
    })
    .catch((error) => {
      console.error(error);
    });
}

function askEngineer() {
  inquirer
    .prompt(questions_engineer)
    .then((answers) => {
      const engineer = new Engineer(
        answers.engineer_name,
        answers.engineer_id,
        answers.engineer_email,
        answers.engineer_github_username
      );
      team.push(engineer);

      nextStep();
    })
    .catch((error) => {
      console.error(error);
    });
}

function askIntern() {
  inquirer
    .prompt(questions_intern)
    .then((answers) => {
      const intern = new Intern(
        answers.intern_name,
        answers.intern_id,
        answers.intern_email,
        answers.intern_school
      );
      team.push(intern);

      nextStep();
    })
    .catch((error) => {
      console.error(error);
    });
}

function nextStep() {
  inquirer
    .prompt(next_step_question)
    .then((answers) => {
      switch (answers.next_step) {
        case "Add an engineer":
          return askEngineer();
        case "Add an intern":
          return askIntern();
        case "Finish building the team":
          return writeTeam();
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

init();
