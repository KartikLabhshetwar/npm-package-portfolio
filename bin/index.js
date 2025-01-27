#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import open from "open";

const CARD_WIDTH = 65;
const LEFT_PADDING = 6;

const PROJECTS = [
  {
    name: "LearnX",
    description:
      "LearnX is a course selling platform with integrated payment functionality.",
    link: "https://learnx-frontend.onrender.com/",
  },
  {
    name: "Mind Mentor AI",
    description:
      "Mind Mentor is an innovative AI-powered study assistant designed to revolutionize the way students learn and prepare for exams.",
    link: "https://mind-mentor-pearl.vercel.app/",
  },
  {
    name: "TaskMaster",
    description:
      "TaskMaster is a powerful, full-stack task management application.",
    link: "https://task-management-dashboard-zeta.vercel.app/",
  },
];

function centerText(text, width) {
  const visibleLength = text.replace(/\u001b\[\d+m/g, "").length;
  const padding = Math.max(0, Math.floor((width - visibleLength) / 2));
  return (
    " ".repeat(padding) + text + " ".repeat(width - visibleLength - padding)
  );
}

function leftAlignText(text, width, leftPadding = LEFT_PADDING) {
  const visibleLength = text.replace(/\u001b\[\d+m/g, "").length;
  return (
    " ".repeat(leftPadding) +
    text +
    " ".repeat(Math.max(0, width - visibleLength - leftPadding))
  );
}

function drawCard(width) {
  const horizontalBorder = "─".repeat(width - 2);
  const emptyLine = `│${" ".repeat(width - 2)}│`;
  const verticalChar = "│";

  // Top border with fancy corners
  console.log(chalk.magenta(`┌${horizontalBorder}┐`));

  // Name section
  console.log(
    chalk.magenta(verticalChar) +
      centerText(chalk.magenta.bold("Kartik Labhshetwar"), width - 2) +
      chalk.magenta(verticalChar)
  );

  // Divider
  console.log(
    chalk.magenta(verticalChar) + " ".repeat(width - 2) + chalk.magenta(verticalChar)
  );

  // Title with description
  const title = chalk.cyan("Build ship grow.");
  console.log(
    chalk.magenta(verticalChar) +
      leftAlignText(title, width - 2) +
      chalk.magenta(verticalChar)
  );

  // Empty line before social links
  console.log(
    chalk.magenta(verticalChar) + " ".repeat(width - 2) + chalk.magenta(verticalChar)
  );

  // Social Links with fixed-width labels
  const labelStyle = chalk.gray;

  const links = [
    {
      label: "Twitter:",
      value: chalk.magenta("https://x.com/code_kartik"),
    },
    {
      label: "GitHub:",
      value: chalk.green("https://github.com/KartikLabhshetwar"),
    },
    { label: "Web:", value: chalk.cyan("https://www.kartiklabhshetwar.me/") },
  ];

  links.forEach(({ label, value }) => {
    const text = `${labelStyle(label.padEnd(10))} ${value}`;
    console.log(
      chalk.magenta(verticalChar) +
        leftAlignText(text, width - 2) +
        chalk.magenta(verticalChar)
    );
  });

  // Empty line before card command
  console.log(
    chalk.magenta(verticalChar) + " ".repeat(width - 2) + chalk.magenta(verticalChar)
  );

  // Card command
  // const cardCmd = `${labelStyle('Card:')} ${chalk.red('npx')} ${chalk.white('codiearyan')}`;
  // console.log(chalk.blue(verticalChar) + leftAlignText(cardCmd, width - 2) + chalk.blue(verticalChar));

  // Bottom border
  console.log(chalk.magenta(`└${horizontalBorder}┘`));
}

async function showProjects() {
  console.clear();
  console.log("\n");

  // Header
  console.log(chalk.blueBright.bold("🚀 My Top Projects\n"));

  // Display each project
  PROJECTS.forEach((project, index) => {
    console.log(chalk.blue.bold(`${index + 1}. ${project.name}`));
    // Word wrap the description
    const words = project.description.split(" ");
    let line = "";
    words.forEach((word) => {
      if ((line + word).length > 50) {
        console.log(chalk.white(`   ${line}`));
        line = word + " ";
      } else {
        line += word + " ";
      }
    });
    if (line) console.log(chalk.white(`   ${line}`));
    console.log(chalk.cyan(`   🔗 ${project.link}`));
    console.log();
  });

  console.log(
    chalk.gray("\nTip: Use cmd/ctrl + click to open the links directly")
  );

  // Project actions
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: chalk.white("What would you like to do?"),
      choices: [
        ...PROJECTS.map((project, index) => ({
          name: `${index + 1}. Visit ${project.name}`,
          value: `visit_${index}`,
        })),
        { name: "🔍 View more projects", value: "more" },
        { name: "↩️  Back to main menu", value: "back" },
      ],
      prefix: "💡",
    },
  ]);

  if (action === "back") {
    console.clear();
    return;
  }

  if (action === "more") {
    await open("https://github.com/KartikLabhshetwar?tab=repositories");
    console.log(chalk.green("\n✨ Opening GitHub repositories...\n"));
    return;
  }

  const projectIndex = parseInt(action.split("_")[1]);
  const project = PROJECTS[projectIndex];
  await open(project.link);
  console.log(chalk.green(`\n✨ Opening ${project.name}...\n`));
}

async function main() {
  console.clear();

  while (true) {
    // Draw the profile card
    console.log("\n");
    drawCard(CARD_WIDTH);
    console.log("\n");

    // Tip with better styling
    console.log(
      chalk.gray("Tip:") +
        chalk.white(" Use ") +
        chalk.magenta("cmd/ctrl + click") +
        chalk.white(" to open links directly\n")
    );

    const choices = [
      {
        name: "📂  " + chalk.blue("View my Projects"),
        value: "projects",
      },
      {
        name: "🌐  " + chalk.cyan("Visit my Portfolio"),
        value: "portfolio",
      },
      {
        name: "✉️  " + chalk.green("Send me an Email"),
        value: "email",
      },
      {
        name: "🐙  " + chalk.magenta("Check out my GitHub"),
        value: "github",
      },
      {
        name: "📄  " + chalk.yellow("View my Resume"),
        value: "resume",
      },
      {
        name: "🚪  " + chalk.red("Exit"),
        value: "exit",
      },
    ];

    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: chalk.white("What would you like to do?"),
        choices,
        prefix: "🚀",
      },
    ]);

    try {
      switch (action) {
        case "projects":
          await showProjects();
          break;
        case "portfolio":
          await open("https://www.kartiklabhshetwar.me/");
          break;
        case "email":
          await open("mailto:kartik.labhshetwar@gmail.com");
          break;
        case "resume":
          await open(
            "https://drive.google.com/file/d/1h040xt9mLKCMFEDwhCn3xuH7R5PyuToZ/"
          );
          break;
        case "github":
          await open("https://github.com/KartikLabhshetwar");
          break;
        case "exit":
          console.log(
            chalk.blue("\n👋 Thank you for visiting! Have a great day!\n")
          );
          process.exit(0);
      }

      if (action !== "projects" && action !== "exit") {
        console.log(chalk.green("\n✨ Opening requested link...\n"));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.clear();
      }
    } catch (error) {
      console.error(
        chalk.red("\n❌ Error: Could not open the requested link\n")
      );
      console.error(error);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

main().catch(console.error);
