import type { TechnologyDefinition } from '../../types';

export const reservaInkTechnologyDefinition = {
	id: "reserva-ink",
	name: "Reserva INK",
	website: "https://reserva.ink",
	description: "Reserva INK is a platform that enables users to sell personalized t-shirts without the need for stock, offering nationwide delivery and a professional online store for easy management of orders and sales.",
	icon: "ReservaINK.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "reserva-ink:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.reserva\\.ink"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
