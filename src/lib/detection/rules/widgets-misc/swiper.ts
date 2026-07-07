import type { TechnologyDefinition } from '../../types';

export const swiperTechnologyDefinition = {
	id: "swiper",
	name: "Swiper",
	website: "https://swiperjs.com",
	description: "Swiper is a JavaScript library that creates modern touch sliders with hardware-accelerated transitions.",
	icon: "Swiper.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "swiper:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("swiper(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "swiper:dom:1",
			kind: "dom",
			selector: "div[data-swiper-slide-index], [swiper-container]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "swiper:jsGlobal:2",
			kind: "jsGlobal",
			property: "Swiper",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "swiper:dom:3",
			kind: "dom",
			selector: "div[data-swiper-slide-index]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "swiper:dom:4",
			kind: "dom",
			selector: "swiper-container",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "swiper:dom:5",
			kind: "dom",
			selector: "swiper-slide",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "swiper:dom:6",
			kind: "dom",
			selector: "div.swiper-wrapper",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "swiper:dom:7",
			kind: "dom",
			selector: "div.swiper-initialized",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "swiper:dom:8",
			kind: "dom",
			selector: "div.swiper-vertical",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
