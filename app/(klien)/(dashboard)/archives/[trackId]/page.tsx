import { DetailClient } from "./components/detail-client";

import { Metadata, ResolvingMetadata } from "next";
import axios from "axios";

// type Props = {
//   params: { trackId: string };
// };

// let token = "";
// if (typeof window !== "undefined") {
//   token = localStorage.getItem("accessToken") ?? "";
// }
// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const id = params.trackId;

//   // fetch data
//   const resi = await axios.get(
//     `http://koderesi.raventech.my.id/api/admin/waybill/show/${id}`,
//     {
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   console.log(resi.data);
//   return {
//     title: `Detail`,
//   };
//   // return {
//   //   title: `Detail ${resi.data.kode_resi}`,
//   // };
// }

const DetailPage = () => {
  return (
    <div className="sm:px-6 sm:py-8 p-4 gap-6 flex flex-col">
      <DetailClient />
    </div>
  );
};

export default DetailPage;
