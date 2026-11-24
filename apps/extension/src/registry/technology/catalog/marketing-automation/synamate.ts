import type { TechnologyDefinition } from '@/lib/detection/types';

export const synamateTechnologyDefinition: TechnologyDefinition = {
	id: 'synamate',
	name: 'Synamate',
	website: 'https://synamate.com',
	description: 'Synamate is an AI-powered platform for marketing automation and lead management.',
	icon: 'Synamate.svg',
	categories: [
		'marketing-automation',
	],
	rules: [
		{
			id: 'synamate:scriptContent:0',
			kind: 'scriptContent',
			pattern: new RegExp('app\\.synamate\\.com'),
			description: 'Script content contains a bounded technology signature.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
