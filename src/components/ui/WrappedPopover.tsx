import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function WrappedPopover({ title, children }) {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="w-full flex">
          {title}
        </div>
      </PopoverTrigger>
      <PopoverContent>
        {children}
      </PopoverContent>
    </Popover>
  );
}

