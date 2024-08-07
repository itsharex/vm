import { ImCheckboxChecked } from "react-icons/im";
import { RiUninstallFill } from "react-icons/ri";

interface InstalledProps {
  active: string;
  installed: string[];
}

export const Installed = ({ active, installed }: InstalledProps) => {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="p-1 px-2 mb-4 text-xl font-black rounded-md shadow-xl lg:text-4xl backdrop-blur-sm bg-slate-400/30">
        Installed
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 ml-8 md:m-0">
        {installed.map((i) => (
          <div
            key={i}
            className="flex items-center justify-center p-1 px-2 text-sm rounded-md shadow-xl lg:text-2xl backdrop-blur-sm bg-slate-400/30"
          >
            {i}
            {active === i ? (
              <button className="ml-2 text-green-400 size-6" title="Active">
                <ImCheckboxChecked />
              </button>
            ) : (
              <>
                <button
                  className="ml-2 cursor-pointer bg-slate-500 hover:text-slate-600 text-slate-900 size-6"
                  title="Use"
                >
                  <ImCheckboxChecked />
                </button>
                <button
                  className="ml-2 cursor-pointer hover:text-rose-900 text-rose-500 size-6"
                  title="Uninstall"
                >
                  <RiUninstallFill />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
