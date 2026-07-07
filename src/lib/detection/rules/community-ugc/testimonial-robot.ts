import type { TechnologyDefinition } from '../../types';

export const testimonialRobotTechnologyDefinition = {
	id: "testimonial-robot",
	name: "Testimonial Robot",
	website: "https://testimonialrobot.com",
	description: "Testimonial Robot is a testimonials and customer review platform.",
	icon: "TestimonialRobot.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "testimonial-robot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.testimonialrobot\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
