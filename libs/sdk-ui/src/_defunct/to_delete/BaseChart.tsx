// (C) 2007-2018 GoodData Corporation
import * as React from "react";
import noop = require("lodash/noop");

import { Visualization } from "../../highcharts";

import { IntlWrapper } from "../../base/translations/IntlWrapper";
import { ChartType } from "../../base/constants/visualizationTypes";
import {
    IntlTranslationsProvider,
    ITranslationsComponentProps,
} from "../../base/translations/TranslationsProvider";
import { IDataSourceProviderInjectedProps } from "./DataSourceProvider";
import { fixEmptyHeaderItems } from "../../charts/_base/fixEmptyHeaderItems";
import {
    ICommonVisualizationProps,
    visualizationLoadingHOC,
    ILoadingInjectedProps,
    commonDefaultProps,
} from "./VisualizationLoadingHOC";
import { ChartPropTypes, Requireable } from "../../proptypes/Chart";
import { BaseVisualization } from "./BaseVisualization";
import { OnLegendReady } from "../../base/interfaces/Events";
import { getValidColorPalette } from "../../base/helpers/color";
import { IChartConfig } from "../../base/interfaces/Config";
export { Requireable };

export interface ICommonChartProps extends ICommonVisualizationProps {
    config?: IChartConfig;
    height?: number;
    environment?: string;
}

export type IChartProps = ICommonChartProps & IDataSourceProviderInjectedProps;

export interface IBaseChartProps extends IChartProps {
    type: ChartType;
    visualizationComponent?: React.ComponentClass<any>; // for testing
    onLegendReady?: OnLegendReady;
}

export class StatelessBaseChart extends BaseVisualization<IBaseChartProps & ILoadingInjectedProps, {}> {
    public static defaultProps: Partial<IBaseChartProps & ILoadingInjectedProps> = {
        ...commonDefaultProps,
        onDataTooLarge: noop,
        onLegendReady: noop,
        config: {},
        visualizationComponent: Visualization,
    };

    public static propTypes = ChartPropTypes;

    public renderVisualization(): JSX.Element {
        const { afterRender, height, locale, config, type, execution, onDataTooLarge, pushData } = this.props;

        const colorPalette = getValidColorPalette(config);

        const fullConfig = { ...config, type, colorPalette };

        return (
            <IntlWrapper locale={locale}>
                <IntlTranslationsProvider>
                    {(translationProps: ITranslationsComponentProps) => {
                        const fixedExecutionResult = fixEmptyHeaderItems(
                            execution.executionResult,
                            translationProps.emptyHeaderString,
                        );

                        return (
                            <this.props.visualizationComponent
                                executionRequest={{
                                    afm: this.props.dataSource.getAfm(),
                                    resultSpec: this.props.resultSpec,
                                }}
                                executionResponse={execution.executionResponse}
                                executionResult={fixedExecutionResult}
                                height={height}
                                config={fullConfig}
                                afterRender={afterRender}
                                onDataTooLarge={onDataTooLarge}
                                onNegativeValues={this.props.onNegativeValues}
                                drillableItems={this.props.drillableItems}
                                onFiredDrillEvent={this.props.onFiredDrillEvent}
                                onLegendReady={this.props.onLegendReady}
                                numericSymbols={translationProps.numericSymbols}
                                locale={locale}
                                pushData={pushData}
                            />
                        );
                    }}
                </IntlTranslationsProvider>
            </IntlWrapper>
        );
    }
}

export const BaseChart = visualizationLoadingHOC(StatelessBaseChart);
