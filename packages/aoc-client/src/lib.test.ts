import { describe, expect, test, vi } from "vite-plus/test";

import { AocClient } from "./lib.js";

describe("AocBuilder", () => {
	test("throws if missing session cookie", () => {
		const builder = AocClient.getBuilder();
		expect(() => builder.buildClient()).toThrow(/missing field: _sessionCookie/);
	});

	test.skipIf(process.env.CI)("throws if missing year", () => {
		vi.stubEnv("ADVENT_OF_CODE_SESSION", "deadbeef");
		const builder = AocClient.getBuilder();
		builder.getSessionCookieFromDefaultLocations();
		expect(() => builder.buildClient()).toThrow(/missing field: _year/);
		vi.unstubAllEnvs();
	});

	test.skipIf(process.env.CI)("builds successfully with all required fields", () => {
		vi.stubEnv("ADVENT_OF_CODE_SESSION", "deadbeef");
		const builder = AocClient.getBuilder();
		builder.getSessionCookieFromDefaultLocations();
		builder.latestPuzzleDay();
		expect(builder.buildClient()).toBeDefined();
		vi.unstubAllEnvs();
	});
});
