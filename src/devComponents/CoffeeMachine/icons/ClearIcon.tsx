import cn from 'classnames';
// @ts-ignore
import styles from './Icons.module.css';

const ClearIcon = ({ enabled, size = 'm' }: any) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 1000 1000"
      enable-background="new 0 0 1000 1000"
      className={cn({
        [styles.sizeM]: size === 'm',
        [styles.sizeS]: size === 's',
        [styles.sizeXS]: size === 'xs',
      })}
    >
      <g>
        <g transform="translate(0.000000,492.000000) scale(0.100000,-0.100000)">
          <path
            className={cn(styles.default, {
              [styles.enabled]: enabled,
            })}
            d="M8964.8,4656c-45.8-13.9-123.3-49.7-169.1-77.6c-47.7-27.9-845.4-811.6-1774.4-1740.6L5332.4,1147l-85.5,65.6c-113.4,85.5-208.9,117.4-358.1,117.4c-135.3,0-179-19.9-495.3-206.9c-638.5-376-1517.8-584.8-2305.5-549C1570.8,598,1151.1,675.5,614,846.6C158.4,991.8,136.5,977.9,108.7,540.3C19.2-814.4,623.9-2256.6,1759.8-3390.4c859.3-859.3,1848-1384.5,2717.3-1446.2c234.7-17.9,509.2,21.9,572.9,79.6c33.8,29.8,189,447.6,594.8,1593.4c300.4,853.4,636.6,1806.2,746,2116.6c177,499.3,200.9,582.8,200.9,698.2c0,155.2-57.7,290.4-169.1,397.8l-69.6,67.6l1708.8,1712.7c1834.1,1834.1,1790.3,1786.3,1830.1,2031c47.7,310.3-115.4,624.6-393.9,757.9C9362.6,4681.9,9102,4701.8,8964.8,4656z M9287,4323.8c103.4-29.8,216.8-145.2,250.6-254.6c29.8-99.5,4-232.7-63.6-318.3c-21.9-27.9-793.7-797.7-1712.7-1710.7l-1671-1659l-256.6,256.6l-256.6,256.6l1704.8,1702.8c1491.9,1489.9,1716.7,1706.8,1786.3,1724.6C9175.6,4349.7,9195.5,4349.7,9287,4323.8z M5000.2,950.1c87.5-59.7,1195.5-1167.7,1227.4-1227.3c17.9-33.8,23.9-77.6,15.9-109.4c-23.9-95.5-354.1-1026.5-372-1046.3c-10-11.9-395.8,360.1-990.6,954.8c-535.1,535.1-966.8,978.7-958.8,984.7c8,6,67.6,33.8,133.3,59.7c171.1,67.6,485.4,224.8,652.5,328.2C4861,991.8,4924.6,1001.8,5000.2,950.1z M1135.1,339.4c736-155.2,1513.8-157.2,2190.1-4l200.9,43.8l1106-1106l1106-1106l-459.5-1302.9c-254.6-714.1-471.4-1312.9-483.4-1328.8c-17.9-21.9-73.6-25.9-272.5-15.9c-137.3,6-284.5,21.9-328.2,33.8c-43.8,9.9-113.4,29.8-155.2,41.8l-75.6,19.9l57.7,73.6c282.5,358.1,660.4,1108,668.4,1320.9c2,101.4-67.6,175-167.1,175c-109.4,0-149.2-41.8-208.9-222.8c-107.4-328.2-419.7-885.2-642.5-1147.8l-57.7-69.6l-107.4,45.8c-119.4,51.7-477.4,252.6-610.7,344.1l-83.6,57.7l220.8,212.9c344.1,330.2,694.2,791.7,694.2,915c0,71.6-103.4,163.1-183,163.1c-85.5-2-109.4-21.9-216.8-189c-127.3-194.9-368-477.4-570.9-668.4c-240.7-224.8-236.7-222.8-376-105.4c-63.7,53.7-226.8,204.9-362,338.2l-246.7,240.7l212.8,101.4c262.6,125.3,527.1,284.5,618.7,370c87.5,83.6,95.5,187,19.9,260.6c-79.6,79.6-149.2,65.6-364-71.6c-212.9-139.2-666.4-362-714.1-352.1c-39.8,8-262.6,316.3-421.7,582.8c-171.1,288.4-181,260.6,91.5,274.5c403.8,19.9,863.3,115.4,942.9,195c49.7,49.7,49.7,177,0,238.7c-47.7,59.7-125.3,57.7-429.7-10c-187-41.8-312.3-55.7-578.9-65.7l-340.2-11.9l-61.7,157.2c-73.6,194.9-155.2,451.5-175.1,553c-11.9,73.6-11.9,77.6,33.8,65.6c356.1-87.5,1380.5-51.7,1589.4,55.7c115.4,59.7,121.3,214.8,13.9,296.4c-51.7,37.8-53.7,37.8-256.6,0c-258.6-47.7-1068.2-51.7-1308.9-6c-145.2,27.8-147.2,29.8-163.1,97.5C460.8-66.4,436.9,415,450.8,470.7l13.9,49.7l214.8-65.6C797,418.9,1001.9,367.2,1135.1,339.4z"
          />
        </g>
      </g>
    </svg>
  );
};

export default ClearIcon;
