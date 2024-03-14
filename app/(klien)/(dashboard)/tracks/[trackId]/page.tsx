import { useOrigin } from "@/hooks/use-origin";
import { DetailClient } from "./components/detail-client";

import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { trackId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.trackId;

  // fetch data
  const resi = await fetch(`https://koderesi.vercel.app/api/resi/${id}`).then(
    (res) => res.json()
  );

  return {
    title: `Detail ${resi.kode_resi}`,
  };
}

const DetailPage = () => {
  return (
    <div className="px-6 py-8 gap-6 flex flex-col">
      <DetailClient />
    </div>
  );
};

export default DetailPage;
