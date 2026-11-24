import type { TechnologyDefinition } from '@/lib/detection/types';

export const aimharderTechnologyDefinition: TechnologyDefinition = {
	id: 'aimharder',
	name: 'Aimharder',
	website: 'https://aimharder.com',
	description:
		'Aimharder is a software platform for managing sports facility operations, including scheduling, memberships, bookings, payments, and administrative tasks.',
	icon: 'Aimharder.svg',
	categories: [
		'booking-scheduling',
	],
	rules: [
		{
			id: 'aimharder:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\/\\/aimharder\\.com\\/js\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'aimharder:dom:1',
			kind: 'dom',
			selector: "iframe[src*='.aimharder.com']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
