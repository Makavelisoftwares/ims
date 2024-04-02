import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "./logo";
import { CreateOrganisation } from "./create-organisation";
import { Links } from "./links";

export const SideBar = () => {
  return (
    <div className="flex flex-col ">
      <div className="my-1 border-b flex items-center justify-center border-zinc-300/40">
        <Logo />
      </div>
      <div className="flex  flex-col justify-between">
        <ScrollArea className='w-full h-[70vh]'>
          <div>
            <Links/>
          </div>
        </ScrollArea>
        <div>
            <CreateOrganisation/>
        </div>
      </div>
    </div>
  );
};
