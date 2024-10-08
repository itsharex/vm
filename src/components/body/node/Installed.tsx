import { toolsAtom, searchTermAtom, selectedToolAtom } from "@/store";
import { CheckIcon, TrashIcon } from "@radix-ui/react-icons";
import { useAtomValue } from "jotai";
import { Button } from "@/components/Button";

export const Installed = () => {
  const searchTerm = useAtomValue(searchTermAtom);
  const selectedTool = useAtomValue(selectedToolAtom);
  const tools = useAtomValue(toolsAtom);
  const selectedConfig = tools[selectedTool!];

  return (
    <div className="flex flex-col items-center p-4">
      <div className="p-1 px-2 mb-4 text-xl font-black rounded-md lg:text-4xl text-primary-foreground bg-primary shadow-md">
        Installed
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 ml-8 md:m-0">
        {selectedConfig.installed.length === 0 ? (
          <div
            className="p-4 text-orange-700 bg-orange-100 border-l-4 border-orange-500"
            role="alert"
          >
            <p className="font-bold">No version is installed for {selectedTool}</p>
            <p>Try installing a version from the available list.</p>
          </div>
        ) : (
          selectedConfig.installed
            .filter((v) => v.includes(searchTerm))
            .map((i) => (
              <div
                key={i}
                className="flex items-center justify-center p-1 px-2 rounded-md text-md lg:text-2xl bg-card shadow-md gap-x-2"
              >
                <span className="cursor-text select-text">{i}</span>
                {selectedConfig.active === i ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled
                    content={<CheckIcon className="bg-green-400 size-8" />}
                    tooltip="Active"
                    onClick={() => {}}
                  />
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      content={<CheckIcon className="size-8" />}
                      tooltip={`Use ${i}`}
                      onClick={() => {}}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      content={<TrashIcon className="size-8 text-rose-500" />}
                      tooltip={`Uninstall ${i}`}
                      onClick={() => {}}
                    />
                  </>
                )}
              </div>
            ))
        )}
      </div>
    </div>
  );
};
