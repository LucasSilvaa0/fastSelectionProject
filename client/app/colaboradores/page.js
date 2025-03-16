"use client";

import axiosApi from "@/utils/axiosApi";
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
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";


function getColaboradores() {
    return axiosApi.get("/Colaboradores").then((res) => res.data);
}

function TableDemo() {
    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getColaboradores,
    });

    if (isLoading) return null;

    return (
      <Table>
        <TableCaption><h1 className="text-xl text-green-600"><strong>LISTA DE COLABORADORES</strong></h1></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Data de chegada</TableHead>
            <TableHead>Data de saída</TableHead>
            <TableHead className="text-right ">Workshops</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((colaborador) => (
            <TableRow key={colaborador.id}>
              <TableCell className="font-medium"><strong>{colaborador.nome}</strong></TableCell>
              <TableCell>{colaborador.data_inicial}</TableCell>
              <TableCell>{colaborador.data_final === "0001-01-01" ? <strong>Ainda é colaborador!</strong> : colaborador.data_final}</TableCell>
              <TableCell className="text-right text-decoration-line: underline cursor-pointer">{colaborador.nome}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total de colaboradores</TableCell>
            <TableCell className="text-right">{data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
}

export default function Colaboradores() {
    return (
        <div className="w-11/12 p-8 pb-14 font-[family-name:var(--font-geist-sans)] border-6 border-gray-950 bg-amber-100 rounded-lg grid gap-16">
            <div className="items-center justify-items-center">
                <TableDemo />
            </div>
            <div className="flex gap-8">
                <DialogTrigger asChild>
                    <Button className="text-black text-base w-min cursor-pointer" variant="outline">NOVO COLABORADOR</Button>
                </DialogTrigger>
                <Button className="text-black text-base w-min cursor-pointer" variant="destructive">FIM DE COLABORADOR</Button>
            </div>
        </div>
    );
}