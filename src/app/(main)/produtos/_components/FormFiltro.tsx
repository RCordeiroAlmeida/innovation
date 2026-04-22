"use client";

import Input from "@/app/components/Input";
import { PackageSearch } from "lucide-react";

interface Props {
  filtro: string;
  setFiltro: (value: string) => void;
}

export default function FormFiltro({ filtro, setFiltro }: Props) {
  return (
    <Input
      name="nome"
      placeholder="O que você procura?"
      icon={PackageSearch}
      value={filtro}
      onChange={(e) => setFiltro(e.target.value)}
    />
  );
}