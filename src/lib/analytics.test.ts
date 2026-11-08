import { strict as assert } from "node:assert";
import { test } from "node:test";
import { isPrivatePath, track } from "./analytics";

test("URLs with email tokens or private results are never sent to analytics", () => {
  for (const p of ["/subscribe/confirm", "/unsubscribe", "/checker/r/abc123"]) assert.equal(isPrivatePath(p), true, p);
  for (const p of ["/", "/checker", "/guides/dtv-with-family", "/subscribers-guide"]) assert.equal(isPrivatePath(p), false, p);
});

test("tracking without a browser does not throw", () => {
  assert.doesNotThrow(() => track("sign_up", { method: "email" }));
});
