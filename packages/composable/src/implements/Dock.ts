import {
  Dock as DockBase,
  DockTab as DockTabBase,
  DockConfig,
  DockTabConfig,
} from "../../../core/src/interfaces";

export class Dock implements DockBase {
  config: DockConfig;

  constructor(config: DockConfig) {
    this.config = config;
  }

  setVisible(visible: boolean) {
    this.config.visible = visible;
  }

  setTagVisible(tab: DockTabConfig, visible: boolean) {
    const target = this.config?.tabs.find(
      (t: DockTabConfig) => t.id === tab.id
    );

    target.visible = visible;
  }

  setDockCollapsed(dock: DockConfig, collapsed: boolean) {
    const dom: HTMLElement = document.querySelector(`#${dock.id}`);

    this.config.collapsed = collapsed;
    const visible = !collapsed;

    if (dock.tabs === undefined) {
      this.config.visible = visible;
    } else {
      this.config.tabs.forEach((t) => t.active && (t.visible = visible));
    }

    const width = dock.collapsed ? "0" : "320px";
    dom.style.width = width;
  }
}

export class DockTab implements DockTabBase {
  config: DockTabConfig;

  constructor(config: DockTabConfig) {
    this.config = config;
  }
}
