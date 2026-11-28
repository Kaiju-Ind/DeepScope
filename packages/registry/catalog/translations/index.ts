import type { TechnologyDefinition } from "../../types.ts";
import { bablicTechnologyDefinition } from "./bablic.ts";
import { conveythisTechnologyDefinition } from "./conveythis.ts";
import { conwordTechnologyDefinition } from "./conword.ts";
import { crowdinTechnologyDefinition } from "./crowdin.ts";
import { easylingTechnologyDefinition } from "./easyling.ts";
import { langifyTechnologyDefinition } from "./langify.ts";
import { linguiseTechnologyDefinition } from "./linguise.ts";
import { pluglinTechnologyDefinition } from "./pluglin.ts";
import { smartlingTechnologyDefinition } from "./smartling.ts";
import { transcyTechnologyDefinition } from "./transcy.ts";
import { weblateTechnologyDefinition } from "./weblate.ts";
import { weglotTechnologyDefinition } from "./weglot.ts";
import { i18nextTechnologyDefinition } from "./i18next.ts";
import { reactI18nextTechnologyDefinition } from "./react-i18next.ts";
import { reactIntlFormatjsTechnologyDefinition } from "./react-intl-formatjs.ts";
import { vueI18nTechnologyDefinition } from "./vue-i18n.ts";

export const translationsTechnologyDefinitions = [
	bablicTechnologyDefinition,
	conveythisTechnologyDefinition,
	conwordTechnologyDefinition,
	crowdinTechnologyDefinition,
	easylingTechnologyDefinition,
	langifyTechnologyDefinition,
	linguiseTechnologyDefinition,
	pluglinTechnologyDefinition,
	smartlingTechnologyDefinition,
	transcyTechnologyDefinition,
	weblateTechnologyDefinition,
	weglotTechnologyDefinition,
	i18nextTechnologyDefinition,
	reactI18nextTechnologyDefinition,
	reactIntlFormatjsTechnologyDefinition,
	vueI18nTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
