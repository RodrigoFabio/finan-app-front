const fmt = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

export default function InstallmentEstimate({ value }: { value: number }) {
  if (!(value > 0)) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
      <p className="text-sm text-amber-800 font-medium">
        Valor estimado por parcela:{' '}
        <span className="text-lg font-semibold text-amber-900">{fmt(value)}</span>
      </p>
    </div>
  );
}
