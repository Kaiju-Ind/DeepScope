import type { TechnologyDefinition } from '@/lib/detection/types';

export const apilayerTechnologyDefinition: TechnologyDefinition = {
	id: 'apilayer',
	name: 'APILayer',
	website: 'https://apilayer.com',
	description:
		'APILayer is a hosted API marketplace and unified API hub that provides proprietary and third-party APIs across categories such as geolocation, finance, AI, data processing, and developer tools.',
	icon: 'APILayer.svg',
	categories: [
		'developer-tooling',
	],
	rules: [
		{
			id: 'apilayer:scriptContent:0',
			kind: 'scriptContent',
			pattern: new RegExp('api\\.apilayer\\.com'),
			description: 'Script content contains a bounded technology signature.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
