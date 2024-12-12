# @bryan-hoang/aoc-cli

## 0.3.0

### Minor Changes

- 6f08663: Add `help` sub-command

### Patch Changes

- Updated dependencies [895fb1d]
- Updated dependencies [00606a7]
  - @bryan-hoang/aoc-client@0.2.1

## 0.2.2

### Patch Changes

- f94e197: Remove `-V` alias for printing the version

## 0.2.1

### Patch Changes

- Resolve a warning recommending that `aoc-cli/package.json` have `"type":
ommonjs"` by having the cli's entrypoint have an explicit `.mjs` file
  extension.
- Fix an error causing the output to contain a mix of ES & CommonJS module
  syntax due to a transitive dependency on `turndown`.
- Await floating promises in download subcommand to avoid confusing
  interweaving of log output.

## 0.2.0

### Minor Changes

- Add download subcommand

### Patch Changes

- Updated dependencies
  - @bryan-hoang/aoc-client@0.2.0

## 0.0.0

### Minor Changes

- Add dependency on aoc-client
