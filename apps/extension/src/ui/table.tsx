import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "../utils/cn.ts";

type TableProps = ComponentProps<"table">;

/** Place a native table inside the shared outer element, keeping table props on the table itself. */
const Table = (props: TableProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div data-slot="table-container" class="z-table-container">
      <table data-slot="table" class={cn("z-table", local.class)} {...others} />
    </div>
  );
};

type TableHeaderProps = ComponentProps<"thead">;

/** Apply header-section styling while preserving native thead semantics. */
const TableHeader = (props: TableHeaderProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return <thead data-slot="table-header" class={cn("z-table-header", local.class)} {...others} />;
};

type TableBodyProps = ComponentProps<"tbody">;

/** Apply body-section styling while leaving row creation and identity with the caller. */
const TableBody = (props: TableBodyProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return <tbody data-slot="table-body" class={cn("z-table-body", local.class)} {...others} />;
};

type TableFooterProps = ComponentProps<"tfoot">;

/** Style the native footer section without computing totals or adding rows. */
const TableFooter = (props: TableFooterProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return <tfoot data-slot="table-footer" class={cn("z-table-footer", local.class)} {...others} />;
};

type TableRowProps = ComponentProps<"tr">;

/** Style a native row and forward selection, events and accessibility attributes supplied by the caller. */
const TableRow = (props: TableRowProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return <tr data-slot="table-row" class={cn("z-table-row", local.class)} {...others} />;
};

type TableHeadProps = ComponentProps<"th">;

/** Style a header cell while leaving scope, spans and column meaning explicit at the call site. */
const TableHead = (props: TableHeadProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return <th data-slot="table-head" class={cn("z-table-head", local.class)} {...others} />;
};

type TableCellProps = ComponentProps<"td">;

/** Style a data cell while preserving the caller's content and span attributes. */
const TableCell = (props: TableCellProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return <td data-slot="table-cell" class={cn("z-table-cell", local.class)} {...others} />;
};

type TableCaptionProps = ComponentProps<"caption">;

/** Attach descriptive text through native caption semantics without duplicating the caller's table label. */
const TableCaption = (props: TableCaptionProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <caption data-slot="table-caption" class={cn("z-table-caption", local.class)} {...others} />
  );
};

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
