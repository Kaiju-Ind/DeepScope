import type { TechnologyDefinition } from '../../types';

export const pictureElementTechnologyDefinition = {
	id: "picture-element",
	name: "Picture Element",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture",
	description: "Uses the HTML picture element for art direction or responsive image selection.",
	categories: [
		"mobile",
	],
	rules: [
		{
			id: "picture-element:html:0",
			kind: "html",
			pattern: new RegExp("<picture(?:\\s|>)", "i"),
			confidence: 100,
			description: "Document uses a picture element.",
		},
	],
} as const satisfies TechnologyDefinition;
