import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildFallbackAutomationScript,
  isValidAutomationScript,
} from '../src/services/automation.service.js';

test('buildFallbackAutomationScript returns a safe Playwright module', () => {
  const script = buildFallbackAutomationScript({
    testCase: {
      title: 'Verify login form',
      description: 'Ensure a user can log in',
      expectedResult: 'User sees dashboard',
      targetRoute: '/login',
    },
    baseUrl: 'https://example.com',
  });

  assert.match(script, /import assert from "node:assert";/);
  assert.match(script, /export default async function \(\{ page \}\) \{/);
  assert.doesNotMatch(script, /hasClass\s*\(/);
  assert.doesNotMatch(script, /page\.waitForTimeout\s*\(/);
});

test('isValidAutomationScript rejects brittle scripts', () => {
  assert.equal(
    isValidAutomationScript(`import assert from "node:assert";
export default async function ({ page }) {
  const button = page.locator('.btn');
  button.hasClass('active');
}`),
    false
  );

  assert.equal(
    isValidAutomationScript(`import assert from "node:assert";
export default async function ({ page }) {
  await page.goto('https://example.com');
  await page.waitForLoadState('networkidle');
}`),
    true
  );
});
