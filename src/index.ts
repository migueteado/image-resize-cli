#! /usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import figlet from "figlet";
import { Command } from "commander";
import chalk from "chalk";
import sharp from "sharp";

const program = new Command();

program
  .name("imgresize")
  .description("A CLI Toold to resize images")
  .version("1.0.0")
  .option("-r, --resize <filepath>", "Resize an image")
  .option("-f, --format <filepath>", "Format of the output image")
  .option("-o, --output <filepath>", "Output file")
  .option("-w, --width <number>", "Width of the output image");

console.log(chalk.blue(figlet.textSync("Image Resize CLI")));

program.parse();

const options = program.opts();

async function resizeImage(
  inputPath: string,
  outputPath: string,
  width: number
) {
  try {
    const image = sharp(inputPath);
    const imageInfo = await image.metadata();

    if (!imageInfo.width || !imageInfo.height) {
      console.log(chalk.red("Image has invalid size"));
      return;
    }

    if (imageInfo.width <= width) {
      console.log(
        chalk.yellow("Image is already smaller than the target width")
      );
      return;
    }

    const ratio = width / imageInfo.width;
    const height = Math.round(imageInfo.height * ratio);

    await image.resize(width, height).toFile(outputPath);
  } catch (error: unknown) {
    console.error(error);
  }
}

async function formatImage(inputPath: string, outputPath: string) {
  try {
    const image = sharp(inputPath);
    const imageInfo = await image.metadata();
    const imageFormat = imageInfo.format;
    const newImageFormat = outputPath.split(".").pop();

    if (!newImageFormat) {
      console.log(chalk.red("Output file has no format"));
      return;
    }

    if (imageFormat === newImageFormat) {
      console.log(chalk.yellow("Image is already in the desired format"));
      return;
    }

    switch (newImageFormat) {
      case "jpeg":
        await image.jpeg().toFile(outputPath);
        break;
      case "png":
        await image.png().toFile(outputPath);
        break;
      case "webp":
        await image.webp().toFile(outputPath);
        break;
      default:
        console.log(chalk.red("Output file has invalid format"));
        return;
    }
  } catch (error: unknown) {
    console.error(error);
  }
}

if (options.resize && options.output && options.width) {
  const inputPath = path.resolve(options.resize);
  const outputPath = path.resolve(options.output);
  const width = Number(options.width);

  if (!fs.existsSync(inputPath)) {
    console.log(chalk.red("Input file does not exist"));
    process.exit(1);
  }

  if (fs.existsSync(outputPath)) {
    console.log(chalk.red("Output file already exists"));
    process.exit(1);
  }

  if (isNaN(width)) {
    console.log(chalk.red("Width is not a number"));
    process.exit(1);
  }

  resizeImage(inputPath, outputPath, width);
} else if (options.format && options.output) {
  const inputPath = path.resolve(options.format);
  const outputPath = path.resolve(options.output);

  if (!fs.existsSync(inputPath)) {
    console.log(chalk.red("Input file does not exist"));
    process.exit(1);
  }

  if (fs.existsSync(outputPath)) {
    console.log(chalk.red("Output file already exists"));
    process.exit(1);
  }

  formatImage(inputPath, outputPath);
} else {
  program.help();
}
