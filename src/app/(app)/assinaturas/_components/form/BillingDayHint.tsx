export default function BillingDayHint({ day }: { day: number }) {
  if (!(day > 0)) return null;

  return (
    <p className="text-xs text-violet-600 font-medium">
      Cobrança todo dia {day} do mês
    </p>
  );
}
