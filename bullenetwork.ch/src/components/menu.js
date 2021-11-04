import React from "react"
import styles from "./menu.module.scss"
import { Link } from "gatsby"

const Menu = () => {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <Link to="/#commmunity-title" className={styles.tile} activeClassName={styles.activeLink}>
          <p className={styles.downArrow}>La communauté</p>
          <CommunitySVG />
        </Link>
        <Link to="/social" className={styles.tile} activeClassName={styles.activeLink}>
          <p className={styles.rightArrow}>Engagement social</p>
          <SocialSVG />
        </Link>
        <Link to="/association" className={styles.tile} activeClassName={styles.activeLink}>
          <p className={styles.downArrow}>l'Association</p>
          <AssociationSVG />
        </Link>
        <Link to="/academy" className={styles.tile} activeClassName={styles.activeLink}>
          <p className={styles.rightArrow}>Formations</p>
          <StudySVG />
        </Link>
        <div className={styles.twoTiles}>
          <a href="https://waykup.ch" target="_blank" className={styles.tile}>
            <p className={styles.outArrow}>Groupe de jeunes (13-18)</p>
          </a>
          <Link to="/be-live" className={styles.tile}>
            <p className={styles.rightArrow}>Groupe jeunes adultes (18+)</p>
          </Link>
        </div>
      </div>
    </section >
  )
}

