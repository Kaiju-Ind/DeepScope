import type { TechnologyDefinition } from '../../types';

/**
 * Captures an active browser capability or document standard from concrete page
 * evidence. These rules intentionally use protocol markers and API calls rather
 * than prose references so the card reflects runtime behavior.
 */
export const htmlInertAttributeTechnologyDefinition = {
	id: "html-inert-attribute",
	name: "HTML inert Attribute",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert",
	description: "The HTML inert attribute disables interaction and focus for a subtree while modals, menus, or off-canvas views are inactive.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "html-inert-attribute:html:0",
			kind: "html",
			pattern: /<[^>]+\binert(?:\s|=|>)/i,
			confidence: 80,
			description: "Document markup uses the native inert attribute.",
		},
	],
} as const satisfies TechnologyDefinition;
