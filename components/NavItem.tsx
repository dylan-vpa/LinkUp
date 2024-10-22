import { Tooltip, TooltipTrigger,  TooltipContent} from "./ui/tooltip";
import { Button } from "./ui/button";


export default function NavItem({ icon, label }: { icon: JSX.Element; label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary" size="icon" className="text-black p-4 hover:bg-slate-200">
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>{label}</span>
      </TooltipContent>
    </Tooltip>
  );
}