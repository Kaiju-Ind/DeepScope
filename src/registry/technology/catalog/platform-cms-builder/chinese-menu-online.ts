import type { TechnologyDefinition } from '@/lib/detection/types';

export const chineseMenuOnlineTechnologyDefinition: TechnologyDefinition = {
	id: 'chinese-menu-online',
	name: 'Chinese Menu Online',
	website: 'https://www.chinesemenuonline.com',
	description: 'Chinese Menu Online is an online food ordering service.',
	icon: 'Chinese Menu Online.png',
	categories: [
		'platform-cms-builder',
		'booking-scheduling',
	],
	rules: [
		{
			id: 'chinese-menu-online:dom:0',
			kind: 'dom',
			selector: "li > a[href*='chinesemenuonline.com']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'payg',
		],
	},
} as const satisfies TechnologyDefinition;
