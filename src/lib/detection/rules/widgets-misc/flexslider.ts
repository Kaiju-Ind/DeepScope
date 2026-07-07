import type { TechnologyDefinition } from '../../types';

export const flexsliderTechnologyDefinition = {
	id: "flexslider",
	name: "FlexSlider",
	website: "https://woocommerce.com/flexslider/",
	description: "FlexSlider is a free jQuery slider plugin.",
	icon: "FlexSlider.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "flexslider:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jquery\\.flexslider(?:\\.min)?\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
