import type { TechnologyDefinition } from './types';
import { generatedTechnologyDefinitions, technologyDefinitionsByCategory } from './rules/index';

export { SOURCE_LIMITS } from './source-limits';

export const technologyDefinitions = generatedTechnologyDefinitions satisfies TechnologyDefinition[];
export const technologiesByCategory = technologyDefinitionsByCategory;
