# @bryan-hoang/aoc-cli

<!-- automd:badges github="bryan-hoang/aoc-cli-node" license -->

[![npm version](https://img.shields.io/npm/v/@bryan-hoang/aoc-cli)](https://npmjs.com/package/@bryan-hoang/aoc-cli)
[![npm downloads](https://img.shields.io/npm/dm/@bryan-hoang/aoc-cli)](https://npm.chart.dev/@bryan-hoang/aoc-cli)
[![license](https://img.shields.io/github/license/bryan-hoang/aoc-cli-node)](https://github.com/bryan-hoang/aoc-cli-node/blob/main/LICENSE)

<!-- /automd -->

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

An Advent of Code command-line tool.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Install

```console
# ✨ Auto-detect
npx nypm install -g @bryan-hoang/aoc-cli

# npm
npm install -g @bryan-hoang/aoc-cli

# yarn
yarn add -g @bryan-hoang/aoc-cli

# pnpm
pnpm install -g @bryan-hoang/aoc-cli

# bun
bun install -g @bryan-hoang/aoc-cli

# deno
deno install -g @bryan-hoang/aoc-cli

# Running the tool
aoc <args>
# or
aoc-cli <args>
```

or

<!-- automd:pm-x version="latest" args="<args>" -->

```sh
# npm
npx @bryan-hoang/aoc-cli@latest <args>

# pnpm
pnpm dlx @bryan-hoang/aoc-cli@latest <args>

# bun
bunx @bryan-hoang/aoc-cli@latest <args>

# deno
deno run -A npm:@bryan-hoang/aoc-cli@latest <args>
```

<!-- /automd -->

## Usage

```console
$ aoc help
An Advent of Code command-line tool

USAGE aoc [OPTIONS] submit|download|help

COMMANDS

  submit    Submit puzzle answer
  download  Save puzzle description and input to files
  help      Print this message or the help of the given subcommand(s)

OPTIONS

  -d, --day <DAY>            Puzzle day [default: last unlocked day (during Advent of Code month)]
  -y, --year <YEAR>          Puzzle year [default: year of current or last Advent of Code event]
  -s, --session-file <PATH>  Path to session cookie file [default: /home/bryan/.config/advent-of-code/session-cookie.txt]
  -h, --help                 Print help information
  --version                  Print version information
```

## Maintainers

[@bryan-hoang](https://github.com/bryan-hoang)

## Contributing

PRs accepted.

Small note: if editing the README, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2024 Bryan Hoang

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
