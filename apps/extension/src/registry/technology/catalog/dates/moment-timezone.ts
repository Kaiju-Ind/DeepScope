import type { TechnologyDefinition } from '@/lib/detection/types';

export const momentTimezoneTechnologyDefinition: TechnologyDefinition = {
	id: 'moment-timezone',
	name: 'Moment Timezone',
	website: 'https://momentjs.com/timezone/',
	description: 'Moment Timezone adds IANA time zone support to Moment.js and is maintained as a legacy project alongside Moment.js.',
	icon: 'Moment.js.svg',
	categories: [
		'dates',
		'widgets-misc',
	],
	rules: [
		{
			id: 'moment-timezone:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('moment-timezone(?:-data)?(?:\\.min)?\\.js'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		'moment-js',
	],
} as const satisfies TechnologyDefinition;
