import { useEffect, useState } from "react";

import { CalendarIcon, MapPinIcon, Settings2Icon } from "lucide-react";

import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { formatDate } from "../../lib/util";
import { Trip } from "../../types/trips";

interface DestinationAndDateHeaderProps {
  tripId: string | undefined;
}

export function DestinationAndDateHeader({
  tripId,
}: DestinationAndDateHeaderProps) {
  const [trip, setTrip] = useState<Trip | undefined>();

  useEffect(() => {
    if (!tripId) return;

    api.get(`/trips/${tripId}`).then(({ data }) => {
      setTrip(data.trip);
    });
  }, [tripId]);

  const displayedDate = trip
    ? `${formatDate(trip.starts_at)} até ${formatDate(trip.ends_at)}`
    : "Carregando...";

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex justify-between">
      <div className="flex items-center gap-2">
        <MapPinIcon size={20} className="text-zinc-400" />
        <span className="text-zinc-100">
          {trip?.destination ?? "Carregando..."}
        </span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <CalendarIcon size={20} className="text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button variant="secondary">
          Alterar local/data
          <Settings2Icon size={20} />
        </Button>
      </div>
    </div>
  );
}
