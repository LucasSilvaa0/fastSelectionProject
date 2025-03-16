"use client";

import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import axiosApi from "@/utils/axiosApi";

async function cadasrtarColaborador() {
    const nome = document.querySelector("input[type='text']").value;
    const data = document.querySelector("input[type='date']").value;

    const body = {
        nome: nome,
        data_inicial: data
    }

    await axiosApi.post("/Colaboradores", body);
    window.location.reload();
}

export default function NovoColaborador() {
    return (
        <DialogContent>
            <DialogTitle>Novo Colaborador</DialogTitle>
            <DialogDescription>
                <Label>
                    Nome:
                    <input type="text" className="border-2"/>
                </Label>
                <Label>
                    Data de chegada:
                    <input type="date" />
                </Label>
            </DialogDescription>
            <div className="flex gap-6">
                <DialogClose asChild>
                    <Button type="button" className="cursor-pointer" variant="secondary">
                        Fechar
                    </Button>
                </DialogClose>
                <Button className="text-black text-base w-min cursor-pointer" variant="outline" type="button" onClick={cadasrtarColaborador}>Cadastrar</Button>
            </div>
        </DialogContent>
    )
}