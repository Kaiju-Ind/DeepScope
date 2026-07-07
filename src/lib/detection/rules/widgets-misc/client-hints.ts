import type { TechnologyDefinition } from '../../types';

/**
 * Captures an active browser capability or document standard from concrete page
 * evidence. These rules intentionally use protocol markers and API calls rather
 * than prose references so the card reflects runtime behavior.
 */
export const clientHintsTechnologyDefinition = {
	id: "client-hints",
	name: "Client Hints",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Client_hints",
	description: "Client Hints let servers request browser-provided device, network, or preference hints through HTTP negotiation.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "client-hints:header:0",
			kind: "header",
			key: "accept-ch",
			valuePattern: /.+/i,
			confidence: 90,
			description: "Main document response asks the browser to send Client Hints.",
		},
		{
			id: "client-hints:responseHeader:1",
			kind: "responseHeader",
			key: "accept-ch",
			valuePattern: /.+/i,
			confidence: 90,
			description: "Captured response asks the browser to send Client Hints.",
		},
		{
			id: "client-hints:html:2",
			kind: "html",
			pattern: /<meta\s+[^>]*http-equiv=["\']Accept-CH["\'][^>]*>/i,
			confidence: 80,
			description: "Document markup asks the browser to send Client Hints through a meta http-equiv tag.",
		},
	],
} as const satisfies TechnologyDefinition;
