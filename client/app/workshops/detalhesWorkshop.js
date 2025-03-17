"use client"

import * as React from "react"
import { Fullscreen, Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "@/utils/axiosApi";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { getColaboradoresAtuais } from "../colaboradores/fimColaborador"

async function getPresencas() {
    return await axiosApi.get("/Presencas/").then((res) => res.data);
}

export default function DetalhesWorkshop({ dados, id }) {
    const workshop = dados.find((workshop) => workshop.id === id)    

    console.log(workshop);

    const response = useQuery({
        queryKey: ["Presencas"],
        queryFn: getPresencas,
    });
    
    const colaboradoresAtuais = useQuery({
        queryKey: ["ColaboradoresAtuais"],
        queryFn: getColaboradoresAtuais,
    });

    if (response.isLoading || response.data === undefined || colaboradoresAtuais.isLoading || colaboradoresAtuais.data === undefined) return null;

    const participantes = response.data.find((presenca) => presenca.workshop_id === id).colaboradores;

    function GraficoParticipantesWorkshop() {
        const data = [
            { name: 'Colaboradores participantes', value: participantes.length },
            { name: 'Colaboradores não participantes', value: colaboradoresAtuais.data.length - participantes.length },
        ];
        const COLORS = ['#0088FE', '#00C49F'];

        return (
            <PieChart width={800} height={350}>
                <Pie
                    data={data}
                    cx={400}
                    cy={175}
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[data.indexOf(entry) % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        );
    }

  return (
      <DrawerContent className="bg-white w-screengap-60">
        <div className="items-center justify-items-center gap-26">
            <div className="grid grid-cols-2">
                <DrawerHeader className="border-2 border-gray-200 p-4 w-full">
                    <DrawerTitle>{workshop.nome}</DrawerTitle>
                    <DrawerDescription>{workshop.descricao}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0 border-2 border-gray-200 w-full h-min">
                    <h1><strong>PARTICIPANTES:</strong></h1>
                    <div className="columns-3xs">
                        {participantes.map((participante) => (
                            <div key={participante.id}>{participante.nome}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="border-2 border-gray-800 p-4 mt-10 mb-20 min-w-auto ml-40 mr-40 items-center justify-items-center h-min">
                <h2>Gráfico:</h2>
                <GraficoParticipantesWorkshop />
            </div>
        </div>
      </DrawerContent>
  )
}
