import type { TechnologyDefinition } from '../../types';

export const vchatTechnologyDefinition = {
	id: "vchat",
	name: "vChat",
	website: "https://vchat.vn",
	description: "vChat is a chat solution in Vietnam.",
	icon: "vChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "vchat:jsGlobal:0",
			kind: "jsGlobal",
			property: "__vnpDefault.url",
			valuePattern: new RegExp("core\\.vchat\\.vn"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
