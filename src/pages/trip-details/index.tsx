import { useState } from "react";

import { PlusIcon } from "lucide-react";

import { Activities } from "./activities";
import { CreateActivityModal } from "./create-activity-modal";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Guests } from "./guests";
import { ImportantLinks } from "./important-links";
import { useParams } from "react-router-dom";

export function TripDetailsPage() {
  const { tripId } = useParams();

  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader tripId={tripId} />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Cadastrar atividade</h2>
            <button
              onClick={openCreateActivityModal}
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
            >
              <PlusIcon size={20} />
              Cadastrar atividade
            </button>
          </div>

          <Activities tripId={tripId} />
        </div>
        <div className="w-80 space-y-6 ">
          <ImportantLinks />

          <div className="w-full h-px bg-zinc-800" />

          <Guests tripId={tripId} />
          <div></div>
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          tripId={tripId}
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  );
}