const CommunitySVG = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 4725 4725" version="1.1" xmlns="http://www.w3.org/2000/svg" className={styles.community, styles.svgEl}>
      <g transform="matrix(0.846306,0,0,0.846306,974.356,1358.26)">
        <g transform="matrix(0.799252,0,0,0.799252,733.114,565.983)">
          <path d="M2933.35,3447.85L2933.35,3080.76C2933.35,2684.18 3255.33,2362.2 3651.91,2362.2C4048.49,2362.2 4370.47,2684.18 4370.47,3080.76L4370.47,3447.85" style={{ fill: "none", stroke: "black", strokeWidth: "147.84px" }} />
        </g>
        <g transform="matrix(1,0,0,1,165.651,-152.3)">
          <circle cx="3486.26" cy="2184.22" r="269.758" style={{ fill: "none", stroke: "black", strokeWidth: "118.16px" }} />
        </g>
      </g>
      <g transform="matrix(0.55795,0,0,0.55795,857.247,1377.27)">
        <circle cx="2871.65" cy="2356.54" r="2023.89" style={{ fill: "none", stroke: "black", strokeWidth: "134.42px" }} />
      </g>
      <g transform="matrix(0.509341,0,0,0.509341,1256.32,1488.93)">
        <g transform="matrix(0.962748,0,0,1.09543,-671.017,-219.229)">
          <path d="M3138.24,406.743C3639.6,470.549 4083.54,723.87 4394.37,1093.06C4542.4,1268.89 4660.46,1470.91 4740.07,1691.15C4815.2,1899.02 4855.76,2123.12 4856.62,2356.54C4853.53,2862.26 4662.77,3323.96 4348.33,3672.93C4009.45,4049.02 3527.25,4293.35 2989.91,4320.89C2954.81,4322.99 2928.26,4349.73 2930.66,4380.58C2933.05,4411.42 2963.47,4434.75 2998.57,4432.65C3566.95,4393.73 4071.59,4127.6 4423.62,3724.52C4743.04,3358.8 4937.67,2880.33 4934.47,2356.54C4935.35,2115.75 4894.12,1884.6 4819.19,1669.46C4739.32,1440.17 4620.54,1229.21 4470.67,1044.36C4149.86,648.67 3686.5,373.438 3157.85,296.059C3123.09,291.304 3090.49,312.242 3085.08,342.786C3079.67,373.331 3103.49,401.989 3138.24,406.743Z" />
        </g>
        <g transform="matrix(0.815161,0,0,1.09543,588.587,-219.229)">
          <path d="M2439.32,4275.58C1963.67,4172.29 1550.05,3896.08 1269.12,3516.11C1144.49,3347.55 1045.83,3158.68 979.881,2955.43C918.593,2766.54 886.146,2565.24 884.887,2356.54C886.525,2144.31 920.565,1939.78 984.021,1748.16C1052.38,1541.72 1154.4,1350.3 1282.97,1180.06C1573.16,795.804 1999.68,520.031 2488.78,426.816C2528.87,418.712 2552.58,387.913 2541.68,358.082C2530.79,328.252 2489.41,310.613 2449.32,318.718C1932.99,429.139 1488.23,729.178 1193.5,1143.75C1067.09,1321.57 968.137,1520.24 902.46,1733.74C841.956,1930.42 808.967,2139.56 810.642,2356.54C809.355,2569.83 841.694,2775.51 900.399,2969.24C964.011,3179.15 1059.59,3374.88 1181.68,3550.8C1465.78,3960.19 1894.42,4261.15 2394.89,4382.61C2434.58,4391.73 2476.76,4375.16 2489.02,4345.62C2501.28,4316.09 2479.01,4284.7 2439.32,4275.58Z" />
        </g>
      </g>
      <g transform="matrix(0.509341,0,0,0.509341,1256.32,1488.93)">
        <g transform="matrix(1.09543,0,0,0.354166,-783.504,1141.83)">
          <path d="M4815.63,2601.83C4787.83,2776.42 4734.04,2940.85 4659.8,3096.26C4533.29,3361.09 4350.47,3595.05 4127.09,3780.67C3783.99,4065.79 3347.08,4236.1 2871.65,4244.04C2393.45,4235.44 1954.29,4062 1610.28,3774.07C1385.37,3585.82 1201.9,3349.24 1076.31,3080.77C1002.45,2922.88 949.677,2756.02 924.051,2578.56C910.296,2485.87 874.8,2445.16 844.833,2487.7C814.866,2530.25 801.704,2640.04 815.458,2732.72C849.854,2958.38 916.223,3176.41 1012.29,3373.34C1147.67,3650.84 1343.87,3893.51 1584.09,4082.62C1936.18,4359.8 2384.15,4525.58 2871.65,4516.82C3356.24,4524.91 3801.69,4359.99 4152.81,4086.01C4391,3900.14 4586.41,3662.6 4722.65,3390.05C4818.13,3199.04 4885.42,2987.74 4922.24,2768.7C4937.13,2677.71 4925.33,2566.45 4895.91,2520.39C4866.49,2474.34 4830.52,2510.83 4815.63,2601.83Z" />
        </g>
        <g transform="matrix(1.09543,0,0,0.450734,-783.504,1826.5)">
          <path d="M4700.24,3026.78C4560.2,3369.6 4325.85,3663.55 4030.19,3878.62C3703.72,4116.1 3303.6,4254.95 2871.65,4258.53C2454.47,4254.44 2067.07,4123.78 1746.96,3900.73C1462.91,3702.81 1232.59,3433.34 1083.61,3117.71C1058.62,3065.44 1020.87,3072.32 999.359,3133.06C977.852,3193.8 980.683,3285.55 1005.68,3337.82C1166.52,3669.85 1413.1,3953.58 1717.3,4157.19C2046.5,4377.53 2443.9,4506.52 2871.65,4502.33C3314.61,4506 3724.92,4366.48 4060.74,4131.42C4379.46,3908.34 4631.83,3596.1 4784.45,3232.81C4807.84,3176.34 4807.97,3084.33 4784.73,3027.47C4761.5,2970.62 4723.64,2970.31 4700.24,3026.78Z" />
        </g>
        <g transform="matrix(1.09543,0,0,0.364273,-783.504,23.9915)">
          <path d="M4573.15,3248.94C4411.11,3523.13 4186.93,3758.2 3920.34,3931.34C3760.36,4035.24 3585.35,4117.63 3399.46,4171.74C3231.32,4220.69 3054.31,4245.55 2871.65,4247.43C2480.76,4239.28 2115.98,4121.65 1808.04,3919.52C1535.99,3740.95 1309.04,3496.97 1148.55,3212.55C1119.96,3163.16 1083.41,3192.87 1066.99,3278.85C1050.57,3364.83 1060.44,3474.73 1089.04,3524.12C1259.83,3811.6 1499.97,4051.95 1786.89,4224.01C2101.74,4412.82 2473.51,4521.73 2871.65,4513.43C3057.13,4515.34 3236.83,4490.87 3407.76,4447.6C3597.69,4399.52 3776.76,4326.65 3940.76,4231.21C4221.44,4067.85 4458.25,3838.86 4630.44,3564.26C4659.38,3516.72 4670.03,3407.47 4654.23,3320.46C4638.41,3233.44 4602.09,3201.4 4573.15,3248.94Z" />
        </g>
      </g>
      <g transform="matrix(0.824861,0,0,0.824861,-451.8,-1363.22)">
        <g transform="matrix(0.799252,0,0,0.799252,733.114,565.983)">
          <path d="M2933.35,3447.85L2933.35,3080.76C2933.35,2684.18 3255.33,2362.2 3651.91,2362.2C4048.49,2362.2 4370.47,2684.18 4370.47,3080.76L4370.47,3447.85" style={{ fill: "none", stroke: "black", strokeWidth: "151.68px" }} />
        </g>
        <g transform="matrix(1,0,0,1,165.651,-152.3)">
          <circle cx="3486.26" cy="2184.22" r="269.758" style={{ fill: "none", stroke: "black", strokeWidth: "121.23px" }} />
        </g>
      </g>
      <g transform="matrix(0.99184,0,0,0.99184,-2823.27,766.675)">
        <g transform="matrix(0.799252,0,0,0.799252,733.114,565.983)">
          <path d="M2933.35,3447.85L2933.35,3080.76C2933.35,2684.18 3255.33,2362.2 3651.91,2362.2C4048.49,2362.2 4370.47,2684.18 4370.47,3080.76L4370.47,3447.85" style={{ fill: "none", stroke: "black", strokeWidth: "131.4px" }} />
        </g>
        <g transform="matrix(1,0,0,1,165.651,-152.3)">
          <circle cx="3486.26" cy="2184.22" r="269.758" style={{ fill: "none", stroke: "black", strokeWidth: "105.02px" }} />
        </g>
      </g>
    </svg>
  )
}

