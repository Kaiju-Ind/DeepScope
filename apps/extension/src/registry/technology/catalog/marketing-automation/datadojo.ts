import type { TechnologyDefinition } from '@/lib/detection/types';

export const datadojoTechnologyDefinition: TechnologyDefinition = {
	id: 'datadojo',
	name: 'DataDojo',
	website: 'https://datadojo.ai',
	description:
		'DataDojo is an AI platform that converts high-intent and anonymous website visitors into marketable leads, helping businesses increase sales.',
	icon: 'DataDojo.svg',
	categories: [
		'marketing-automation',
	],
	rules: [
		{
			id: 'datadojo:scriptContent:0',
			kind: 'scriptContent',
			pattern: new RegExp('pixel\\.datadojocdp\\.com'),
			description: 'Script content contains a bounded technology signature.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
