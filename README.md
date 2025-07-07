<p align="center">
  <img src="logo.png" width="128" alt="Locker Bun Logo" style="border-radius: 25px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); padding: 10px;"/>
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

## Bun Building scripts

On `package.json` there are 2 building scripts:

This will generate a `.js` file, target to be run using `bun`
> "build": "bun build ./index.tsx --outdir ./build --target bun",

This will generate a `clean-nm` single file, which can be run in the same platform as the compiling machine.
> "build-standalone": "bun build ./index.tsx --compile --outfile build/clean-nm"


#### Files generated at this moment:

| File | Size | Issue |
| --- | --- | --- |
| index.js | 1,5M | Can only be run by `bun` runtime |
| clean-nm | 103M | Too large file |