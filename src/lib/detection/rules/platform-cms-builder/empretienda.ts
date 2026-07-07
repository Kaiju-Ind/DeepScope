import type { TechnologyDefinition } from '../../types';

export const empretiendaTechnologyDefinition = {
	id: "empretienda",
	name: "Empretienda",
	website: "https://www.empretienda.com",
	description: "Empretienda is a platform that allows you to create and manage your own online store.",
	icon: "Empretienda.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "empretienda:header:0",
			kind: "header",
			key: "set-cookie",
			valuePattern: new RegExp("^EMPRETIENDA_SESSION", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "empretienda:header:1",
			kind: "header",
			key: "set-cookie",
			valuePattern: new RegExp("^empretienda_session", "i"),
			description: "Response header matches a known technology marker.",
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
