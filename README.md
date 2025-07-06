# dir-nuke

`dir-nuke` is a command-line interface (CLI) tool that helps you find and delete `node_modules` folders on your system. It allows you to select specific `node_modules` folders to delete or delete all of them at once, helping you free up disk space.

## How to Run

To install dependencies:

```bash
bun install
```

To run the tool and search for `node_modules` in the current directory:

```bash
bun run index.ts
```

To run the tool and search for `node_modules` in a specific directory (e.g., your home directory):

```bash
bun run index.ts /home/youruser
```

This project was created using `bun init` in bun v1.2.17. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
