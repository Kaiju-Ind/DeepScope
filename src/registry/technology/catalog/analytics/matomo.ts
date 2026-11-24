import type { TechnologyDefinition } from '@/lib/detection/types';

export const matomoTechnologyDefinition: TechnologyDefinition = {
	id: 'matomo',
	name: 'Matomo',
	website: 'https://matomo.org/',
	description: 'Matomo is an open-source web analytics platform available for self-hosted and cloud deployments.',
	icon: 'Matomo.svg',
	categories: [
		'analytics',
	],
	rules: [
		{
			id: 'matomo:scriptContent:modern:0',
			kind: 'scriptContent',
			pattern: new RegExp('matomo not loaded yet, waiting for it to be loaded'),
			confidence: 65,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'matomo:resourceUrl:modern:1',
			kind: 'resourceUrl',
			pattern: new RegExp('cdn\\.matomo\\.cloud'),
			confidence: 75,
			description: 'Resource filename or URL matches a modern tooling marker.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
