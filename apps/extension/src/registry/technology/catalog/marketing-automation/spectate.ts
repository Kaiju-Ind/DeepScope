import type { TechnologyDefinition } from '@/lib/detection/types';

export const spectateTechnologyDefinition: TechnologyDefinition = {
	id: 'spectate',
	name: 'Spectate',
	website: 'https://spectate.com',
	description:
		'Spectate is an inbound marketing software platform that integrates multiple inbound and outbound channels to strengthen online marketing presence.',
	icon: 'Spectate.svg',
	categories: [
		'marketing-automation',
	],
	rules: [
		{
			id: 'spectate:scriptContent:0',
			kind: 'scriptContent',
			pattern: new RegExp('cdn\\.spectate\\.com'),
			description: 'Script content contains a bounded technology signature.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
