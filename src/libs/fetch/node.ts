import { ResponseType, fetch } from "@tauri-apps/api/http";
import { showNotification } from "../utils";
import { NotificationType } from "../enums";
import { NODE_BASE_URL } from "../constants";
import { NodeVersionListModel } from "../models";

export const fetchNodeVersionList = async (): Promise<NodeVersionListModel[]> => {
  const response = await fetch(`${NODE_BASE_URL}index.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Version Manager",
    },
    responseType: ResponseType.JSON,
  });

  const resJson = await response;

  if (resJson.ok) {
    showNotification({
      msg: "Successfully Fetch the Node Version List✅",
      type: NotificationType.SUCCESS,
    });

    return resJson.data as NodeVersionListModel[];
  } else {
    showNotification({
      msg: "Failed to fetch the Node Version List❌",
      type: NotificationType.ERROR,
    });

    return [];
  }
};
