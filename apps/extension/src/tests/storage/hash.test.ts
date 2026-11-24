import { createDetectionStorageHash } from "@/lib/storage/contracts";
import { createFnv1a32Hash } from "@/lib/storage/hash";
import { describe, expect, it } from "vitest";

describe("createDetectionStorageHash", () => {
	it("creates a stable fragment for the same input", () => {
		const input = "https://example.com/products?sku=abc";

		expect(createDetectionStorageHash(input)).toBe(createDetectionStorageHash(input));
	});

	it("does not include raw URL text in the storage fragment", () => {
		const fragment = createDetectionStorageHash("https://example.com/private");

		expect(fragment).not.toContain("example");
		expect(fragment).not.toContain("private");
		expect(fragment).not.toContain("https");
  });

	it("matches FNV-1a 32-bit vectors formatted as base-36 storage fragments", () => {
		expect(createDetectionStorageHash("")).toBe(Number.parseInt("811c9dc5", 16).toString(36));
		expect(createDetectionStorageHash("a")).toBe(Number.parseInt("e40c292c", 16).toString(36));
		expect(createDetectionStorageHash("foobar")).toBe(Number.parseInt("bf9cf968", 16).toString(36));
	});
});

describe("createFnv1a32Hash", () => {
	it("matches common FNV-1a 32-bit reference vectors", () => {
		expect(createFnv1a32Hash("").toString(16).padStart(8, "0")).toBe("811c9dc5");
		expect(createFnv1a32Hash("a").toString(16).padStart(8, "0")).toBe("e40c292c");
		expect(createFnv1a32Hash("foobar").toString(16).padStart(8, "0")).toBe("bf9cf968");
	});
});
