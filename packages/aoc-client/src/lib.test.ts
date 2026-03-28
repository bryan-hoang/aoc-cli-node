import { describe, expect, test } from "vite-plus/test";
import { AocClient } from "./lib.js";

describe("AocBuilder", () => {
	test("throws if missing session cookie", () => {
		const builder = AocClient.getBuilder();
		expect(() => builder.buildClient()).toThrow(/missing field: _sessionCookie/);
	});

	test.skipIf(process.env.CI)("throws if missing year", () => {
		const builder = AocClient.getBuilder();
		builder.getSessionCookieFromDefaultLocations();
		expect(() => builder.buildClient()).toThrow(/missing field: _year/);
	});

	test.skipIf(process.env.CI)("builds successfully with all required fields", () => {
		const builder = AocClient.getBuilder();
		builder.getSessionCookieFromDefaultLocations();
		builder.latestPuzzleDay();
		expect(builder.buildClient()).toBeDefined();
	});
});
