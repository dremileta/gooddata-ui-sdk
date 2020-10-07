// (C) 2019-2020 GoodData Corporation
import {
    IAttributeDisplayFormMetadataObject,
    IAttributeMetadataObject,
    IElementsQueryFactory,
    IWorkspaceAttributesService,
} from "@gooddata/sdk-backend-spi";
import { GdcMetadata } from "@gooddata/api-model-bear";
import { UriRef, ObjRef, uriRef } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../../types/auth";
import { objRefToUri, objRefsToUris } from "../../../utils/api";
import { BearWorkspaceElements } from "./elements";
import {
    newAttributeDisplayFormMetadataObject,
    newAttributeMetadataObject,
} from "@gooddata/sdk-backend-base";

export class BearWorkspaceAttributes implements IWorkspaceAttributesService {
    constructor(private readonly authCall: BearAuthenticatedCallGuard, public readonly workspace: string) {}

    public elements = (): IElementsQueryFactory => {
        return new BearWorkspaceElements(this.authCall, this.workspace);
    };

    public getAttributeDisplayForm = async (ref: ObjRef): Promise<IAttributeDisplayFormMetadataObject> => {
        const displayFormUri = await objRefToUri(ref, this.workspace, this.authCall);
        const wrappedDisplayForm: GdcMetadata.IWrappedAttributeDisplayForm = await this.authCall((sdk) =>
            sdk.md.getObjectDetails(displayFormUri),
        );
        const displayFormDetails = wrappedDisplayForm.attributeDisplayForm;

        const attrRef = uriRef(displayFormDetails.content.formOf);

        return newAttributeDisplayFormMetadataObject(ref, (df) =>
            df
                .attribute(attrRef)
                .title(displayFormDetails.meta.title)
                .description(displayFormDetails.meta.summary)
                .id(displayFormDetails.meta.identifier)
                .uri(displayFormDetails.meta.uri),
        );
    };

    public getAttribute = async (ref: ObjRef): Promise<IAttributeMetadataObject> => {
        const attributeUri = await objRefToUri(ref, this.workspace, this.authCall);
        const wrappedAttribute: GdcMetadata.IWrappedAttribute = await this.authCall((sdk) =>
            sdk.md.getObjectDetails(attributeUri),
        );
        const { title, uri, isProduction, identifier, summary } = wrappedAttribute.attribute.meta;
        const { displayForms } = wrappedAttribute.attribute.content;
        const attributeDisplayForms = displayForms.map((displayForm) =>
            newAttributeDisplayFormMetadataObject(uriRef(displayForm.meta.uri), (df) =>
                df
                    .attribute(ref)
                    .title(displayForm.meta.title)
                    .description(displayForm.meta.summary)
                    .id(displayForm.meta.identifier)
                    .uri(displayForm.meta.uri)
                    .displayFormType(displayForm.content.type),
            ),
        );

        return newAttributeMetadataObject(ref, (a) =>
            a
                .title(title)
                .uri(uri)
                .production(Boolean(isProduction))
                .id(identifier)
                .description(summary)
                .displayForms(attributeDisplayForms),
        );
    };

    public async getCommonAttributes(attributesRefs: ObjRef[]): Promise<ObjRef[]> {
        const inputAttributeUris = await objRefsToUris(attributesRefs, this.workspace, this.authCall);
        const returnAttributeUris = await this.authCall((sdk) =>
            sdk.ldm.getCommonAttributes(this.workspace, inputAttributeUris),
        );
        return returnAttributeUris.map(uriRef);
    }

    public async getCommonAttributesBatch(attributesRefsBatch: ObjRef[][]): Promise<ObjRef[][]> {
        return await Promise.all(
            attributesRefsBatch.map(async (attributeRefs) => {
                return this.getCommonAttributes(attributeRefs);
            }),
        );
    }

    public getAttributeDisplayForms = async (
        refs: ObjRef[],
    ): Promise<IAttributeDisplayFormMetadataObject[]> => {
        const displayFormUris = await objRefsToUris(refs, this.workspace, this.authCall);
        const wrappedAttributeDisplayForms = await this.authCall((sdk) =>
            sdk.md.getObjects<GdcMetadata.IWrappedAttributeDisplayForm>(this.workspace, displayFormUris),
        );
        return wrappedAttributeDisplayForms.map(
            (
                wrappedDisplayForm: GdcMetadata.IWrappedAttributeDisplayForm,
            ): IAttributeDisplayFormMetadataObject => {
                const displayFormDetails = wrappedDisplayForm.attributeDisplayForm;
                return this.buildAttributeDisplayForm(displayFormDetails);
            },
        );
    };

    public getAttributes = async (refs: ObjRef[]): Promise<IAttributeMetadataObject[]> => {
        const attributeUris = await objRefsToUris(refs, this.workspace, this.authCall);
        const wrappedAttributes = await this.authCall((sdk) =>
            sdk.md.getObjects<GdcMetadata.IWrappedAttribute>(this.workspace, attributeUris),
        );

        return wrappedAttributes.map(
            (wrappedAttribute: GdcMetadata.IWrappedAttribute): IAttributeMetadataObject => {
                const {
                    meta: { title, uri, isProduction, identifier, summary },
                    content: { displayForms },
                } = wrappedAttribute.attribute;
                const ref = uriRef(uri);
                const attributeDisplayForms = displayForms.map((displayForm) =>
                    this.buildAttributeDisplayForm(displayForm),
                );

                return newAttributeMetadataObject(ref, (attribute) =>
                    attribute
                        .title(title)
                        .uri(uri)
                        .production(Boolean(isProduction))
                        .id(identifier)
                        .description(summary)
                        .displayForms(attributeDisplayForms),
                );
            },
        );
    };

    private buildAttributeDisplayForm = (
        displayFormDetails: GdcMetadata.IAttributeDisplayForm,
    ): IAttributeDisplayFormMetadataObject => {
        const {
            meta: { title, summary, identifier, uri },
            content: { formOf, default: defaultDisplayForm },
        } = displayFormDetails;
        const ref: UriRef = uriRef(uri);
        const isDefaultDf = !!(defaultDisplayForm === 1);
        return newAttributeDisplayFormMetadataObject(ref, (df) =>
            df
                .attribute(uriRef(formOf))
                .title(title)
                .description(summary)
                .isDefault(isDefaultDf)
                .id(identifier)
                .uri(uri),
        );
    };
}
