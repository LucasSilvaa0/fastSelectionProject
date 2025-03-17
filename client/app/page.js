import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="h-22 w-full bg-purple-500 text-white grid grid-cols-3 items-center justify-items-center">
          <Link href="https://www.fastsolucoes.com.br/pt/">
            <div className="flex items-center justify-center gap-4 bg-purple-600 border-2 rounded-md">
              <h1 className="text-2xl text-black p-2 font-sans">FAST<br/>SOLUÇÕES</h1>
              <Image
                  className="h-20 w-20 p-2"
                  src="/FAST-LOGO.svg"
                  alt="Next.js logo"
                  width={20}
                  height={20}
                  priority
              />
            </div>
          </Link>
          <Button className="bg-white text-zinc-950" variant="link"><Link href="/colaboradores">Colaboradores</Link></Button>
          <Button className="bg-white text-zinc-950" variant="link"><Link href="/workshops">Workshops</Link></Button>
      </div>
    </div>
  );
}
