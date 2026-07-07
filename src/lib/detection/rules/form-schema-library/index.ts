import type { TechnologyDefinition } from '../../types';
import { formalizeCssTechnologyDefinition } from './formalize-css';
import { finalFormTechnologyDefinition } from './final-form';
import { formikTechnologyDefinition } from './formik';
import { reactHookFormTechnologyDefinition } from './react-hook-form';
import { valibotTechnologyDefinition } from './valibot';
import { yupTechnologyDefinition } from './yup';
import { zodTechnologyDefinition } from './zod';

export const formSchemaLibraryTechnologyDefinitions = [
	formalizeCssTechnologyDefinition,
	finalFormTechnologyDefinition,
	formikTechnologyDefinition,
	reactHookFormTechnologyDefinition,
	valibotTechnologyDefinition,
	yupTechnologyDefinition,
	zodTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