const SocialSVG = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 4725 4725" version="1.1" xmlns="http://www.w3.org/2000/svg" className={styles.social, styles.svgEl}>
      <g transform="matrix(1.08435,0,0,1.12961,-429.27,-606.072)">
        <path d="M2574.33,2028.34C2971.17,818.22 3764.86,818.22 4161.7,1180.12C4558.56,1542.01 4558.56,2265.8 4161.7,2989.59C3883.91,3532.43 3169.6,4075.28 2574.33,4437.17C1979.06,4075.28 1264.75,3532.43 986.957,2989.59C590.114,2265.8 590.114,1542.01 986.957,1180.12C1383.8,818.22 2177.49,818.22 2574.33,2028.34Z" style={{ fill: "none", stroke: "black", strokeWidth: "150px" }} />
      </g>
    </svg>
  )
}

const AssociationSVG = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 4725 4725" version="1.1" xmlns="http://www.w3.org/2000/svg" className={styles.association, styles.svgEl}>
      <g transform="matrix(1.07944,0,0,1,-363.153,365.608)">
        <g transform="matrix(0.71046,0,0,0.869713,616.351,206.309)">
          <rect x="579.948" y="1900.78" width="514.095" height="2077.65" />
        </g>
        <g transform="matrix(1,0,0,0.595185,1.36106,1481.62)">
          <rect x="872.456" y="3635.55" width="674.372" height="175.313" style={{ fill: "none", stroke: "black", strokeWidth: "62.15px" }} />
        </g>
        <g transform="matrix(1,0,0,0.595185,1.36106,-408.719)">
          <rect x="872.456" y="3635.55" width="674.372" height="175.313" style={{ fill: "none", stroke: "black", strokeWidth: "62.15px" }} />
        </g>
      </g>
      <g transform="matrix(1.07944,0,0,1,1055,365.608)">
        <g transform="matrix(0.71046,0,0,0.869713,616.351,206.309)">
          <rect x="579.948" y="1900.78" width="514.095" height="2077.65" />
        </g>
        <g transform="matrix(1,0,0,0.595185,1.36106,1481.62)">
          <rect x="872.456" y="3635.55" width="674.372" height="175.313" style={{ fill: "none", stroke: "black", strokeWidth: "62.15px" }} />
        </g>
        <g transform="matrix(1,0,0,0.595185,1.36106,-408.719)">
          <rect x="872.456" y="3635.55" width="674.372" height="175.313" style={{ fill: "none", stroke: "black", strokeWidth: "62.15px" }} />
        </g>
      </g>
      <g transform="matrix(1.07944,0,0,1,2473.16,365.608)">
        <g transform="matrix(0.71046,0,0,0.869713,616.351,206.309)">
          <rect x="579.948" y="1900.78" width="514.095" height="2077.65" />
        </g>
        <g transform="matrix(1,0,0,0.595185,1.36106,1481.62)">
          <rect x="872.456" y="3635.55" width="674.372" height="175.313" style={{ fill: "none", stroke: "black", strokeWidth: "62.15px" }} />
        </g>
        <g transform="matrix(1,0,0,0.595185,1.36106,-408.719)">
          <rect x="872.456" y="3635.55" width="674.372" height="175.313" style={{ fill: "none", stroke: "black", strokeWidth: "62.15px" }} />
        </g>
      </g>
      <g transform="matrix(0.961163,0,0,0.507829,177.51,2237.63)">
        <rect x="250.625" y="3697.61" width="4044.69" height="243.548" style={{ fill: "none", stroke: "black", strokeWidth: "70.47px" }} />
      </g>
      <g transform="matrix(1.1318,0,0,0.507829,-210.331,2361.32)">
        <rect x="250.625" y="3697.61" width="4044.69" height="243.548" style={{ fill: "none", stroke: "black", strokeWidth: "61.75px" }} />
      </g>
      <g transform="matrix(0.856868,0,0,0.970351,338.108,417.645)">
        <path d="M2362.2,0L4724.41,1755.1L0,1755.1L2362.2,0Z" style={{ fill: "none", stroke: "black", strokeWidth: "59.17px" }} />
      </g>
      <g transform="matrix(0.888511,0,0,1,263.361,365.608)">
        <path d="M245.008,1653.83L4488.93,1653.83" style={{ fill: "none", stroke: "black", strokeWidth: "57.26px" }} />
      </g>
      <g transform="matrix(0.888511,0,0,1,465.95,182.4)">
        <circle cx="2138.96" cy="1086.78" r="319.411" style={{ fill: "none", stroke: "black", strokeWidth: "57.26px" }} />
      </g>
    </svg>
  )
}

