import type { TechnologyDefinition } from '../../types';

export const uremediateTechnologyDefinition = {
	id: "uremediate",
	name: "uRemediate",
	website: "https://www.user1st.com/uremediate/",
	description: "uRemediate provides web accessibility testing tools and accessibility overlays.",
	icon: "User1st.png",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "uremediate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("fecdn\\.user1st\\.info\\/Loader\\/head"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "uremediate:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("fecdn\\.user1st\\.info\\/loader\\/head"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
