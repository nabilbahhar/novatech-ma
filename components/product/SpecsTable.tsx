interface SpecsTableProps {
  specs: Record<string, string>
}

export function SpecsTable({ specs }: SpecsTableProps) {
  const entries = Object.entries(specs || {})

  if (!entries.length) return null

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F4] overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {entries.map(([key, value], i) => (
            <tr
              key={key}
              className={i % 2 === 0 ? "bg-[#F7F9FC]" : "bg-white"}
            >
              <td className="px-4 py-2.5 font-semibold text-[#0B1F3A] w-1/3 border-r border-[#E2E8F4]">
                {key}
              </td>
              <td className="px-4 py-2.5 text-[#6B7A99] font-mono text-xs">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
