# @bryan-hoang/aoc-client

<!-- automd:badges github="bryan-hoang/aoc-cli-node" license bundlephobia -->

[![npm version](https://img.shields.io/npm/v/@bryan-hoang/aoc-client)](https://npmjs.com/package/@bryan-hoang/aoc-client)
[![npm downloads](https://img.shields.io/npm/dm/@bryan-hoang/aoc-client)](https://npm.chart.dev/@bryan-hoang/aoc-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@bryan-hoang/aoc-client)](https://bundlephobia.com/package/@bryan-hoang/aoc-client)
[![license](https://img.shields.io/github/license/bryan-hoang/aoc-cli-node)](https://github.com/bryan-hoang/aoc-cli-node/blob/main/LICENSE)

<!-- /automd -->

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

A TS library for Advent of Code.

It was primarily developed to build the
[`@bryan-hoang/aoc-cli`](https://www.npmjs.com/package/@bryan-hoang/aoc-cli)
command-line tool, but it can also be integrated into other projects.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Install

<!-- automd:pm-install name="@bryan-hoang/aoc-client" -->

```sh
# ✨ Auto-detect
npx nypm install @bryan-hoang/aoc-client

# npm
npm install @bryan-hoang/aoc-client

# yarn
yarn add @bryan-hoang/aoc-client

# pnpm
pnpm install @bryan-hoang/aoc-client

# bun
bun install @bryan-hoang/aoc-client

# deno
deno install @bryan-hoang/aoc-client
```

<!-- /automd -->

## Usage

Importing:

<!-- automd:jsimport cjs cdn name="@bryan-hoang/aoc-client" src="./src/lib.ts" -->

**ESM** (Node.js, Bun, Deno)

```js
import { AocClientBuilder, AocClient } from "@bryan-hoang/aoc-client";
```

**CommonJS** (Legacy Node.js)

```js
const { AocClientBuilder, AocClient } = require("@bryan-hoang/aoc-client");
```

**CDN** (Deno, Bun and Browsers)

```js
import {
  AocClientBuilder,
  AocClient,
} from "https://esm.sh/@bryan-hoang/aoc-client";
```

<!-- /automd -->

API:

<!-- TSDOC_START -->

## :factory: AocClientBuilder

### Methods

- [buildClient](#gear-buildclient)
- [#validateBuild](#gear-#validatebuild)
- [getSessionCookieFromDefaultLocations](#gear-getsessioncookiefromdefaultlocations)
- [getSessionCookieFromFile](#gear-getsessioncookiefromfile)
- [getDefaultSessionCookieFile](#gear-getdefaultsessioncookiefile)
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

#### :gear: #validateBuild

| Method | Type |
| ---------- | ---------- |
| `#validateBuild` | `() => asserts this is this and { _sessionCookie: string; _year: number; _day: number; }` |

#### :gear: getSessionCookieFromDefaultLocations

| Method | Type |
| ---------- | ---------- |
| `getSessionCookieFromDefaultLocations` | `() => AocClientBuilder` |

#### :gear: getSessionCookieFromFile

| Method | Type |
| ---------- | ---------- |
| `getSessionCookieFromFile` | `(file: string) => AocClientBuilder` |

#### :gear: getDefaultSessionCookieFile

| Method | Type |
| ---------- | ---------- |
| `getDefaultSessionCookieFile` | `() => string` |

#### :gear: sessionCookie

| Method | Type |
| ---------- | ---------- |
| `sessionCookie` | `(sessionCookie: string) => AocClientBuilder` |

#### :gear: year

| Method | Type |
| ---------- | ---------- |
| `year` | `(year: number) => AocClientBuilder` |

#### :gear: day

| Method | Type |
| ---------- | ---------- |
| `day` | `(day: number) => AocClientBuilder` |

#### :gear: latestPuzzleDay

| Method | Type |
| ---------- | ---------- |
| `latestPuzzleDay` | `() => AocClientBuilder` |

#### :gear: latestEventYear

| Method | Type |
| ---------- | ---------- |
| `latestEventYear` | `() => AocClientBuilder` |

#### :gear: overwriteFiles

| Method | Type |
| ---------- | ---------- |
| `overwriteFiles` | `(overwriteFiles: boolean) => AocClientBuilder` |


## :factory: AocClient

### Methods

- [getBuilder](#gear-getbuilder)
- [ensureDayUnlocked](#gear-ensuredayunlocked)
- [isDayUnlocked](#gear-isdayunlocked)

#### :gear: getBuilder

| Method | Type |
| ---------- | ---------- |
| `getBuilder` | `() => AocClientBuilder` |

#### :gear: ensureDayUnlocked

| Method | Type |
| ---------- | ---------- |
| `ensureDayUnlocked` | `() => void` |

#### :gear: isDayUnlocked

| Method | Type |
| ---------- | ---------- |
| `isDayUnlocked` | `() => boolean` |


<!-- TSDOC_END -->

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
