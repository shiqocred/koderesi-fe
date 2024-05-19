import { useOrigin } from "@/hooks/use-origin";
import { DetailClient } from "./components/detail-client";

import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { trackId: string };
};

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const id = params.trackId;

//   // fetch data
//   const resi = await fetch(`https://koderesi.vercel.app/api/resi/${id}`).then(
//     (res) => res.json()
//   );

//   return {
//     title: `Detail ${resi.kode_resi}`,
//   };
// }

const DetailPage = () => {
  return (
    <div className="p-4 sm:px-6 sm:py-8 gap-4 md:gap-6 flex flex-col">
      <DetailClient />
    </div>
  );
};

export default DetailPage;
