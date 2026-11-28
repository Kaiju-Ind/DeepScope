import type { TechnologyDefinition } from "../../types.ts";
import { formalizeCssTechnologyDefinition } from "./formalize-css.ts";
import { finalFormTechnologyDefinition } from "./final-form.ts";
import { formikTechnologyDefinition } from "./formik.ts";
import { reactHookFormTechnologyDefinition } from "./react-hook-form.ts";
import { valibotTechnologyDefinition } from "./valibot.ts";
import { yupTechnologyDefinition } from "./yup.ts";
import { zodTechnologyDefinition } from "./zod.ts";

export const formSchemaLibraryTechnologyDefinitions = [
	formalizeCssTechnologyDefinition,
	finalFormTechnologyDefinition,
	formikTechnologyDefinition,
	reactHookFormTechnologyDefinition,
	valibotTechnologyDefinition,
	yupTechnologyDefinition,
	zodTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
