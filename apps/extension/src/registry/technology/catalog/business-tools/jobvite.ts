import type { TechnologyDefinition } from '@/lib/detection/types';

export const jobviteTechnologyDefinition: TechnologyDefinition = {
	id: 'jobvite',
	name: 'Jobvite',
	website: 'https://www.jobvite.com',
	description: 'Jobvite is an applicant tracking software and recruiting platform.',
	icon: 'Jobvite.png',
	categories: [
		'business-tools',
	],
	rules: [
		{
			id: 'jobvite:dom:0',
			kind: 'dom',
			selector: "a[href*='.jobvite.com/']",
			description: 'DOM selector matches a known technology marker.',
		},
		{
			id: 'jobvite:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'Jobvite',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'high',
			'payg',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
