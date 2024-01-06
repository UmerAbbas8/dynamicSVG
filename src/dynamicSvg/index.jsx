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
const xGap = 350;
const yGap = 150;
const radius = 20;

const nodesArr = [
  {
    id: '1',
    icon: null,
    isComplete: true,
    iconAfterNode: true,
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
];

function DynamicSVG() {

  const nodesRef = useRef([]);

  let cx = cxInit;
  let cy = cxInit;

  return (
    <svg width="800" height="1000">
      <defs>
        <linearGradient id="completePathGradient">
          <stop offset="0%" stopColor={darkOrange} />
        </linearGradient>
        <linearGradient id="currentPathLTRGradient">
          <stop offset="0%" stopColor={darkOrange} />
          <stop offset="70%" stopColor={gray} />
        </linearGradient>
        <linearGradient id="currentPathRTLGradient">
          <stop offset="20%" stopColor={gray} />
          <stop offset="100%" stopColor={darkOrange} />
        </linearGradient>
        <linearGradient id="remainingPathGradient">
          <stop offset="0%" stopColor={gray} />
        </linearGradient>

        <pattern id="completePathPattern" x="0" y="0" width={patternWidth} height={patternHeight} patternUnits="userSpaceOnUse">
          <g>
            <rect x="0" y="0" width={patternWidth} height={patternHeight} fill="url(#completePathGradient)" />
          </g>
        </pattern>
        <pattern id="currentPathLTRPattern" x="0" y="0" width={patternWidth} height={patternHeight} patternUnits="userSpaceOnUse">
          <g>
            <rect x="0" y="0" width={patternWidth} height={patternHeight} fill="url(#currentPathLTRGradient)" />
          </g>
        </pattern>
        <pattern id="currentPathRTLPattern" x="0" y="0" width={patternWidth} height={patternHeight} patternUnits="userSpaceOnUse">
          <g>
            <rect x="0" y="0" width={patternWidth} height={patternHeight} fill="url(#currentPathRTLGradient)" />
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

          const p1x = nodesRef.current[idx - 1].cx;
          const p1y = nodesRef.current[idx - 1].cy;
          // construct the command to draw a curve
          if (idx % 2 === 0) {
            curve = `M${p1x},${p1y + radius} c${-(xGap / 7.5) * 0.5},${(yGap / 4.5) * 2} ${-xGap * 0.7},${(yGap / 11)} ${-xGap - radius},${yGap - radius}`;
          } else {
            if (idx > 1) {
              curve = `M${p1x},${p1y + radius}, c${(xGap / 20)},${(yGap / 1.8)} ${xGap},${(yGap / 8.5)} ${xGap},${yGap}`;
            } else {
              curve = `M${p1x + radius},${p1y}, c${(xGap / 8.5)},${-(yGap / 20)} ${xGap},${(yGap / 1.5)} ${xGap - radius},${yGap}`;
            }
          }
        }

        const pathStyle = {
          stroke: "url(#remainingPathPattern)",
        }

        if (node?.isComplete || nodesRef.current[idx - 1]?.isComplete) {
          pathStyle.stroke = "url(#completePathPattern)";
        }

        if (nodesRef.current[idx - 1]?.isCurrent) {
          pathStyle.stroke = idx % 2 === 0 ? "url(#currentPathRTLPattern)" : "url(#currentPathLTRPattern)";
        }

        nodesRef.current.push({ ...node, cx, cy });

        const pathProps = {
          id: `path-${node.id}`,
          style: pathStyle,
          fill: "transparent",
          strokeWidth: "4",
          strokeDasharray: "13,10",
          d: curve,
        }

        let iconAfterNodeProps = null;

        if (idx > 0) {
          const p1x = nodesRef.current[idx - 1].cx;
          const p1y = nodesRef.current[idx - 1].cy;

          // mid-point of line:
          const mpx = (cx + p1x + (radius/2)) * 0.5;

          // angle of perpendicular to line:
          const theta = Math.atan2(cy - p1y, cx - p1x) - Math.PI / 2;

          // distance of control point from mid-point of line:
          const offset = 25;

          // location of control point:
          const c1x = mpx + offset * Math.cos(theta);
          const c1y = (yGap * 2 * idx) / 2 - (cxInit * 2 + (idx === 1 ? cxInit/1.2 : 0));

          iconAfterNodeProps = {
            id: `iconAfterNode-${node.id}`,
            cx: c1x,
            cy: c1y,
            r: 22,
            fill: "url(#settingImage)"
          }
        }

        return (<g key={node.id}>
          <path {...pathProps} />
          <circle {...nodeObjProps} />
          {node?.isCurrent && <circle {...nodeObjProps} r="22" fill={darkOrange} />}
          {node?.isComplete && <circle {...nodeObjProps} r="18" fill="url(#okImage)" />}

          {!node?.isComplete && !node?.isCurrent &&
            <circle {...nodeObjProps} r="18" fill="url(#lockImage)" />
          }

          {idx > 0 && nodesRef.current[idx - 1]?.iconAfterNode &&
            <circle {...iconAfterNodeProps} r="18" fill="url(#settingImage)" />
          }
        </g>);
      })}
    </svg>
  )
}

export default DynamicSVG