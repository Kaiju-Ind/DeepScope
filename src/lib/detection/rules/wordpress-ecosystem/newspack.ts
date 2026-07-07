import type { TechnologyDefinition } from '../../types';

export const newspackTechnologyDefinition = {
	id: "newspack",
	name: "Newspack",
	website: "https://github.com/Automattic/newspack-plugin",
	description: "Newspack is an open-source publishing platform built on WordPress for small to medium sized news organizations. It is an “opinionated” platform that stakes out clear, best-practice positions on technology, design, and business practice for news publishers.",
	icon: "NewspackLogo.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "newspack:dom:0",
			kind: "dom",
			selector: "a.imprint[href*='newspack.pub']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
