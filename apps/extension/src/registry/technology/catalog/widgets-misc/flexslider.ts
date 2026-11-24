import type { TechnologyDefinition } from '@/lib/detection/types';

export const flexsliderTechnologyDefinition: TechnologyDefinition = {
	id: 'flexslider',
	name: 'FlexSlider',
	website: 'https://woocommerce.com/flexslider/',
	description: 'FlexSlider is a free jQuery slider plugin.',
	icon: 'FlexSlider.png',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'flexslider:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('jquery\\.flexslider(?:\\.min)?\\.js$'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	implies: [
		'jquery',
	],
} as const satisfies TechnologyDefinition;
