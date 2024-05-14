import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function WrappedPopover() {
  return (
    <Popover>
      <PopoverTrigger>Añadir lista</PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col items-center justify-start">
          <form action="post" className="bg-plum-100 rounded-lg min-h-48 w-full flex flex-col justify-center items-center gap-6 divide-y divide-gray-200 p-2 text-plum-900 font-semibold">
            <label htmlFor="list-title">Título de lista</label>
            <input type="text" name="list-title" id="list-title" className="shadow-inner p-2 rounded-lg bg-white focus:bg-gray-100 outline-none focus:ring-1 focus:ring-plum-900"/>
            <input type="submit" value="Añadir" className="bg-plum-800 rounded-lg p-2 text-white cursor-pointer hover:bg-plum-900" />
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}

