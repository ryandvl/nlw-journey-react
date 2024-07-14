import { useEffect, useState } from "react";

import { CircleCheckIcon } from "lucide-react";

import type { Activities } from "../../types/trips";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { addZeroToSmallNumbers, capitalizeFirstLetter } from "../../lib/util";

interface ActivitiesProps {
  tripId: string | undefined;
}

export function Activities({ tripId }: ActivitiesProps) {
  const [activities, setActivities] = useState<Activities>([]);

  useEffect(() => {
    if (!tripId) return;

    api.get(`/trips/${tripId}/activities`).then(({ data }) => {
      setActivities(data.activities);
    });
  }, [tripId]);

  return (
    <div className="space-y-8">
      {activities.map(({ date, activities }) => (
        <div key={date} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300 font-semibold">
              {addZeroToSmallNumbers(format(date, "d"))}/
              {addZeroToSmallNumbers(format(date, "M"))}
            </span>
            <span className="text-xs text-zinc-500">
              {capitalizeFirstLetter(format(date, "EEEE", { locale: ptBR }))}
            </span>
          </div>
          {activities.length ? (
            <div>
              {activities.map(({ id, title, occurs_at }) => (
                <div key={id} className="space-y-2.5">
                  <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                    <CircleCheckIcon size={20} className="text-lime-300" />
                    <span className="text-zinc-100">{title}</span>
                    <span className="text-zinc-400 text-sm ml-auto">
                      {format(occurs_at, "HH:mm")}m
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">
              Nenhuma atividade cadastrada nessa data.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
