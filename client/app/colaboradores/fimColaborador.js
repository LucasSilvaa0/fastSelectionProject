"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { DialogDescription, DialogContent, DialogTitle, DialogClose } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query"
import axiosApi from "@/utils/axiosApi"

async function getColaboradoresAtuais() {
    const dia = new Date().toISOString().split("T")[0];
    
    return await axiosApi.get(`/Colaboradores/atuais/${dia}`).then((res) => res.data);
}

async function removerColaborador(id) {
    await axiosApi.delete(`/Colaboradores/${id}`);
    window.location.reload();
}

export default function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["ColaboradoresAtuais"],
    queryFn: getColaboradoresAtuais,
  })

  if (isLoading) return null;

  console.log(data);

  return (
    <DialogContent>
        <DialogTitle>Remova um colaborador</DialogTitle>
        <DialogDescription>
            <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                aria-expanded={open}
                className="w-[200px] justify-between"
                >
                {value
                    ? data.find((colaborador) => colaborador.nome === value)?.nome
                    : "Select framework..."}
                <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                    {data.map((colaborador) => (
                        <CommandItem
                        key={colaborador.nome}
                        value={colaborador.nome}
                        onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                        }}
                        >
                        {colaborador.nome}
                        <Check
                            className={cn(
                            "ml-auto",
                            value === colaborador.nome ? "opacity-100" : "opacity-0"
                            )}
                        />
                        </CommandItem>
                    ))}
                    </CommandGroup>
                </CommandList>
                </Command>
            </PopoverContent>
            </Popover>
        </DialogDescription>
        <DialogClose asChild>
            <Button className="text-black text-base w-min cursor-pointer" variant="outline" type="button" onClick={() => removerColaborador(data.find((colaborador) => colaborador.nome === value)?.id)}>
                Remover
            </Button>
        </DialogClose>
    </DialogContent>
  )
}
