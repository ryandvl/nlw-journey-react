import { FormEvent, useState } from "react";
import { MapPinIcon, XIcon } from "lucide-react";

import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { DateRange, DayPicker } from "react-day-picker";

interface EditTripModalProps {
  tripId: string | undefined;
  closeEditTripModal: () => void;
}

export function EditTripModal({
  tripId,
  closeEditTripModal,
}: EditTripModalProps) {
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  async function editTripModal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!tripId) return;
    if (!eventStartAndEndDates) return;

    const data = new FormData(event.currentTarget);

    const destination = data.get("destination")?.toString();
    const [starts_at, ends_at] = [
      eventStartAndEndDates.from,
      eventStartAndEndDates.to,
    ];

    if (!starts_at || !ends_at) return;

    await api.put(`/trips/${tripId}`, {
      destination,
      starts_at,
      ends_at,
    });

    closeEditTripModal();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[540px] h-[540px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Alterar local/data</h2>
            <button type="button" onClick={closeEditTripModal}>
              <XIcon size={20} className="text-zinc-400" />
            </button>
          </div>
        </div>

        <form onSubmit={editTripModal} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <MapPinIcon size={20} className="text-zinc-400" />
            <input
              type="text"
              name="destination"
              placeholder="Para onde você vai?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-80 flex-1 px-4 border border-zinc-800 rounded-lg flex items-center justify-center gap-2">
            <DayPicker
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
            />
          </div>

          <Button variant="primary" size="full" type="submit">
            Salvar alterações
          </Button>
        </form>
      </div>
    </div>
  );
}
