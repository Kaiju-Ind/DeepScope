import type { TechnologyDefinition } from "../../types.ts";
import { datatablesTechnologyDefinition } from "./datatables.ts";
import { handsontableTechnologyDefinition } from "./handsontable.ts";
import { tabulatorTechnologyDefinition } from "./tabulator.ts";
import { agGridTechnologyDefinition } from "./ag-grid.ts";
import { reactTableLegacyTechnologyDefinition } from "./react-table-legacy.ts";
import { reactVirtualizedTechnologyDefinition } from "./react-virtualized.ts";
import { reactVirtuosoTechnologyDefinition } from "./react-virtuoso.ts";
import { reactWindowTechnologyDefinition } from "./react-window.ts";
import { tanstackTableTechnologyDefinition } from "./tanstack-table.ts";
import { tanstackVirtualTechnologyDefinition } from "./tanstack-virtual.ts";

export const tableLibraryTechnologyDefinitions = [
	datatablesTechnologyDefinition,
	handsontableTechnologyDefinition,
	tabulatorTechnologyDefinition,
	agGridTechnologyDefinition,
	reactTableLegacyTechnologyDefinition,
	reactVirtualizedTechnologyDefinition,
	reactVirtuosoTechnologyDefinition,
	reactWindowTechnologyDefinition,
	tanstackTableTechnologyDefinition,
	tanstackVirtualTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
