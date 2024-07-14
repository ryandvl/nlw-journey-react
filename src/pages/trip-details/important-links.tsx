import { useEffect, useState } from "react";

import { Link2Icon, PlusIcon, XIcon } from "lucide-react";

import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { Links } from "../../types/trips";

interface ImportantLinksProps {
  tripId: string | undefined;
  openCreateLinkModal: () => void;
}

export function ImportantLinks({
  tripId,
  openCreateLinkModal,
}: ImportantLinksProps) {
  const [links, setLinks] = useState<Links>([]);

  useEffect(() => {
    if (!tripId) return;

    api.get(`/trips/${tripId}/links`).then(({ data }) => {
      setLinks(data.links);
    });
  }, [tripId]);

  async function deleteTripLink(linkId: string) {
    await api.delete(`/trips/${tripId}/links/${linkId}`);
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {links.map(({ id, title, url }) => (
          <div
            key={id}
            className="flex items-center justify-between gap-4 group/link"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{title}</span>
              <a
                href={url}
                className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
              >
                {url}
              </a>
            </div>

            <div className="visible group-hover/link:invisible group-hover/link:fixed">
              <Link2Icon size={20} className="text-zinc-400 shrink-0" />
            </div>
            <button
              onClick={() => deleteTripLink(id)}
              className="invisible fixed group-hover/link:visible group-hover/link:relative"
            >
              <XIcon size={24} className="text-red-500 shrink-0" />
            </button>
          </div>
        ))}
      </div>

      <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
        <PlusIcon size={20} />
        Cadastrar novo link
      </Button>
    </div>
  );
}
