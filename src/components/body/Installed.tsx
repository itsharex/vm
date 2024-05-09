import { toast } from "react-toastify";

interface InstalledProps {
  active: string;
  installed: string[];
}

export const Installed = ({ active, installed }: InstalledProps) => {
  const notify = () => {
    const rand = Math.floor(Math.random() * 5);

    switch (rand) {
      case 0:
        toast.success("Success!");
        break;
      case 1:
        toast.error("Error!");
        break;
      case 2:
        toast.warn("Warn!");
        break;
      case 3:
        toast.info("Info!");
        break;
      case 4:
        const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));
        toast.promise(resolveAfter3Sec, {
          pending: "Promise is pending",
          success: "Promise resolved 👌",
          error: "Promise rejected 🤯",
        });
        break;
      default:
        const resolveAfter4Sec = new Promise((_resolve, reject) =>
          setTimeout(reject, 4000),
        );
        toast.promise(resolveAfter4Sec, {
          pending: "Promise is pending",
          success: "Promise resolved 👌",
          error: "Promise rejected 🤯",
        });
        break;
    }
  };

  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="mb-4 text-xl font-black">Installed</div>
      <div className="ml-8 space-y-2 md:m-0">
        {installed.map((i) => (
          <div key={i}>
            {i}
            {active === i ? (
              <span className="ml-2 text-green-400">(Active)</span>
            ) : (
              <button
                className="p-1 ml-2 rounded-md hover:bg-slate-600 bg-slate-900"
                onClick={notify}
              >
                Use
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
