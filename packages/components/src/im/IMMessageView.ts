import { IMMessage } from "@nip/dbus-im";
import {
  IMMessageViewData,
  IMMessageView as IMMessageViewBase,
  IMViewService,
} from "@nip/dbus-im-view";

export class IMMessageView implements IMMessageViewBase {
  private vueInstance: any;

  private imViewService: IMViewService;

  constructor(vueInstance: any, imViewService: IMViewService) {
    this.vueInstance = vueInstance;
    this.imViewService = imViewService;
  }

  addUserMessage(data: IMMessageViewData) {
    let render = this.imViewService.userMessageRenderer(
      data.message.contentType
    );

    if (!render) {
      render = {
        contentType: data.message.contentType,
        service: "service.im.view",
        operation: "createUnknownContentRenderer",
      };
    }

    this.vueInstance.renderList.push({
      type: "user",
      layout: data.layout,
      service: render.service,
      operation: render.operation,
      message: data.message,
    });
  }

  addSystemMessage(data: IMMessageViewData) {
    let render = this.imViewService.systemMessageRenderer(
      data.message.contentType
    );

    if (!render) {
      render = {
        contentType: data.message.contentType,
        service: "service.im.view",
        operation: "createSystemContentRenderer",
      };
    }

    this.vueInstance.renderList.push({
      type: "system",
      layout: "center",
      service: render.service,
      operation: render.operation,
      message: data.message,
    });
  }

  onLoadingMore(): any {}
}
