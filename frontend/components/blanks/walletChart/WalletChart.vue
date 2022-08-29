<template>
    <div class="wallet-chart">
        <div class="wallet-chart__menu">
            <div class="wallet-chart__datefilter">
                <date-filter type="walletChart" />
            </div>
            <currency-filter />
        </div>
        <div class="wallet-chart__wrapper">
            <div class="wallet-chart__chart">
                <apexchart
                    ref="chart"
                    width="100%"
                    height="100%"
                    type="area"
                    :options="options"
                    :series="series"
                />
            </div>
            <div class="wallet-chart__btns">
                <div class="wallet-chart__btn wallet-chart__btn--green">
                    <span class="wallet-chart__btn-text">Buy</span>
                    <div class="wallet-chart__btn-wrapper">
                        <i
                            class="icon-eth wallet-chart__icon wallet-chart__icon--eth"
                        />
                        <span class="wallet-chart__value">2.5</span>
                    </div>
                </div>
                <div class="wallet-chart__btn wallet-chart__btn--orange">
                    <span class="wallet-chart__btn-text">Sell</span>
                    <div class="wallet-chart__btn-wrapper">
                        <i
                            class="icon-eth wallet-chart__icon wallet-chart__icon--eth"
                        />
                        <span class="wallet-chart__value">5</span>
                    </div>
                </div>
                <div class="wallet-chart__btn wallet-chart__btn--yellow">
                    <span class="wallet-chart__btn-text">Mint</span>
                    <div class="wallet-chart__btn-wrapper">
                        <i
                            class="icon-eth wallet-chart__icon wallet-chart__icon--eth"
                        />
                        <span class="wallet-chart__value">8</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DateFilter from '@/components/blanks/dateFilter/DateFilter.vue';
import CurrencyFilter from '@/components/blanks/currencyFilter/CurrencyFilter.vue';
export default {
    components: { DateFilter, CurrencyFilter },
    data() {
        return {
            dataGreenChart: 'total_volume',
            dataBlackChart: 'total_volume',
            options: {
                chart: {
                    id: 'vuechart-example',
                    toolbar: false,
                    stacked: false,
                    stroke: {
                        curve: 'smooth',
                        // lineCap: 'round',
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

                //TODO: customize data
                // tooltip: {
                //     // intersect: true,
                //     shared: false,
                //     custom: function ({
                //         series,
                //         seriesIndex,
                //         dataPointIndex,
                //         w,
                //     }) {
                //         return `<div class="chart__tooltip">
                //                     <div class="chart__tooltip-title">
                //                         <span class="chart__tooltip-date">${moment(
                //                             w.config.xaxis.categories[
                //                                 dataPointIndex
                //                             ]
                //                         ).format('D/M/YYYY')}</span>
                //                         <span class="chart__tooltip-time">${moment(
                //                             w.config.xaxis.categories[
                //                                 dataPointIndex
                //                             ]
                //                         ).format('LTS')}</span>
                //                     </div>
                //                     <div class="chart__tooltip-main">
                //                         <div class="chart__tooltip-item">
                //                             <i class="${
                //                                 seriesIndex === 0
                //                                     ? 'chart__tooltip-icon--green'
                //                                     : 'chart__tooltip-icon--black'
                //                             } chart__tooltip-icon"></i>
                //                             <span class="chart__tooltip-series">Price: <strong class="chart__tooltip-cost">${
                //                                 series[seriesIndex][
                //                                     dataPointIndex
                //                                 ]
                //                             }</strong></span>
                //                         </div>
                //                         <div class="chart__tooltip-item">
                //                             <i class="${
                //                                 seriesIndex === 0
                //                                     ? 'chart__tooltip-icon--change--green'
                //                                     : 'chart__tooltip-icon--change--black'
                //                             } chart__tooltip-icon chart__tooltip-icon--change"></i>
                //                             <span class="chart__tooltip-series">Vol 24h: <strong class="chart__tooltip-cost">${
                //                                 series[seriesIndex][
                //                                     dataPointIndex
                //                                 ]
                //                             }</strong></span>

                //                         </div>
                //                     </div>
                //                 </div>`;
                //     },
                // },
                legend: {
                    show: false,
                },
                xaxis: {
                    type: 'datetime',
                    categories: [
                        '2018-09-19T00:00:00.000Z',
                        '2018-09-19T01:30:00.000Z',
                        '2018-09-19T02:30:00.000Z',
                        '2018-09-19T03:30:00.000Z',
                        '2018-09-19T04:30:00.000Z',
                        '2018-09-19T05:30:00.000Z',
                        '2018-09-19T06:30:00.000Z',
                    ],
                    tickAmount: 6,
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
                        forceNiceScale: false,
                        labels: {
                            style: {
                                colors: '#CBD5E0',
                                fontSize: '10px',
                            },
                            // offsetX: -15,
                            // offsetX: 0,
                        },
                    },
                ],
            },
            series: [
                {
                    name: 'green',
                    data: [31, 40, 28, 51, 42, 109, 100],
                },
            ],
        };
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/walletChart/wallet-chart.scss"
/>
