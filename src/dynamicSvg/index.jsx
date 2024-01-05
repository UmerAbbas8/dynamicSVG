import { useRef } from 'react';
import LockIcon from './assets/icons8-lock.svg';
import OkIcon from './assets/icons8-ok.svg';
import SettingIcon from './assets/icons8-setting.svg';

const lightOrange = '#fbd5b9';
const darkOrange = '#f16020';
const gray = '#b9b9b9';

const patternHeight = 2;
const patternWidth = 400;

const cxInit = 35;
const xGap = 300;
const yGap = 185;

const nodesArr = [
  {
    id: '1',
    icon: null,
    isComplete: true,
  },
  {
    id: '2',
    icon: null,
    isCurrent: true,
    isComplete: false,
  },
  {
    id: '3',
    icon: LockIcon,
    isComplete: false,
  },
  {
    id: '4',
    icon: LockIcon,
    isComplete: false,
  },
  {
    id: '5',
    icon: LockIcon,
    isComplete: false,
  }
];

function DynamicSVG() {

  const nodesRef = useRef([]);

  let cx = 35;
  let cy = 35;

  return (
    <svg width="800" height="1000">
      <defs>
        <linearGradient id="completePathGradient">
          <stop offset="0%" stopColor={darkOrange} />
        </linearGradient>
        <linearGradient id="currentPathGradient">
          <stop offset="0%" stopColor={darkOrange} />
          <stop offset="100%" stopColor={gray} />
        </linearGradient>
        <linearGradient id="remainingPathGradient">
          <stop offset="0%" stopColor={gray} />
        </linearGradient>

        <pattern id="completePathPattern" x="0" y="0" width={patternWidth} height={patternHeight} patternUnits="userSpaceOnUse">
          <g>
            <rect x="0" y="0" width={patternWidth} height={patternHeight} fill="url(#completePathGradient)" />
          </g>
        </pattern>
        <pattern id="currentPathPattern" x="0" y="0" width={patternWidth} height={patternHeight} patternUnits="userSpaceOnUse">
          <g>
            <rect x="0" y="0" width={patternWidth} height={patternHeight} fill="url(#currentPathGradient)" />
          </g>
        </pattern>
        <pattern id="remainingPathPattern" x="0" y="0" width={patternWidth} height={patternHeight} patternUnits="userSpaceOnUse">
          <g>
            <rect x="0" y="0" width={patternWidth} height={patternHeight} fill="url(#remainingPathGradient)" />
          </g>
        </pattern>
        <pattern id="lockImage" x="0%" y="0%" height="100%" width="100%" viewBox="0 0 512 512">
          <image x="5%" y="5%" width="430" height="430" xlinkHref={LockIcon} />
        </pattern>
        <pattern id="okImage" x="0%" y="0%" height="100%" width="100%" viewBox="0 0 512 512">
          <image x="5%" y="5%" width="430" height="430" xlinkHref={OkIcon} />
        </pattern>
        <pattern id="settingImage" x="0%" y="0%" height="100%" width="100%" viewBox="0 0 512 512">
          <image x="5%" y="5%" width="430" height="430" xlinkHref={SettingIcon} />
        </pattern>
      </defs>

      {nodesArr.map((node, idx) => {
        if (idx > 0) {
          cy += yGap;
        }
        if (idx % 2 === 0) {
          cx = cxInit;
        } else {
          cx += xGap;
        }

        const nodeObjProps = {
          id: `node-${node.id}`,
          cx: cx,
          cy: cy,
          r: 22,
          fill: gray,
          ...(node.isCurrent && { r: 35, fill: lightOrange, }),
          ...(node.isComplete && { fill: darkOrange, }),
        }


        let curve = '';
        if (idx > 0) {
          const radius = 20;
          const p1x = nodesRef.current[idx - 1].cx;
          const p1y = nodesRef.current[idx - 1].cy;
          const p2x = cx;
          const p2y = cy;

          // mid-point of line:
          const mpx = (p2x + p1x + radius) * 0.6;
          const mpy = (p2y + p1y + radius) * 0.5;

          // angle of perpendicular to line:
          const theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2;

          // distance of control point from mid-point of line:
          const offset = 60;

          // location of control point:
          const c1x = mpx + offset * Math.cos(theta);
          const c1y = mpy + offset * Math.sin(theta);
          // const dotElement = document.getElementById("dot");
          // dotElement.setAttribute("cx", c1x);
          // dotElement.setAttribute("cy", c1y);

          const pathOffset = radius * 1.45;

          // construct the command to draw a quadratic curve
          // curve = "M" + p1x + " " + p1y + " Q " + c1x + " " + c1y + " " + p2x + " " + p2y;
          curve = "M" + (p1x + pathOffset) + " " + p1y + " Q " + c1x + " " + c1y + " " + p2x + " " + (p2y - pathOffset);
        }

        nodesRef.current.push({ cx, cy });

        const pathProps = {
          id: `path-${node.id}`,
          style: { stroke: "url(#currentPathPattern)" },
          fill: "transparent",
          strokeWidth: "4",
          strokeDasharray: "13,10",
          d: curve,
        }

        return (<>
          <circle {...nodeObjProps} />
          {node.isCurrent && <circle {...nodeObjProps} r="22" fill={darkOrange} />}
          {node.isComplete && <circle {...nodeObjProps} r="18" fill="url(#okImage)" />}

          {!node?.isComplete && !node?.isCurrent &&
            <circle {...nodeObjProps} r="18" fill="url(#lockImage)" />
          }

          <path {...pathProps} />
        </>);
      })}
    </svg>
  )
}

export default DynamicSVG