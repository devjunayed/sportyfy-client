/* eslint-disable @typescript-eslint/no-explicit-any */
const CustomPagination = ({ current, total, pageSize, onChange }: any) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
      <div>
        Showing <span className="font-semibold">{current}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={current <= 1}
          onClick={() => onChange(current - 1)}
          className="rounded-md border border-slate-300 bg-white px-3 py-1 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={current >= totalPages}
          onClick={() => onChange(current + 1)}
          className="rounded-md border border-slate-300 bg-white px-3 py-1 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
