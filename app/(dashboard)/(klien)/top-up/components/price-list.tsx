"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardPrice } from "./card-price";

export const PriceList = () => {
  return (
    <Tabs
      defaultValue="sekali"
      className="w-full space-y-8 md:space-y-16 pb-8 px-2 sm:px-4 md:px-8"
    >
      <TabsList>
        <TabsTrigger value="sekali">Sekali Beli</TabsTrigger>
        <TabsTrigger value="bulanan">Bulanan</TabsTrigger>
        <TabsTrigger value="tahunan">Tahunan</TabsTrigger>
      </TabsList>
      <TabsContent value="sekali">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <CardPrice
            kredit={300}
            perKredit={350}
            price={35000}
            keterangan="normal"
          />
          <CardPrice
            kredit={500}
            perKredit={330}
            price={165000}
            keterangan="normal"
            isPopular
          />
          <CardPrice
            kredit={1000}
            perKredit={300}
            price={300000}
            keterangan="normal"
          />
          <CardPrice
            kredit={5000}
            perKredit={290}
            price={1450000}
            keterangan="normal"
          />
        </div>
      </TabsContent>
      <TabsContent value="bulanan">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <CardPrice
            kredit={300}
            perKredit={350}
            price={11550}
            keterangan="lebih hemat 5%"
          />
          <CardPrice
            kredit={500}
            perKredit={330}
            price={54450}
            keterangan="lebih hemat 5%"
            isPopular
          />
          <CardPrice
            kredit={1000}
            perKredit={300}
            price={990000}
            keterangan="lebih hemat 5%"
          />
          <CardPrice
            kredit={5000}
            perKredit={290}
            price={478500}
            keterangan="lebih hemat 5%"
          />
        </div>
      </TabsContent>
      <TabsContent value="tahunan">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <CardPrice
            kredit={300}
            perKredit={350}
            price={110880}
            keterangan="lebih hemat 20%"
          />
          <CardPrice
            kredit={500}
            perKredit={330}
            price={522720}
            keterangan="lebih hemat 20%"
            isPopular
          />
          <CardPrice
            kredit={1000}
            perKredit={300}
            price={950400}
            keterangan="lebih hemat 20%"
          />
          <CardPrice
            kredit={5000}
            perKredit={290}
            price={4593600}
            keterangan="lebih hemat 20%"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};
