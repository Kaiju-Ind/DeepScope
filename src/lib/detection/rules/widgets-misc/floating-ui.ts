import type { TechnologyDefinition } from '../../types';

export const floatingUiTechnologyDefinition = {
	id: "floating-ui",
	name: "Floating UI",
	website: "https://floating-ui.com/",
	description: "A JavaScript library to position floating elements and create interactions for them.",
	icon: "Floating UI.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "floating-ui:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("floating-ui(?:\\/core)?(?:\\/dom)?(?:\\.js)?(?:@?(?:\\?v(?:er)?=)?((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
