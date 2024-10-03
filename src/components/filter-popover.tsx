import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Circle, PlusCircle, Check } from "lucide-react";

interface FilterPopoverProps {
  // Add props here
  title: string;
  optionsFiltered: string[];
  handleSelectOption: (value: string) => void;
  optionsList: {
    value: string;
    label: string;
    color?: string;
  }[];
}

export function FilterPopover({
  title,
  optionsFiltered,
  handleSelectOption,
  optionsList,
}: FilterPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-dashed text-gray-600">
          <PlusCircle className="mr-2 h-5 w-5" />
          {title}
          {optionsFiltered.length > 0 && (
            <div className="flex items-center">
              <div className="shrink-0  w-[1px] mx-2 h-4"></div>
              <small className="font-bold text-primary">{optionsFiltered.length}</small>
            </div>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="flex flex-col gap-2 p-2 items-start">
          {optionsList.map((option, index) => {
            const isSelected = optionsFiltered.includes(option.value);

            return (
              <Button
                variant={"outline"}
                className="w-full flex items-start justify-start shadow-none"
                onClick={() => handleSelectOption(option.value)}
                key={index}
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                    isSelected ? "bg-blue-500 text-primary-foreground" : ""
                  )}
                >
                  {isSelected && <Check className="h-3 w-3" />}
                </div>
                {option.color && <Circle className={cn("mr-2 h-4 w-4")} color={option.color} />}
                <span className="text-xs">{option.label}</span>
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
