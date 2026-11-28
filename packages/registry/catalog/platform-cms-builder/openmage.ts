import type { TechnologyDefinition } from "../../types.ts";

/** OpenMage LTS is modeled for lineage even when the current detector has no dedicated rule. */
export const openMageTechnologyDefinition: TechnologyDefinition = {
	id: 'openmage',
	name: 'OpenMage LTS',
	website: 'https://www.openmage.org',
	description: 'OpenMage LTS is a community-maintained fork of Magento 1 that continues the Magento 1 code lineage.',
	categories: ['platform-cms-builder'],
	rules: [],
	versioning: { scheme: 'numeric-dotted' },
	metadata: { oss: true },
} as const satisfies TechnologyDefinition;
