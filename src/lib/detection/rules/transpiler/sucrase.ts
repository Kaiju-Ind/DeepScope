import type { TechnologyDefinition } from '../../types';

export const sucraseTechnologyDefinition = {
	id: "sucrase",
	name: "Sucrase",
	website: "https://sucrase.io/",
	description: "A JavaScript compiler that allows developers to use next-generation JavaScript, today.",
	categories: [
		"transpiler",
	],
	rules: [
		{
			id: "sucrase:resourceUrl:explicit:0",
			kind: "resourceUrl",
			pattern: new RegExp("(?:^|[/@-])sucrase(?:[./@-]|$)", "i"),
			confidence: 90,
			description: "Resource URL explicitly references Sucrase.",
		},
	],
} as const satisfies TechnologyDefinition;
