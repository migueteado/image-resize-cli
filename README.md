# imgresize cli

This is a cli tool made for learning purposes that resizes or reformats images. It uses [commander](https://github.com/tj/commander.js), [chalk](https://github.com/chalk/chalk) and [sharp](https://github.com/lovell/sharp).

## Resize

Resizes an image to the desired width keeping aspect ratio.

| option              | short | required | description                      |
| ------------------- | ----- | -------- | -------------------------------- |
| --resize <filepath> | -r    | true     | path to file to change format to |
| --output <filepath> | -o    | true     | path to save the result          |
| --width <filepath>  | -w    | true     | new image width                  |

## Format

Reformat an image to the desired file type (inferred from the output filepath).

| option              | short | required | description                      |
| ------------------- | ----- | -------- | -------------------------------- |
| --format <filepath> | -f    | true     | path to file to change format to |
| --output <filepath> | -o    | true     | path to save the result          |
