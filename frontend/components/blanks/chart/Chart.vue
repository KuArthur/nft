<template>
    <div class="chart">
        <div class="chart__menu">
            <div class="chart__currency-filter">
                <currency-filter @change-chart="changeCurrency($event)" />
            </div>
            <div class="chart__select">
                <span class="chart__select-number">L1</span>
                <div class="chart__select-wrapper">
                    <select-chart
                        chart="green"
                        defaultOption="Volume"
                        @select-value="changeValue($event, 'green')"
                    />
                </div>
            </div>
            <div class="chart__select">
                <span class="chart__select-number">L2</span>
                <div class="chart__select-wrapper">
                    <select-chart
                        chart="black"
                        defaultOption="Floor"
                        @select-value="changeValue($event, 'black')"
                    />
                </div>
            </div>
            <div class="chart__date-filter">
                <date-filter type="chart" />
            </div>
        </div>
        <div class="chart__chart">
            <div class="chart__logo" />
            <div v-if="!dataChart || dataChart === {}" class="chart__loader">
                l o a d i n g . . .
            </div>
            <client-only v-else>
                <apexchart
                    ref="chart"
                    width="100%"
                    height="100%"
                    type="area"
                    :options="options"
                    :series="series"
                ></apexchart>
            </client-only>
        </div>
    </div>
</template>

<script>
import DateFilter from '@/components/blanks/dateFilter/DateFilter.vue';
import SelectChart from '@/components/blanks/chart/selectChart/SelectChart.vue';

