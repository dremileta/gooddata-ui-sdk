// (C) 2019-2020 GoodData Corporation
import { GdcScheduledMail } from "@gooddata/api-model-bear";
import {
    IScheduledMail,
    IScheduledMailDefinition,
    NotSupported,
    ScheduledMailAttachment,
} from "@gooddata/sdk-backend-spi";
import { uriRef } from "@gooddata/sdk-model";

export const convertScheduledMailAttachment = (
    scheduledMailAttachment: GdcScheduledMail.ScheduledMailAttachment,
): ScheduledMailAttachment => {
    if (GdcScheduledMail.isKpiDashboardAttachment(scheduledMailAttachment)) {
        const {
            kpiDashboardAttachment: { format, uri, filterContext },
        } = scheduledMailAttachment;

        return {
            dashboard: uriRef(uri),
            format,
            filterContext: filterContext ? uriRef(filterContext) : undefined,
        };
    } else if (GdcScheduledMail.isVisualizationWidgetAttachment(scheduledMailAttachment)) {
        const {
            visualizationWidgetAttachment: { uri, dashboardUri, formats, filterContext, exportOptions },
        } = scheduledMailAttachment;
        const convertedExportOptions = exportOptions
            ? {
                  includeFilters: exportOptions.includeFilterContext === "yes",
                  mergeHeaders: exportOptions.mergeHeaders === "yes",
              }
            : {};
        return {
            widgetDashboard: uriRef(dashboardUri),
            widget: uriRef(uri),
            formats,
            filterContext: filterContext ? uriRef(filterContext) : undefined,
            exportOptions: convertedExportOptions,
        };
    } else {
        throw new NotSupported(
            "Cannot convert attachment - only dashboard and widget attachments are currently supported.",
        );
    }
};

export const convertScheduledMail = (
    scheduledMail: GdcScheduledMail.IWrappedScheduledMail,
): IScheduledMail | IScheduledMailDefinition => {
    const {
        scheduledMail: {
            content: { attachments, body, subject, to, when, bcc, lastSuccessfull, unsubscribed },
            meta: { uri, identifier, title, summary, unlisted },
        },
    } = scheduledMail;

    return {
        title,
        description: summary!,
        ...(uri
            ? {
                  ref: uriRef(uri),
                  identifier,
                  uri,
              }
            : {}),
        body,
        subject,
        to,
        when: {
            startDate: when.startDate,
            endDate: when.endDate,
            timeZone: when.timeZone,
            recurrence: when.recurrency,
        },
        bcc,
        lastSuccessful: lastSuccessfull,
        unsubscribed,
        attachments: attachments.map(convertScheduledMailAttachment),
        unlisted: !!unlisted,
    };
};
