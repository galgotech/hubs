import "./utils/theme";
import "./utils/configs";

console.log(`Hubs version: ${process.env.BUILD_VERSION || "?"}`);

import "./react-components/styles/global.scss";
import "./assets/stylesheets/scene.scss";

import "aframe";
import "networked-aframe/src/index";
import "./utils/logging";
import { patchWebGLRenderingContext } from "./utils/webgl";
patchWebGLRenderingContext();

import "./components/scene-components";
import "./components/debug";
import "./systems/nav";

import { fetchReticulumAuthenticated, fetchBackendAuthenticated } from "./utils/phoenix-utils";

import ReactDOM from "react-dom";
import React from "react";
import SceneUI from "./react-components/scene-ui";
import { disableiOSZoom } from "./utils/disable-ios-zoom";

import "./systems/scene-systems";
import "./gltf-component-mappings";
import { EnvironmentSystem } from "./systems/environment-system";

import { App } from "./app";

window.APP = new App();

const qs = new URLSearchParams(location.search);

import "./components/event-repeater";

import registerTelemetry from "./telemetry";
import { WrappedIntlProvider } from "./react-components/wrapped-intl-provider";
import { ThemeProvider } from "./react-components/styles/theme";

disableiOSZoom();

function mountUI(scene, props = {}) {
  ReactDOM.render(
    <WrappedIntlProvider>
      <ThemeProvider store={window.APP.store}>
        <SceneUI
          {...{
            scene,
            store: window.APP.store,
            ...props
          }}
        />
      </ThemeProvider>
    </WrappedIntlProvider>,
    document.getElementById("ui-root")
  );
}

const onReady = async () => {
  console.log("Scene is ready");

  const scene = document.querySelector("a-scene");
  window.APP.scene = scene;

  const sceneId = qs.get("scene_id") || document.location.pathname.substring(1).split("/")[1];
  console.log(`Scene ID: ${sceneId}`);

  let uiProps = { sceneId: sceneId };

  mountUI(scene);

  const remountUI = props => {
    uiProps = { ...uiProps, ...props };
    mountUI(scene, uiProps);
  };

  const sceneRoot = document.querySelector("#scene-root");
  const sceneModelEntity = document.createElement("a-entity");
  const gltfEl = document.createElement("a-entity");
  const camera = document.getElementById("camera");

  fetchBackendAuthenticated(process.env.BACKEND_ENDPOINT_PERMISSIONS).then((me) => {
    remountUI({ showCreateRoom: !!me.permissions.create_hub });
  })

  const envSystem = new EnvironmentSystem(scene);

  sceneModelEntity.addEventListener("environment-scene-loaded", () => {
    remountUI({ sceneLoaded: true });
    const previewCamera = gltfEl.object3D.getObjectByName("scene-preview-camera");

    if (previewCamera) {
      console.log("Setting up preview camera");
      camera.object3D.position.copy(previewCamera.position);
      camera.object3D.rotation.copy(previewCamera.rotation);
      camera.object3D.matrixNeedsUpdate = true;
    } else {
      console.warn("No preview camera found");
    }

    camera.setAttribute("scene-preview-camera", "");

    const environmentEl = sceneModelEntity.childNodes[0];
    envSystem.updateEnvironment(environmentEl);
  });

  const res = await fetchReticulumAuthenticated(`/api/v1/scenes/${sceneId}`);
  const sceneInfo = res.scenes[0];

  // Delisted/Removed
  if (!sceneInfo) {
    remountUI({ unavailable: true });
    return;
  }

  if (sceneInfo.allow_promotion) {
    registerTelemetry(`/scene/${sceneId}`, `Hubs Scene: ${sceneInfo.title}`);
  } else {
    registerTelemetry("/scene", "Hubs Non-Promotable Scene Page");
  }

  const modelUrl = sceneInfo.model_url;
  console.log(`Scene Model URL: ${modelUrl}`);

  gltfEl.setAttribute("gltf-model-plus", { src: modelUrl, useCache: false, inflate: true });
  gltfEl.addEventListener("model-loaded", ({ detail: { model } }) =>
    sceneModelEntity.emit("environment-scene-loaded", model)
  );
  sceneModelEntity.appendChild(gltfEl);
  sceneRoot.appendChild(sceneModelEntity);

  const parentScene =
    sceneInfo.parent_scene_id &&
    (await fetchReticulumAuthenticated(`/api/v1/scenes/${sceneInfo.parent_scene_id}`)).scenes[0];

  remountUI({
    sceneName: sceneInfo.name,
    sceneDescription: sceneInfo.description,
    sceneAttributions: sceneInfo.attributions,
    sceneScreenshotURL: sceneInfo.screenshot_url,
    sceneId: sceneInfo.scene_id,
    sceneProjectId: sceneInfo.project_id,
    sceneAllowRemixing: sceneInfo.allow_remixing,
    isOwner: sceneInfo.account_id && sceneInfo.account_id === window.APP.store.credentialsAccountId,
    parentScene: parentScene
  });
};

document.addEventListener("DOMContentLoaded", onReady);