const StudySVG = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 4725 4725" version="1.1" xmlns="http://www.w3.org/2000/svg" className={styles.study, styles.svgEl}>
      <g transform="matrix(0.48986,-0.48986,0.48986,0.48986,47.9036,1732.18)">
        <path d="M3229.45,1494.96L0,0L1387.89,3336.51L4724.41,4724.41L3229.45,1494.96Z" />
      </g>
      <g transform="matrix(1.30187,0,0,1.30187,-713.082,-597.429)">
        <path d="M4076.53,1879.14L4076.53,3078.44C4065.17,3072.16 4052.11,3068.58 4038.22,3068.58C4024.33,3068.58 4011.27,3072.16 3999.91,3078.44L3999.91,1910.74L4076.53,1879.14Z" />
      </g>
      <g transform="matrix(1.30187,0,0,1.30187,-713.082,-376.703)">
        <path d="M3862,1783.05C3862.15,1833.75 3862.43,2065.26 3862.74,2111.52L3863.14,2170.98C3863.59,2240.49 3864,2311.51 3864,2394.58C3864,2584.43 3191.07,2835.45 2362.2,2835.45C1533.34,2835.45 860.408,2584.43 860.408,2394.58C860.408,2340.31 867.233,1917.59 868.599,1785.6L2362.2,2401.65L3862,1783.05Z" />
      </g>
      <g transform="matrix(1.44823,0,0,1.44823,-1263.39,-1208.4)">
        <circle cx="4010.09" cy="3270.37" r="66.444" />
      </g>
    </svg>
  )
}

export default Menu