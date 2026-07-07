import type { TechnologyDefinition } from '../../types';

export const dialogElementTechnologyDefinition = {
	id: "dialog-element",
	name: "Dialog Element",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog",
	description: "Uses the native HTML dialog element for modal or non-modal dialogs.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "dialog-element:html:0",
			kind: "html",
			pattern: new RegExp("<dialog(?:\\s|>)", "i"),
			confidence: 100,
			description: "Document uses a native dialog element.",
		},
	],
} as const satisfies TechnologyDefinition;
