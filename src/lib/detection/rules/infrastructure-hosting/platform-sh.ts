import type { TechnologyDefinition } from '../../types';

export const platformShTechnologyDefinition = {
	id: "platform-sh",
	name: "Platform.sh",
	website: "https://platform.sh",
	icon: "platformsh.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [],
} as const satisfies TechnologyDefinition;