import moment from 'moment';
import CurrencyFilter from '@/components/blanks/currencyFilter/CurrencyFilter.vue';
export default {
    components: { DateFilter, SelectChart, CurrencyFilter },
    props: {
        dataChart: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            dataNames: ['Volume', 'Floor'],
            options: {
                chart: {
                    id: 'vuechart-example',
                    toolbar: false,
                    stacked: false,
                    stroke: {
                        curve: 'smooth',
                        // lineCap: 'round',
                    },

                    animations: {
                        enabled: false,
                    },

                    events: {
                        mounted: () => {
                            // this.setDefaultSeries();

                            console.log('mounted');
                        },
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.6,
                        opacityTo: 0.9,
                        stops: [20, 100, 100, 100],
                    },
                },

                grid: {
                    strokeDashArray: 4,
                },

                colors: ['#4FD1C5', '#2d3748'],

                tooltip: {
                    // intersect: true,
                    shared: false,
                    custom: function ({
                        series,
                        seriesIndex,
                        dataPointIndex,
                        w,
                    }) {
                        return `<div class="chart__tooltip">
                                    <div class="chart__tooltip-title">
                                        <span class="chart__tooltip-date">${moment(
                                            w.config.series[seriesIndex].data[
                                                dataPointIndex
                                            ].x
                                        ).format('D/M/YYYY')}</span>
                                        <span class="chart__tooltip-time">${moment(
                                            w.config.series[seriesIndex].data[
                                                dataPointIndex
                                            ].x
                                        ).format('LTS')}</span>
                                    </div>
                                    <div class="chart__tooltip-main">
                                        <div class="chart__tooltip-item">
                                            <i class="${
                                                seriesIndex === 0
                                                    ? 'chart__tooltip-icon--green'
                                                    : 'chart__tooltip-icon--black'
                                            } chart__tooltip-icon"></i>
                                            <span class="chart__tooltip-series">${
                                                w.config.labels[seriesIndex]
                                            } <strong class="chart__tooltip-cost">${
                            series[seriesIndex][dataPointIndex]
                        }</strong></span>
                                        </div>
                                        <div class="chart__tooltip-item">
                                            <i class="${
                                                seriesIndex === 0
                                                    ? 'chart__tooltip-icon--change--green'
                                                    : 'chart__tooltip-icon--change--black'
                                            } chart__tooltip-icon chart__tooltip-icon--change"></i>
                                            <span class="chart__tooltip-series">Vol 24h: <strong class="chart__tooltip-cost">${
                                                series[seriesIndex][
                                                    dataPointIndex
                                                ]
                                            }</strong></span>

                                        </div>
                                    </div>
                                </div>`;
                    },
                },
                legend: {
                    show: false,
                },
                xaxis: {
                    type: 'datetime',
                    // tickAmount: 'dataPoints',
                    // min: '2021-11-03T07:37:06.210Z',
                    // max: '2021-12-03T07:38:20.640Z',
                    labels: {
                        style: {
                            colors: '#CBD5E0',
                            fontSize: '10px',
                        },
                        datetimeFormatter: {
                            year: 'yyyy',
                            month: "MMM 'yy",
                            day: 'dd MMM',
                            hour: 'HH:mm',
                        },

                        // offsetY: 3,
                    },

                    axisBorder: {
                        show: false,
                    },

                    axisTicks: {
                        show: false,
                    },

                    crosshairs: {
                        show: false,
                    },

                    tooltip: {
                        enabled: false,
                        // x: {
                        //     format: 'dd/MM/yy HH:mm',
                        // },
                    },
                },

                yaxis: [
                    {
                        decimalsInFloat: 0,
                        tickAmount: 6,
                        // min: this.getMinY(),
                        forceNiceScale: false,
                        labels: {
                            style: {
                                colors: '#4FD1C5',
                                fontSize: '10px',
                            },
                            // offsetX: -15,
                            // offsetX: 0,
                        },
                    },

                    {
                        opposite: true,
                        decimalsInFloat: 0,
                        labels: {
                            style: {
                                colors: '#000',
                                fontSize: '10px',
                            },
                            // offsetX: -15,
                            // offsetX: 0,
                        },
                    },
                ],
                labels: ['Volume', 'Floor'],
            },
            series: [
                {
                    name: 'green',
                    data: this.dataChart[
                        this.$store.state.chart.dataGreenChart
                    ]?.[this.$store.state.params.currency],
                },
                {
                    name: 'black',
                    data: this.dataChart[
                        this.$store.state.chart.dataBlackChart
                    ]?.[this.$store.state.params.currency],
                },
            ],
        };
    },

    computed: {
        currency() {
            return this.$store.state.params.currency;
        },

        dataGreenChart() {
            return this.$store.state.chart.dataGreenChart;
        },

        dataBlackChart() {
            return this.$store.state.chart.dataBlackChart;
        },

        loading() {
            return this.$store.state.chart.loading;
        },
    },

    created() {
        this.$nuxt.$on('change-datefilter', async (datefilter) => {
            await this.$store.dispatch('chart/setDatefilter', datefilter);

            await this.$store.dispatch('chart/setDataChart');
            this.changePeriod();
        });
    },

    mounted() {
        console.log(this.$store.getters['chart/getUrl']);
    },

    beforeDestroy() {
        this.$nuxt.$off('change-datefilter');
    },

    methods: {
        async changeValue(value, chart) {
            if (value.property === 'none') {
                this.$refs.chart.hideSeries(chart);
            } else {
                this.$refs.chart.showSeries(chart);

                if (chart === 'green') {
                    await this.$store.dispatch(
                        'chart/setDataGreenChart',
                        value
                    );

                    // this.$cookies.set('nft-analytics.greenSelect', value);

                    this.dataNames[0] = value.name;
                } else {
                    await this.$store.dispatch(
                        'chart/setDataBlackChart',
                        value
                    );

                    // this.$cookies.set('nft-analytics.blackSelect', value);

                    this.dataNames[1] = value.name;
                }

                if (
                    //TODO: убрать все бесполезные опциональные цепочки (?.) (как здесь)
                    !(
                        this.dataChart[this.dataGreenChart]?.[this.currency] &&
                        this.dataChart[this.dataBlackChart]?.[this.currency]
                    )
                ) {
                    this.$refs.chart.hideSeries('green');
                    this.$refs.chart.hideSeries('black');
                } else {
                    this.$refs.chart.updateOptions({
                        labels: this.dataNames,
                        series: [
                            {
                                name: 'green',
                                data:
                                    this.dataGreenChart === 'total_volume' ||
                                    this.dataGreenChart === 'floor_price'
                                        ? this.dataChart[this.dataGreenChart][
                                              this.currency
                                          ]
                                        : this.dataChart[this.dataGreenChart],
                            },

                            {
                                name: 'black',
                                data:
                                    this.dataBlackChart === 'total_volume' ||
                                    this.dataBlackChart === 'floor_price'
                                        ? this.dataChart[this.dataBlackChart][
                                              this.currency
                                          ]
                                        : this.dataChart[this.dataBlackChart],
                            },
                        ],
                    });
                }
            }

            // if (
            //     !(
            //         this.dataChart[this.dataGreenChart]?.[this.currency] &&
            //         this.dataChart[this.dataBlackChart]?.[this.currency]
            //     )
            // ) {
            //     this.$refs.chart.hideSeries(chart);
            // }
        },

        // {
        //             name: 'green',
        //             data:
        //                 this.dataChart[this.dataGreenChart]?.[this.currency] ||
        //                 this.dataChart[this.dataGreenChart],
        //         },

        //         {
        //             name: 'black',
        //             data:
        //                 this.dataChart[this.dataBlackChart]?.[this.currency] ||
        //                 this.dataChart[this.dataBlackChart],
        //         },

        changeCurrency(currency) {
            this.$refs.chart.updateSeries([
                {
                    name: 'green',
                    data:
                        this.dataGreenChart === 'total_volume' ||
                        this.dataGreenChart === 'floor_price'
                            ? this.dataChart[this.dataGreenChart][currency]
                            : this.dataChart[this.dataGreenChart],
                },

                {
                    name: 'black',
                    data:
                        this.dataBlackChart === 'total_volume' ||
                        this.dataBlackChart === 'floor_price'
                            ? this.dataChart[this.dataBlackChart][currency]
                            : this.dataChart[this.dataBlackChart],
                },
            ]);
        },

        changePeriod() {
            // const multipleCurrencies = ['total_volume', 'floor_price'];

            this.$refs.chart.updateSeries([
                {
                    name: 'green',
                    data:
                        this.dataGreenChart === 'total_volume' ||
                        this.dataGreenChart === 'floor_price'
                            ? this.dataChart[this.dataGreenChart][this.currency]
                            : this.dataChart[this.dataGreenChart],
                },

                {
                    name: 'black',
                    data:
                        this.dataBlackChart === 'total_volume' ||
                        this.dataBlackChart === 'floor_price'
                            ? this.dataChart[this.dataBlackChart][this.currency]
                            : this.dataChart[this.dataBlackChart],
                },
            ]);
        },

        setDefaultSeries() {
            if (
                this.$cookies.get('nft-analytics.greenSelect') ||
                this.$cookies.get('nft-analytics.blackSelect')
            ) {
                let greenCookies = this.$cookies.get(
                    'nft-analytics.greenSelect'
                );
                let blackCookies = this.$cookies.get(
                    'nft-analytics.blackSelect'
                );

                this.$refs.chart.updateOptions({
                    labels: [
                        greenCookies?.name || 'Volume',
                        blackCookies?.name || 'Floor',
                    ],
                    series: [
                        {
                            name: 'green',
                            data: this.dataChart[
                                greenCookies?.property || 'total_volume'
                            ][this.$store.state.params.currency],
                        },

                        {
                            name: 'black',
                            data: this.dataChart[
                                blackCookies?.property || 'floor_price'
                            ][this.$store.state.params.currency],
                        },
                    ],
                });
            }
        },

        changingData(value) {
            return value === 0 ? 0 : value !== null ? value.toFixed(2) : '---';
        },
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/chart/chart.scss"
></style>
