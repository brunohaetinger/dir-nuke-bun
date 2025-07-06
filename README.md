<p align="center">
  <img src="logo.png" width="128" alt="Locker Bun Logo" />
</p>

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

