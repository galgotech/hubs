import { defineMessages } from "react-intl";

export const SignInStep = {
  submit: "submit",
  waitForVerification: "waitForVerification",
  complete: "complete"
};

export const SignInMessages = defineMessages({
  pin: {
    id: "sign-in-modal.signin-message.pin",
    defaultMessage: "You'll need to sign in to pin objects."
  },
  unpin: {
    id: "sign-in-modal.signin-message.unpin",
    defaultMessage: "You'll need to sign in to un-pin objects."
  },
  changeScene: {
    id: "sign-in-modal.signin-message.change-scene",
    defaultMessage: "You'll need to sign in to change the scene."
  },
  roomSettings: {
    id: "sign-in-modal.signin-message.room-settings",
    defaultMessage: "You'll need to sign in to change the room's settings."
  },
  closeRoom: {
    id: "sign-in-modal.signin-message.close-room",
    defaultMessage: "You'll need to sign in to close the room."
  },
  muteUser: {
    id: "sign-in-modal.signin-message.mute-user",
    defaultMessage: "You'll need to sign in to mute other users."
  },
  kickUser: {
    id: "sign-in-modal.signin-message.kick-user",
    defaultMessage: "You'll need to sign in to kick other users."
  },
  addOwner: {
    id: "sign-in-modal.signin-message.add-owner",
    defaultMessage: "You'll need to sign in to assign moderators."
  },
  removeOwner: {
    id: "sign-in-modal.signin-message.remove-owner",
    defaultMessage: "You'll need to sign in to assign moderators."
  },
  createAvatar: {
    id: "sign-in-modal.signin-message.create-avatar",
    defaultMessage: "You'll need to sign in to create avatars."
  },
  remixAvatar: {
    id: "sign-in-modal.signin-message.remix-avatar",
    defaultMessage: "You'll need to sign in to remix avatars."
  },
  remixScene: {
    id: "sign-in-modal.signin-message.remix-scene",
    defaultMessage: "You'll need to sign in to remix scenes."
  },
  favoriteRoom: {
    id: "sign-in-modal.signin-message.favorite-room",
    defaultMessage: "You'll need to sign in to add this room to your favorites."
  },
  favoriteRooms: {
    id: "sign-in-modal.signin-message.favorite-rooms",
    defaultMessage: "You'll need to sign in to add favorite rooms."
  },
  tweet: {
    id: "sign-in-modal.signin-message.tweet",
    defaultMessage: "You'll need to sign in to send tweets."
  }
});
