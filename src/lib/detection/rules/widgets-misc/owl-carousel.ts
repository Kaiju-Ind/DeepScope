import type { TechnologyDefinition } from '../../types';

export const owlCarouselTechnologyDefinition = {
	id: "owl-carousel",
	name: "OWL Carousel",
	website: "https://owlcarousel2.github.io/OwlCarousel2/",
	description: "OWL Carousel is an enabled jQuery plugin that lets you create responsive carousel sliders.",
	icon: "OWL Carousel.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "owl-carousel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("owl\\.carousel.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "owl-carousel:html:1",
			kind: "html",
			pattern: new RegExp("<link [^>]*href=\"[^\"]+owl\\.carousel(?:\\.min)?\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "owl-carousel:dom:2",
			kind: "dom",
			selector: "link[href*='owl.carousel.css'], link[href*='owl.carousel.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
