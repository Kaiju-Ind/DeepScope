import { describe, expect, it } from 'vitest';

import { hasSensitiveEvidenceFragment, redactDiagnosticValue, redactEvidenceValue } from '@/lib/privacy/redaction';

describe('evidence redaction', () => {
	it('redacts token assignments before evidence reaches storage', () => {
		expect(redactEvidenceValue('access_token=secret-token-value')).toBe('access_token=[redacted]');
		expect(redactEvidenceValue('Authorization: Bearer abc123')).toBe('Authorization: [redacted]');
	});

	it('redacts JWT-looking values inside larger strings', () => {
		expect(redactEvidenceValue('state=aaaaaaaaaa.bbbbbbbbbb.cccccccccc')).toBe('state=[redacted-jwt]');
	});

	it('redacts emails, phone numbers, and query parameter values', () => {
		expect(redactEvidenceValue('contact admin@example.com')).toBe('contact [redacted-email]');
		expect(redactEvidenceValue('call 555-123-4567')).toBe('call [redacted-phone]');
		expect(redactEvidenceValue('https://example.com/callback?code=abc123&state=xyz')).toBe(
			'https://example.com/callback?code=[redacted]&state=[redacted]',
		);
	});

	it('keeps ordinary technology evidence visible', () => {
		expect(redactEvidenceValue('/wp-content/plugins/woocommerce/assets/app.js')).toBe(
			'/wp-content/plugins/woocommerce/assets/app.js',
		);
		expect(hasSensitiveEvidenceFragment('/_next/static/chunks/main.js')).toBe(false);
	});

	it('applies the caller supplied display limit after redaction', () => {
		expect(redactEvidenceValue('abcdef', 3)).toBe('abc');
	});
	it('keeps ordinary diagnostic query values while redacting secret query keys', () => {
		expect(redactDiagnosticValue('https://example.com/search?q=magento&page=2')).toBe(
			'https://example.com/search?q=magento&page=2',
		);
		expect(redactDiagnosticValue('https://example.com/callback?code=abc123&locale=en-CA')).toBe(
			'https://example.com/callback?code=[redacted]&locale=en-CA',
		);
	});

	it('keeps phone-shaped runtime identifiers visible in diagnostics', () => {
		expect(redactDiagnosticValue('tabId=1504265247')).toBe('tabId=1504265247');
		expect(redactDiagnosticValue('matcher:1504265096:1787213934208')).toBe('matcher:1504265096:1787213934208');
	});

});
