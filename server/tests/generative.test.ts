import { describe, expect, test } from "bun:test";
import { GPC } from "../src/gpc.ts";
import { dbService } from "../src/db.ts";
import { db } from "../src/db.ts";

describe("Generative Problem Composer (GPC) Engine", () => {
  test("generates and solves 2x2 matrix determinant problems correctly", () => {
    const q = GPC.generateQuestion("MATRIX_DETERMINANT");
    expect(q.text).toStartWith("det([");
    expect(q.answer).toBeDefined();

    // Parse det([a, b; c, d])
    const match = q.text.match(/det\(\[(\d+),\s*(\d+);\s*(\d+),\s*(\d+)\]\)/);
    expect(match).not.toBeNil();

    const a = parseInt(match![1]);
    const b = parseInt(match![2]);
    const c = parseInt(match![3]);
    const d = parseInt(match![4]);
    const expectedDet = a * d - b * c;

    expect(parseInt(q.answer)).toBe(expectedDet);
  });

  test("generates and solves modular arithmetic congruence problems correctly", () => {
    const q = GPC.generateQuestion("MODULAR_CONGRUENCE");
    expect(q.text).toContain("mod");
    expect(q.answer).toBeDefined();

    // Parse a mod b
    const match = q.text.match(/(\d+)\s+mod\s+(\d+)/);
    expect(match).not.toBeNil();

    const dividend = parseInt(match![1]);
    const divisor = parseInt(match![2]);
    const expectedRemainder = dividend % divisor;

    expect(parseInt(q.answer)).toBe(expectedRemainder);
  });

  test("evaluates JSON templates under the strict 1.2ms NFR boundary", () => {
    const template = JSON.stringify({
      modeName: "MATRIX_DETERMINANT",
      operandMin: 2,
      operandMax: 8
    });

    const start = performance.now();
    const q = GPC.evaluateDynamicTemplate(template);
    const elapsed = performance.now() - start;

    expect(elapsed).toBeLessThan(1.2); // NFR boundary check
    expect(q.text).toStartWith("det([");
  });

  test("saves and loads verified plugins from SQLite matching SHA-256 fingerprints", () => {
    const mockPlugin = {
      id: "pl_test_neon",
      authorId: "test_author",
      pluginName: "Neon Glow",
      versionTag: "1.0.0",
      sourceUrl: "https://mock.com/plugin.js",
      sha256Fingerprint: "5fe82f8a8461cd161307b2255d6480b2713f0927e1f06a3cd8126e84848408b2"
    };

    // Save
    dbService.registerPlugin(mockPlugin);

    // Verify it is NOT returned in getVerifiedPlugins yet because is_verified = 0
    let verified = dbService.getVerifiedPlugins();
    expect(verified.find(p => p.id === mockPlugin.id)).toBeNil();

    // Approve verification
    db.run("UPDATE community_plugins SET is_verified = 1 WHERE id = ?", [mockPlugin.id]);

    // Now it should return in verified plugins list
    verified = dbService.getVerifiedPlugins();
    const found = verified.find(p => p.id === mockPlugin.id);
    expect(found).not.toBeNil();
    expect(found.sha256_fingerprint).toBe(mockPlugin.sha256Fingerprint);

    // Clean up
    db.run("DELETE FROM community_plugins WHERE id = ?", [mockPlugin.id]);
  });
});
