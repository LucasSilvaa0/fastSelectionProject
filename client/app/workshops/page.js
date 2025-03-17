"use client";

import { useQuery } from "@tanstack/react-query";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axiosApi from "@/utils/axiosApi";
import { useState } from 'react';	
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import DetalhesWorkshop from "./detalhesWorkshop";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";

async function getWorkshop() {
  return await axiosApi.get("/Workshops/").then((res) => res.data);
}

export default function Workshops() {
  const { data, isLoading } = useQuery({
    queryKey: ["Workshops"],
    queryFn: getWorkshop,
  });

  function TabelaWorkshops() {
    const [detalhes, setDetalhes] = useState(0);

    if (isLoading || data === undefined) return null;

    if (!Array.isArray(data)) {
      return <div>Dados inválidos</div>;
    }

    return (
      <Table>
        <TableCaption><h1 className="text-xl text-green-600"><strong>LISTA DE WORKSHOPS</strong></h1></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Data de realização</TableHead>
            <TableHead className="text-right pr-12">Detalhes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Drawer>
            {data.map((workshop) => (
              <TableRow key={workshop.id}>
                <TableCell className="font-medium"><strong>{workshop.nome}</strong></TableCell>
                <TableCell>{workshop.data_realizacao}</TableCell>
                
                <TableCell className="text-right">
                  <DrawerTrigger asChild>
                    <Button className="text-decoration-line: underline cursor-pointer" onClick={() => setDetalhes(workshop.id)}>
                      DETALHES
                    </Button>
                  </DrawerTrigger>
                </TableCell>
              </TableRow>
            ))}

            {detalhes !== 0 && <DetalhesWorkshop dados={data} id={detalhes} />}
          </Drawer>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total de Workshop</TableCell>
            <TableCell className="text-right">{data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }

  return (
    <div className="w-11/12 p-8 pb-14 font-[family-name:var(--font-geist-sans)] border-6 border-gray-950 bg-amber-100 rounded-lg grid gap-16">
        <div className="items-center justify-items-center">
          <TabelaWorkshops />
        </div>
        <div className="flex gap-8">
            <DialogTrigger asChild>
                <Button className="text-black text-base w-min cursor-pointer" variant="outline">REGISTRAR WORKSHOP</Button>
            </DialogTrigger>
        </div>
    </div>
  )
}
