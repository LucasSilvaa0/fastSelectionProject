"use client";

import axiosApi from "@/utils/axiosApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from 'react';

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

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ComboboxDemo from "./fimColaborador";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";


async function getColaboradores() {
  return await axiosApi.get("/Colaboradores").then((res) => res.data);
}

async function getColaboradoresAntigos() {
  return await axiosApi.get("/Colaboradores/passados").then((res) => res.data.length);
}

async function getPresencas(id) {
  const response = await axiosApi.get(`/Presencas/${id}`).then((res) => res.data);

  return response;
}

async function getQuantidadeWorkshops() {
  return await axiosApi.get("/Workshops").then((res) => res.data.length);
}

export default function Colaboradores() {
    const [colaboradorGrafico, setColaboradorGrafico] = useState(0);
  
    function TabelaColaboradores() {
      const { data, isLoading } = useQuery({
          queryKey: ["Colaboradores"],
          queryFn: getColaboradores,
      });
  
      const quantidadeAntigos = useQuery({
        queryKey: ["ColaboradoresAntigos"],
        queryFn: getColaboradoresAntigos,
      });
  
      if (isLoading || quantidadeAntigos.isLoading) return null;
  
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

                {colaboradorGrafico === colaborador.id ? (
                  <TableCell className="text-right text-decoration-line: underline cursor-pointer" onClick={() => setColaboradorGrafico(0)}>FECHAR</TableCell>
                ) : (
                  <TableCell className="text-right text-decoration-line: underline cursor-pointer" onClick={() => setColaboradorGrafico(colaborador.id)}>VERIFICAR</TableCell>
                )}
                
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total de colaboradores atuais</TableCell>
              <TableCell className="text-right">{data.length - quantidadeAntigos.data}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total de colaboradores</TableCell>
              <TableCell className="text-right">{data.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )
    }
  

    function Grafico() {

        const { data, isLoading } = useQuery({
            queryKey: ["Presencas"],
            queryFn: () => getPresencas(colaboradorGrafico),
        });

        const workshops = useQuery({
            queryKey: ["Workshops"],
            queryFn: getQuantidadeWorkshops
        });
      
        if (colaboradorGrafico === 0) return null;

        if (isLoading === 0 || data === undefined || workshops === undefined || workshops.isLoading) return null;

        ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

        const graph = {
          labels: ["Participou", "Não participou", "Não era colaborador"],
          datasets: [
            {
              label: 'Presença do colaborador nos workshops',
              data: [data?.participacoes, data?.total, workshops?.data - data?.total],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 3,
            },
          ],
        };
      
        // Opções do gráfico
        const options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: "Presença nos workshops",
            },
          },
        };

        return (
        <div className="w-full h-120 items-center justify-items-center">
          <Bar data={graph} options={options} />
        </div>
        )
    }


    return (
        <div className="w-11/12 p-8 pb-14 font-[family-name:var(--font-geist-sans)] border-6 border-gray-950 bg-amber-100 rounded-lg grid gap-16">
            <div className="items-center justify-items-center">
                <TabelaColaboradores />
            </div>
            <div className="flex gap-8">
                <DialogTrigger asChild>
                    <Button className="text-black text-base w-min cursor-pointer" variant="outline">NOVO COLABORADOR</Button>
                </DialogTrigger>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="text-black text-base w-min cursor-pointer" variant="destructive">FIM DE UM COLABORADOR</Button>
                  </DialogTrigger>

                  <ComboboxDemo />
                </Dialog>
            </div>
            <div className="items-center justify-items-center h-min">
              <Grafico />
            </div>
        </div>
    );
}