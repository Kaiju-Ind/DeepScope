import type { TechnologyDefinition } from '../../types';

export const bemTechnologyDefinition = {
	id: "bem",
	name: "BEM",
	website: "https://en.bem.info",
	description: "BEM (Block, Element, Modifier) is a naming convention for classes in HTML and CSS what was developed by Yandex.",
	icon: "BEM.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "bem:html:0",
			kind: "html",
			pattern: new RegExp("<[^>]+data-bem"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
