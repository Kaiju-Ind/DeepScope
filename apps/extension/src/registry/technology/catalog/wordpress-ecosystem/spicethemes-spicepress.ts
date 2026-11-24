import type { TechnologyDefinition } from '@/lib/detection/types';

export const spicethemesSpicepressTechnologyDefinition: TechnologyDefinition = {
	id: 'spicethemes-spicepress',
	name: 'SpiceThemes SpicePress',
	website: 'https://spicethemes.com/spicepress-wordpress-theme',
	description: 'SpicePress is a responsive and fully customizable business template by SpiceThemes.',
	icon: 'SpiceThemes.png',
	categories: [
		'wordpress-ecosystem',
	],
	rules: [
		{
			id: 'spicethemes-spicepress:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\/wp-content\\/themes\\/spicepress(?:-pro)?\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		pricing: [
			'freemium',
			'onetime',
		],
	},
	requires: [
		'wordpress',
	],
} as const satisfies TechnologyDefinition;
