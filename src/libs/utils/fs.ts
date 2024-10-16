import { FileSysRes, CONFIG_FOLDER_NAME } from "@/libs";
import {
  mkdir,
  exists,
  readDir,
  readTextFile,
  remove,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import { ask } from "@tauri-apps/plugin-dialog";
import { basename } from "@tauri-apps/api/path";
import { dataDir } from "@tauri-apps/api/path";

export const dataDirPath = async () => {
  return (await dataDir()) + "/" + CONFIG_FOLDER_NAME;
};

export const readFile = async (filePath: string): Promise<string> => {
  const fileExist = await exists(filePath);
  if (!fileExist) {
    return FileSysRes.ERROR;
  }

  const contents = await readTextFile(filePath);
  return contents;
};

export const writeFile = async (
  folderPath: string,
  fileName: string,
  content: string,
): Promise<string> => {
  const folderExist = await exists(folderPath);
  if (!folderExist) {
    await createFolder(folderPath);
  }
  await writeTextFile(folderPath + "/" + fileName, content);
  return FileSysRes.OK;
};

export const deleteFile = async (filePath: string): Promise<string> => {
  const fileName = await basename(filePath);

  const confirmed = await ask(
    `Are you sure you want to delete '${fileName}'?\nThis action cannot be reverted.`,
    {
      title: `Are you sure you want to delete '${fileName}'?`,
      kind: "warning",
    },
  );

  if (!confirmed) return FileSysRes.CANCEL;
  await remove(filePath);
  return FileSysRes.OK;
};

export const createFolder = async (folderPath: string): Promise<string> => {
  await mkdir(folderPath, { recursive: true });
  return FileSysRes.OK;
};

export const deleteFolder = async (dirPath: string): Promise<string> => {
  // const folderName = await basename(dirPath);

  // const confirmed = await ask(
  //   `Are you sure you want to delete folder name '${folderName}'?\nThis action cannot be reverted.`,
  //   {
  //     title: `Are you sure you want to delete folder name '${folderName}'?`,
  //     type: "warning",
  //   },
  // );

  // if (!confirmed) return FileSysRes.CANCEL;
  await remove(dirPath, { recursive: true });
  return FileSysRes.OK;
};

export const readDirectory = async (folderPath: string): Promise<any[]> => {
  const fileTree = await readDir(folderPath);
  const customSort = (a: any, b: any) => {
    if (a.children && !b.children) return -1;
    if (!a.children && b.children) return 1;
    return a.name.localeCompare(b.name);
  };

  const sortFileTree = (tree: any) => {
    tree.forEach((node: any) => {
      if (node.children) {
        node.children = sortFileTree(node.children);
      }
    });
    return tree.sort(customSort);
  };
  const sortedFileTree = sortFileTree(fileTree);

  return sortedFileTree;
};
