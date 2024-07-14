import { FormEvent } from "react";
import { Link2Icon, TagIcon, XIcon } from "lucide-react";

import { Button } from "../../components/button";
import { api } from "../../lib/axios";

interface CreateLinkModalProps {
  tripId: string | undefined;
  closeCreateLinkModal: () => void;
}

export function CreateLinkModal({
  tripId,
  closeCreateLinkModal,
}: CreateLinkModalProps) {
  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!tripId) return;

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });

    closeCreateLinkModal();

    window.location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[540px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>
            <button type="button" onClick={closeCreateLinkModal}>
              <XIcon size={20} className="text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>

        <form onSubmit={createLink} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <TagIcon size={20} className="text-zinc-400" />
            <input
              name="title"
              placeholder="Título do link"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Link2Icon size={20} className="text-zinc-400" />
            <input
              type="url"
              name="url"
              placeholder="URL"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button variant="primary" size="full" type="submit">
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  );
}
