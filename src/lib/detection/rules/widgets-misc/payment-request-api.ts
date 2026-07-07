import type { TechnologyDefinition } from '../../types';

/**
 * Captures an active browser capability or document standard from concrete page
 * evidence. These rules intentionally use protocol markers and API calls rather
 * than prose references so the card reflects runtime behavior.
 */
export const paymentRequestApiTechnologyDefinition = {
	id: "payment-request-api",
	name: "Payment Request API",
	website: "https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API",
	description: "Payment Request API exposes a browser-native payment-sheet flow when checkout code creates PaymentRequest objects.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "payment-request-api:scriptContent:0",
			kind: "scriptContent",
			pattern: /\bnew\s+PaymentRequest\s*\(|\bPaymentRequest\b/i,
			confidence: 80,
			description: "Bundled script content references PaymentRequest checkout primitives.",
		},
	],
} as const satisfies TechnologyDefinition;
