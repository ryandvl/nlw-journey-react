import { CheckCircle2Icon, CircleDashedIcon, UserCogIcon } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { Participants } from "../../types/trips";
import { api } from "../../lib/axios";
import { addZeroToSmallNumbers } from "../../lib/util";

interface GuestsProps {
  tripId: string | undefined;
}

export function Guests({ tripId }: GuestsProps) {
  const [participants, setParticipants] = useState<Participants>([]);

  useEffect(() => {
    if (!tripId) return;

    api.get(`/trips/${tripId}/participants`).then(({ data }) => {
      setParticipants(data.participants);
    });
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {participants.map(({ name, email, is_confirmed, id }, index) => (
          <div key={id} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {name ?? `Convidado ${addZeroToSmallNumbers(index)}`}
              </span>
              <span className="block text-sm text-zinc-400 truncate">
                {email}
              </span>
            </div>
            {is_confirmed ? (
              <CheckCircle2Icon size={20} className="text-green-400 shrink-0" />
            ) : (
              <CircleDashedIcon size={20} className="text-zinc-400 shrink-0" />
            )}
          </div>
        ))}
      </div>

      <Button variant="secondary" size="full">
        <UserCogIcon size={20} />
        Gerenciar convidados
      </Button>
    </div>
  );
}
