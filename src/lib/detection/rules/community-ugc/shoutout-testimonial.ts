import type { TechnologyDefinition } from '../../types';

export const shoutoutTestimonialTechnologyDefinition = {
	id: "shoutout-testimonial",
	name: "Shoutout Testimonial",
	website: "https://shoutout.io",
	description: "Shoutout Testimonial is a platform that enables businesses to collect customer testimonials and display them on their websites through a simple and streamlined process.",
	icon: "ShoutoutTestimonial.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "shoutout-testimonial:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.shoutout\\.so"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
