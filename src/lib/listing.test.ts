import { strict as assert } from "node:assert";
import { test } from "node:test";
import { isListed } from "./listing";

test("unverified with no facts and no description is hidden", () => assert.equal(isListed({ status: "unverified", facts: [] }), false));
test("unverified with null facts is hidden", () => assert.equal(isListed({ status: "unverified", facts: null, description_en: null }), false));
test("unverified with one fact is listed", () => assert.equal(isListed({ status: "unverified", facts: [{}] }), true));
test("unverified with a description is listed", () => assert.equal(isListed({ status: "unverified", facts: [], description_en: "x" }), true));
test("contacted with no facts is listed", () => assert.equal(isListed({ status: "contacted", facts: [] }), true));
test("verified with no facts is listed", () => assert.equal(isListed({ status: "verified", facts: [] }), true));
test("suspended is never listed", () => assert.equal(isListed({ status: "suspended", facts: [{}] }), false));
