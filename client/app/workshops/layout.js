import "./../globals.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dialog } from "@/components/ui/dialog";
import NovoWorkshop from "./novoWorkshop";

export default function RootLayout({ children }) {
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
          <Button className="bg-green-300 text-zinc-950" variant="link">Workshops</Button>
      </div>
      <div className="justify-items-center pt-6">
        <Dialog>
          {children}
          <NovoWorkshop />
        </Dialog>
      </div>
    </div>
  );
}
