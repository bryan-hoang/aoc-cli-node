# aoc-cli-node

[![license](https://img.shields.io/github/license/bryan-hoang/aoc-cli-node)](https://github.com/bryan-hoang/aoc-cli-node/blob/main/LICENSE)
[![CI](https://github.com/bryan-hoang/aoc-cli-node/actions/workflows/ci.yml/badge.svg)](https://github.com/bryan-hoang/aoc-cli-node/actions/workflows/ci.yml)
[![Release](https://github.com/bryan-hoang/aoc-cli-node/actions/workflows/release.yml/badge.svg)](https://github.com/bryan-hoang/aoc-cli-node/actions/workflows/release.yml)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

An Advent of Code command-line tool developed using Node.js.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Install

For the command-line tool:

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

<!-- automd:pm-x version="latest" name="@bryan-hoang/aoc-cli" args="<args>" -->

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

For the client library:

<!-- automd:pm-install name="@bryan-hoang/aoc-client" -->

```sh
# ✨ Auto-detect
npx nypm install @bryan-hoang/aoc-client

# npm
npm install @bryan-hoang/aoc-client

# yarn
yarn add @bryan-hoang/aoc-client

# pnpm
pnpm add @bryan-hoang/aoc-client

# bun
bun install @bryan-hoang/aoc-client

# deno
deno install npm:@bryan-hoang/aoc-client
```

<!-- /automd -->

## Usage

For the command-line tool:

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

For the client library:

<!-- automd:jsimport cjs cdn name="@bryan-hoang/aoc-client" src="./packages/aoc-client/src/lib.ts" -->

**ESM** (Node.js, Bun, Deno)

```js
import { AocClientBuilder, AocClient } from "@bryan-hoang/aoc-client";
```

**CommonJS** (Legacy Node.js)

```js
const { AocClientBuilder, AocClient } = require("@bryan-hoang/aoc-client");
```

**CDN** (Deno and Browsers)

```js
import {
  AocClientBuilder,
  AocClient,
} from "https://esm.sh/@bryan-hoang/aoc-client";
```

<!-- /automd -->

<!-- TSDOC_START -->

## :factory: AocClientBuilder

[:link: Source](https://github.com/bryan-hoang/aoc-cli-node/tree/main/packages/aoc-client/src/lib.ts#L26)

### Static Methods

- [getDefaultSessionCookieFile](#gear-getdefaultsessioncookiefile)

#### :gear: getDefaultSessionCookieFile

| Method | Type |
| ---------- | ---------- |
| `getDefaultSessionCookieFile` | `() => string` |

[:link: Source](https://github.com/bryan-hoang/aoc-cli-node/tree/main/packages/aoc-client/src/lib.ts#L109)

### Methods

- [buildClient](#gear-buildclient)
- [getSessionCookieFromDefaultLocations](#gear-getsessioncookiefromdefaultlocations)
- [getSessionCookieFromFile](#gear-getsessioncookiefromfile)
- [sessionCookie](#gear-sessioncookie)
- [year](#gear-year)
- [day](#gear-day)
- [latestPuzzleDay](#gear-latestpuzzleday)
- [latestEventYear](#gear-latesteventyear)
- [overwriteFiles](#gear-overwritefiles)

#### :gear: buildClient

| Method | Type |
| ---------- | ---------- |
| `buildClient` | `() => AocClient` |

[:link: Source](https://github.com/bryan-hoang/aoc-cli-node/tree/main/packages/aoc-client/src/lib.ts#L34)

#### :gear: getSessionCookieFromDefaultLocations

| Method | Type |
| ---------- | ---------- |
| `getSessionCookieFromDefaultLocations` | `() => AocClientBuilder` |

[:link: Source](https://github.com/bryan-hoang/aoc-cli-node/tree/main/packages/aoc-client/src/lib.ts#L76)

#### :gear: getSessionCookieFromFile

| Method | Type |
| ---------- | ---------- |
| `getSessionCookieFromFile` | `(file: string) => AocClientBuilder` |

[:link: Source](https://github.com/bryan-hoang/aoc-cli-node/tree/main/packages/aoc-client/src/lib.ts#L97)

#### :gear: sessionCookie

| Method | Type |
| ---------- | ---------- |
| `sessionCookie` | `(sessionCookie: string) => AocClientBuilder` |

[:link: Source](https://github.com/bryan-hoang/aoc-cli-node/tree/main/packages/aoc-client/src/lib.ts#L114)

#### :gear: year

| Method | Type |
| ---------- | ---------- |
| `year` | `(year: number) => AocClientBuilder` |

[:link: Source](https://github.com/bryan-hoang/aoc-cli-node/tree/main/packages/aoc-client/src/lib.ts#L125)

#### :gear: day

| Method | Type |
| ---------- | ---------- |
| `day` | `(day: number) => AocClientBuilder` |

[:link: Source](https://github.com/bryan-hoang/aoc-cli-node/tree/main/packages/aoc-client/src/lib.ts#L134)

#### :gear: latestPuzzleDay

| Method | Type |
| ---------- | ---------- |
| `latestPuzzleDay` | `() => AocClientBuilder` |

[:link: Source](https://github.com/bryan-hoang/aoc-cli-node/tree/main/packages/aoc-client/src/lib.ts#L148)

#### :gear: latestEventYear

| Method | Type |
| ---------- | ---------- |
| `latestEventYear` | `() => AocClientBuilder` |

[:link: Source](https://github.com/bryan-hoang/aoc-cli-node/tree/main/packages/aoc-client/src/lib.ts#L168)

#### :gear: overwriteFiles

| Method | Type |
| ---------- | ---------- |
| `overwriteFiles` | `(overwriteFiles: boolean) => AocClientBuilder` |

[:link: Source](https://github.com/bryan-hoang/aoc-cli-node/tree/main/packages/aoc-client/src/lib.ts#L181)

## :factory: AocClient

[:link: Source](https://github.com/bryan-hoang/aoc-cli-node/tree/main/packages/aoc-client/src/lib.ts#L187)

### Static Methods

- [getBuilder](#gear-getbuilder)

#### :gear: getBuilder

| Method | Type |
| ---------- | ---------- |
| `getBuilder` | `() => AocClientBuilder` |

[:link: Source](https://github.com/bryan-hoang/aoc-cli-node/tree/main/packages/aoc-client/src/lib.ts#L198)

### Methods

- [ensureDayUnlocked](#gear-ensuredayunlocked)
- [isDayUnlocked](#gear-isdayunlocked)

#### :gear: ensureDayUnlocked

| Method | Type |
| ---------- | ---------- |
| `ensureDayUnlocked` | `() => void` |

[:link: Source](https://github.com/bryan-hoang/aoc-cli-node/tree/main/packages/aoc-client/src/lib.ts#L247)

#### :gear: isDayUnlocked

| Method | Type |
| ---------- | ---------- |
| `isDayUnlocked` | `() => boolean` |

[:link: Source](https://github.com/bryan-hoang/aoc-cli-node/tree/main/packages/aoc-client/src/lib.ts#L253)

<!-- TSDOC_END -->

## Maintainers

[@bryan-hoang](https://github.com/bryan-hoang)

## Contributing

PRs accepted.

Small note: if editing the README, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2024 Bryan Hoang

Functionality is inspired by
[scarvalhojr/aoc-cli](https://github.com/scarvalhojr/aoc-cli). Project structure
is inspired by [nuxt/cli](https://github.com/nuxt/cli).

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
