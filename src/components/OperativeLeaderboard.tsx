import React, { useMemo, useState } from 'react';
import { Operative } from '../types';
import { formatCOP } from '../utils/format';

export interface WeeklyOperativeBar {
  operativeId: string;
  name: string;
  qty: number;
  totalPay: number;
}

interface OperativeLeaderboardProps {
  operatives: Operative[];
  weeklyBars: WeeklyOperativeBar[];
  onSelectOperative: (operative: Operative) => void;
}

type LeaderboardPeriod = 'historico' | 'semana';

const MEDALS = ['🥇', '🥈', '🥉'];

export const OperativeLeaderboard: React.FC<OperativeLeaderboardProps> = ({
  operatives,
  weeklyBars,
  onSelectOperative
}) => {
  const [period, setPeriod] = useState<LeaderboardPeriod>('historico');

  const rows = useMemo(() => {
    if (period === 'semana') {
      return weeklyBars.slice(0, 5).map((b) => ({
        operativeId: b.operativeId,
        name: b.name,
        qty: b.qty,
        totalPay: b.totalPay,
        avatar: operatives.find((o) => o.id === b.operativeId)?.avatar
      }));
    }
    return [...operatives]
      .sort((a, b) => b.piecesCompleted - a.piecesCompleted)
      .slice(0, 5)
      .map((o) => ({
        operativeId: o.id,
        name: o.name,
        qty: o.piecesCompleted,
        totalPay: o.totalEarnings,
        avatar: o.avatar
      }));
  }, [period, weeklyBars, operatives]);

  const maxQty = rows.length > 0 ? rows[0].qty : 0;

  return (
    <div className="bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[#151c27]">Top Operarios</h3>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#494552] mt-0.5">
            RANKING POR PIEZAS
          </p>
        </div>
        <div className="flex items-center gap-1 bg-[#fdf1f6] p-1 rounded-lg border border-[#cac4d4]">
          {([
            { id: 'historico', label: 'Histórico' },
            { id: 'semana', label: 'Esta Semana' }
          ] as { id: LeaderboardPeriod; label: string }[]).map((opt) => (
            <button
              key={opt.id}
              onClick={() => setPeriod(opt.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                period === opt.id ? 'bg-[#ca2164] text-white shadow-sm' : 'text-[#494552] hover:bg-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="text-xs text-[#7a7583] py-6 text-center">
          {period === 'semana'
            ? 'Aún no hay registros de producción esta semana.'
            : 'Aún no hay operarios con producción registrada.'}
        </p>
      ) : (
        <div className="space-y-2.5">
          {rows.map((row, idx) => {
            const barPct = maxQty > 0 ? (row.qty / maxQty) * 100 : 0;
            const operative = operatives.find((o) => o.id === row.operativeId);
            return (
              <div
                key={row.operativeId}
                onClick={() => operative && onSelectOperative(operative)}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <span className="w-5 text-center text-sm font-bold text-[#494552] shrink-0">
                  {idx < 3 ? MEDALS[idx] : idx + 1}
                </span>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#cac4d4] shrink-0 bg-[#fdf1f6]">
                  {row.avatar && (
                    <img src={row.avatar} alt={row.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-xs font-bold text-[#151c27] truncate group-hover:text-[#a43073]">
                      {row.name}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#ca2164] shrink-0">
                      {row.qty.toLocaleString('es-CO')} pzas
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#fdf1f6] rounded-full mt-1 overflow-hidden">
                    <div
                      style={{ width: `${Math.max(barPct, 3)}%` }}
                      className="h-full bg-[#ca2164] rounded-full transition-all duration-300"
                    />
                  </div>
                  <span className="text-[10px] text-[#7a7583] mt-0.5 block">{formatCOP(row.totalPay)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
