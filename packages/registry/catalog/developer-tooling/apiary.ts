import type { TechnologyDefinition } from "../../types.ts";

export const apiaryTechnologyDefinition: TechnologyDefinition = {
	id: 'apiary',
	name: 'Apiary',
	website: 'https://apiary.io',
	description:
		'Oracle Apiary is a hosted API design and documentation platform with API Blueprint and OpenAPI support, interactive documentation, and mock services.',
	icon: 'Apiary.svg',
	categories: [
		'developer-tooling',
	],
	rules: [
		{
			id: 'apiary:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'Apiary',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'apiary:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'apiaryUserModel',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'apiary:meta:2',
			kind: 'meta',
			key: 'author',
			valuePattern: new RegExp('^Apiary$', 'i'),
			description: 'Meta tag matches a known technology marker.',
		},
		{
			id: 'apiary:meta:3',
			kind: 'meta',
			key: 'author',
			valuePattern: new RegExp('^apiary$', 'i'),
			description: 'Meta tag matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'freemium',
		],
	},
} as const satisfies TechnologyDefinition;
