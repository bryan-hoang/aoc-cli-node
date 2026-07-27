# Repository Instructions

## Architecture

- This pnpm workspace contains two packages; `@bryan-hoang/aoc-cli` depends on
  `@bryan-hoang/aoc-client` through `workspace:*`.
- CLI source starts at `packages/aoc-cli/src/index.ts`; Citty command
  definitions live under `src/commands/`. `bin/aoc.mjs` loads `dist/index.mjs`,
  so build the package before running that binary from the checkout.
- The client public barrel is `packages/aoc-client/src/index.ts`. Its behavior
  and generated API documentation are centered in `src/lib.ts`.

## Toolchain

- Use Vite+ (`vp`) for dependency and task commands. Do not invoke
  `pnpm`/`npm`/`yarn`/`npx` directly, despite the pnpm lockfile and
  `packageManager` field.
- Vite+ built-ins and package scripts are different: use `vp check` and
  `vp test`, but `vp run <script>` for scripts from `package.json`.
- Vite+ supplies Vite, Vitest, Oxfmt, Oxlint, and tsdown. Do not add them as
  separate dependencies; import config from `vite-plus` and test APIs from
  `vite-plus/test`.
- `vp check` includes formatting, type-aware linting, and TypeScript checks;
  formatting uses tabs. Use `vp check --fix <paths>` to apply focused fixes.
- Reuse `catalog:` for dependencies already listed in `pnpm-workspace.yaml`.

## Commands

- Run full verification from the repository root in CI order. The filtered final
  command is intentional: CI's current `vp run test:attw` selects no package
  tasks.

  ```sh
  vp install
  vp run -r build
  vp check
  vp test
  vp run --filter "@bryan-hoang/aoc-client" --fail-if-no-match test:attw
  ```

- Run one test with `vp test run <test-file> -t "<test name>"`.
- Run one package script with
  `vp run --filter "@bryan-hoang/aoc-client" --fail-if-no-match <script>`.

## Generated Documentation

- README sections inside `automd` or `TSDOC` markers are generated. After a
  public API or TSDoc change in `packages/aoc-client/src/lib.ts`, run
  `vp run build:docs` from the root and include the resulting README changes.

## Tests And Credentials

- Tests are colocated under package `src/` directories. Two session-loading
  tests in `packages/aoc-client/src/lib.test.ts` are skipped when `CI` is set.
- Authentication resolves `ADVENT_OF_CODE_SESSION` first, then
  `advent-of-code/session-cookie.txt` in the OS config directory. Never use a
  real session cookie or live answer submission in automated tests.
