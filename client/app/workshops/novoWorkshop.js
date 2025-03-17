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
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getColaboradoresAtuais } from "./../colaboradores/fimColaborador";

export default function NovoWorkshop() {
    const [selecionados, setSelecionados] = useState([]);

    async function novasPresencas(id_workshop) {
        for (let i = 0; i < selecionados.length; i++) {
            const body = {
                id_colaborador: selecionados[i],
                id_workshop
            }
            await axiosApi.post("/Presencas", body);
        }
    }

    async function cadastrarWorkshop() {
        const nome = document.querySelector("input[id='nome']").value;
        const descricao = document.querySelector("input[id='descricao']").value;
        const data_realizacao = document.querySelector("input[id='data']").value;

        const body = {
            nome,
            descricao,
            data_realizacao
        }

        const response = await axiosApi.post("/Workshops", body);

        await novasPresencas(response.data.id);

        window.location.reload();
    }

    function TabelaParticipantes() {
        const { data, isLoading } = useQuery({
            queryKey: ["Colaboradores"],
            queryFn: getColaboradoresAtuais,
        });
    
        if (isLoading || data === undefined) return null;
    
        console.log(data);
    
        const handleSelecionar = (id) => {
        if (selecionados.includes(id)) {
            setSelecionados(selecionados.filter((item) => item !== id));
        } else {
            setSelecionados([...selecionados, id]);
        }
        };
    
        const handleSelecionarTodos = () => {
        if (selecionados.length === data.length) {
            setSelecionados([]);
        } else {
            setSelecionados(data.map((item) => item.id));
        }
        };
    
        return (
            <table>
                <thead>
                <tr>
                    <th>
                    <input
                        type="checkbox"
                        checked={selecionados.length === data.length}
                        onChange={handleSelecionarTodos}
                    />
                    </th>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                    <td>
                        <input
                        type="checkbox"
                        checked={selecionados.includes(item.id)}
                        onChange={() => handleSelecionar(item.id)}
                        />
                    </td>
                    <td>{item.id}</td>
                    <td>{item.nome}</td>
                    <td>{item.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }

    return (
        <DialogContent>
            <DialogTitle>CADASTRO DE WORKSHOP</DialogTitle>
            <DialogDescription>
                <Label>
                    Nome:
                    <input id="nome" type="text" className="border-2 text-xl w-80"/>
                </Label>
                <br/>
                <Label>
                    Descrição:
                    <input id="descricao" type="text" className="border-2 w-90"/>
                </Label>
                <br/>
                <Label>
                    Data de realização:
                    <input id="data" type="date" />
                </Label>
                <br/>
                <Label>
                    Participantes:
                </Label>
                <TabelaParticipantes />
            </DialogDescription>
            <div className="flex gap-6">
                <Button className="text-black text-base w-min cursor-pointer" variant="outline" type="button" onClick={cadastrarWorkshop}>Cadastrar</Button>
            </div>
        </DialogContent>
    )
}