import type { TechnologyDefinition } from "../../types.ts";

export const reactRouterTechnologyDefinition: TechnologyDefinition = {
	id: 'react-router',
	name: 'React Router',
	website: 'https://reactrouter.com',
	description:
		'React Router is a multi-strategy router for React with declarative, data, and framework modes.',
	icon: 'React Router.svg',
	categories: [
		'ui-library',
	],
	rules: [
		{
			id: 'react-router:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('(?:\\/react-router(@|\\/)([\\d.]+)(?:\\/[a-z]+)?)?\\/react-router(?:\\.min)?\\.js'),
			version: {
				source: 'match',
				group: 2,
			},
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'react-router:jsGlobal:1',
			kind: 'jsGlobal',
			property: '__reactRouterVersion',
			valuePattern: new RegExp('^([\\d\\.]+)$'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	versioning: {
		scheme: 'semver',
	},
	metadata: {
		oss: true,
	},
	implies: [
		'react',
	],
} as const satisfies TechnologyDefinition;
