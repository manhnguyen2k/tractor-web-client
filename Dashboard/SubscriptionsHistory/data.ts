import theme from '../../_theme'

export const subscriptionsItems = [
  { name: 'GitHub', ratio: 55.3, value: Math.round(55.3 * 144) },
  { name: 'MaterialUI', ratio: 25.7, value: Math.round(25.7 * 144) },
  { name: 'Google', ratio: 15.6, value: Math.round(15.6 * 144) },
  { name: 'ModularCode', ratio: 8.4, value: Math.round(8.4 * 144) },
  { name: 'GH', ratio: 5.5, value: Math.round(5.5 * 144) },
]

export const subscriptionsHistoryChart = {
  data: {
    datasets: [
      {
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
        label: 'Tốc độ',
        fill: false,
        data: [154, 135, 127, 183, 195, 186, 203, 254, 195, 221, 154, 167],
        yAxisID: 'y',
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
      },
      {
        fill: true,
        backgroundColor: 'rgba(136, 151, 170, 0.1)',
        borderColor: '#8897aa',
        borderDash: [5, 5],
        borderWidth: 1,
        data: [
          100000,
          30820,
          59622,
          146465,
          78160,
          79520,
          36148,
          48781,
          158303,
          155174,
          104830,
          86895,
        ],
        label: 'Độ nghiêng',
        yAxisID: 'y1',
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
      },
    ],
    labels: [
      '2019-03',
      '2019-04',
      '2019-05',
      '2019-06',
      '2019-07',
      '2019-08',
      '2019-09',
      '2019-10',
      '2019-11',
      '2019-12',
      '2020-01',
      '2020-02',
    ],
  },
  options: {
    stacked: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { fontColor: '#aaa', autoSkipPadding: 50 },
      },
      y: {
        grid: { display: false },
        ticks: { fontColor: '#aaa', maxTicksLimit: 5 },
      },
      y1: {
        position: 'right',
        grid: { display: false },
        ticks: { fontColor: '#aaa', maxTicksLimit: 5 },
      },
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    responsive: true,
    maintainAspectRatio: false,
  },
}
