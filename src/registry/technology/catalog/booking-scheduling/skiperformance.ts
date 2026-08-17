import type { TechnologyDefinition } from '@/lib/detection/types';

export const skiperformanceTechnologyDefinition: TechnologyDefinition = {
	id: 'skiperformance',
	name: 'Skiperformance',
	website: 'https://www.skiperformance.com',
	description:
		'Skiperformance is an online platform that provides solutions for selling lift tickets and ski passes, tailored to the needs of the ski industry.',
	icon: 'Skiperformance.svg',
	categories: [
		'booking-scheduling',
	],
	rules: [
		{
			id: 'skiperformance:scriptContent:0',
			kind: 'scriptContent',
			pattern: new RegExp('\\.skiperformance\\.com'),
			description: 'Script content contains a bounded technology signature.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
