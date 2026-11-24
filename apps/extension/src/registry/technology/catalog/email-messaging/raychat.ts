import type { TechnologyDefinition } from '@/lib/detection/types';

export const raychatTechnologyDefinition: TechnologyDefinition = {
	id: 'raychat',
	name: 'Raychat',
	website: 'https://raychat.io',
	description: 'Raychat is a free customer messaging platform.',
	icon: 'raychat.png',
	categories: [
		'email-messaging',
	],
	rules: [
		{
			id: 'raychat:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('app\\.raychat\\.io\\/scripts\\/js'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'raychat:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'Raychat',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
