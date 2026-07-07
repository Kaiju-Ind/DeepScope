import type { TechnologyDefinition } from '../../types';

export const jboardTechnologyDefinition = {
	id: "jboard",
	name: "JBoard",
	website: "https://jboard.io",
	description: "JBoard is a platform for creating and managing job boards with no coding required, enabling users to post, organize, and maintain job listings.",
	icon: "JBoard.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "jboard:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.jboard\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jboard:jsGlobal:1",
			kind: "jsGlobal",
			property: "$JBoardAPI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jboard:jsGlobal:2",
			kind: "jsGlobal",
			property: "$jBoard.adminUserToken",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
