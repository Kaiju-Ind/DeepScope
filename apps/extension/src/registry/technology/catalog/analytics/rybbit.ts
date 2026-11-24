import type { TechnologyDefinition } from '@/lib/detection/types';

/** Detects Rybbit from its hosted tracker, browser API, and source identity. */
export const rybbitTechnologyDefinition: TechnologyDefinition = {
	id: 'rybbit',
	name: 'Rybbit',
	website: 'https://rybbit.com',
	description: 'Rybbit is an open-source web and product analytics platform with hosted and self-hosted deployments.',
	icon: 'Rybbit.svg',
	categories: ['analytics'],
	rules: [
		{
			id: 'rybbit:scriptSrc:hosted-tracker',
			kind: 'scriptSrc',
			pattern: /^https:\/\/app\.rybbit\.io\/api\/script\.js(?:[?#].*)?$/i,
			confidence: 100,
			description: 'Script source is the canonical hosted Rybbit tracking script.',
		},
		{
			id: 'rybbit:jsGlobal:api',
			kind: 'jsGlobal',
			property: 'rybbit',
			confidence: 100,
			description: 'Page exposes the Rybbit browser tracking API.',
		},
		{
			id: 'rybbit:scriptContent:web-sdk',
			kind: 'scriptContent',
			pattern: /["']@rybbit\/js["']/,
			confidence: 95,
			description: 'Bundled script references the official Rybbit Web SDK package.',
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: ['freemium', 'payg', 'recurring'],
	},
} as const satisfies TechnologyDefinition;
