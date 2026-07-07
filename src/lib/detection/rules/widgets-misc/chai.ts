import type { TechnologyDefinition } from '../../types';

export const chaiTechnologyDefinition = {
	id: "chai",
	name: "Chai",
	website: "https://www.chaijs.com",
	description: "Chai is a BDD / TDD assertion library for node and the browser that can be paired with any javascript testing framework.",
	icon: "Chai.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "chai:jsGlobal:0",
			kind: "jsGlobal",
			property: "chai",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chai:jsGlobal:1",
			kind: "jsGlobal",
			property: "chai.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
