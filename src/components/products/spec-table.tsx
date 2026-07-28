// src/components/products/spec-table.tsx
//
// Renders a product's `specs` Json field as a clean key/value list. Works for
// any product category — a forklift's specs (Lift Capacity, Engine) and a
// valve's specs (Pressure Rating, Material) both render the same way, since
// neither is a fixed column.
export interface SpecTableProps {
  specs: Record<string, string>;
}

function SpecTable({ specs }: SpecTableProps) {
  const entries = Object.entries(specs);
  if (entries.length === 0) return null;

  return (
    <dl className="divide-y divide-border rounded-lg border border-border">
      {entries.map(([label, value]) => (
        <div
          key={label}
          className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
        >
          <dt className="text-sm font-medium text-ink-muted">{label}</dt>
          <dd className="text-sm text-ink sm:text-right">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export { SpecTable };
