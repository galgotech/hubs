import React from "react";
import { RoomLayout } from "../layout/RoomLayout";
import { ReactComponent as CameraIcon } from "../icons/Camera.svg";
import { ReactComponent as AvatarIcon } from "../icons/Avatar.svg";
import { ReactComponent as SceneIcon } from "../icons/Scene.svg";
import { ReactComponent as StarOutlineIcon } from "../icons/StarOutline.svg";
import { ReactComponent as SettingsIcon } from "../icons/Settings.svg";
import { ReactComponent as HomeIcon } from "../icons/Home.svg";
import { CompactMoreMenuButton, MoreMenuContextProvider, MoreMenuPopoverButton } from "./MoreMenuPopover";

export default {
  title: "Room/MoreMenuPopover",
  parameters: {
    layout: "fullscreen"
  }
};

const menu = [
  {
    id: "user",
    label: "You",
    items: [
      { id: "user-profile", label: "Change Name & Avatar", icon: AvatarIcon },
      { id: "favorite-room", label: "Favorite Room", icon: StarOutlineIcon },
      { id: "preferences", label: "Preferences", icon: SettingsIcon }
    ]
  },
  {
    id: "room",
    label: "Room",
    items: [
      { id: "change-scene", label: "Change Scene", icon: SceneIcon },
      { id: "camera-mode", label: "Enter Camera Mode", icon: CameraIcon }
    ]
  },
];

export const Base = () => (
  <MoreMenuContextProvider initiallyVisible={true}>
    <RoomLayout viewport={<CompactMoreMenuButton />} toolbarRight={<MoreMenuPopoverButton menu={menu} />} />
  </MoreMenuContextProvider>
);
