import LockIcon from './assets/icons8-lock.svg';

const lightOrange = '#fbd5b9';
const darkOrange = '#f16020';
const gray = '#b9b9b9';

const patternHeight = 2;
const patternWidth = 400;

const strokeWidth = 3

let cx = 35;
let cy = 35;
const xGap = 350;
const yGap = 350;
const radius = 20;

const nodesArr = [
  {
    id: '1',
    icon: null,
    isCurrent: true,
    isComplete: false,
  },
  {
    id: '2',
    icon: LockIcon,
    isComplete: false,
  }
];

function DynamicSVG() {

  const handleClick = () => {
    const radius = 20;
    var p1x = parseFloat(document.getElementById("au").getAttribute("cx"));
    var p1y = parseFloat(document.getElementById("au").getAttribute("cy"));
    var p2x = parseFloat(document.getElementById("sl").getAttribute("cx"));
    var p2y = parseFloat(document.getElementById("sl").getAttribute("cy"));

    // mid-point of line:
    var mpx = (p2x + p1x + radius) * 0.6;
    var mpy = (p2y + p1y + radius) * 0.5;

    // angle of perpendicular to line:
    var theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2;

    // distance of control point from mid-point of line:
    var offset = 60;

    // location of control point:
    var c1x = mpx + offset * Math.cos(theta);
    var c1y = mpy + offset * Math.sin(theta);
    var dotElement = document.getElementById("dot");
    dotElement.setAttribute("cx", c1x);
    dotElement.setAttribute("cy", c1y);

    const pathOffset = radius * 1.45;

    // construct the command to draw a quadratic curve
    // var curve = "M" + p1x + " " + p1y + " Q " + c1x + " " + c1y + " " + p2x + " " + p2y;
    var curve = "M" + (p1x + pathOffset) + " " + p1y + " Q " + c1x + " " + c1y + " " + p2x + " " + (p2y - pathOffset);
    var curveElement = document.getElementById("curve");
    curveElement.setAttribute("d", curve);
  }

  return (
    <>
      <button onClick={handleClick} style={{ position: "absolute", top: "0", left: "400px" }}>Click</button>
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
        </defs>

        <circle id="au" cx={cx} cy={cy} r="35" fill={lightOrange} />
        <circle id="au1" cx={cx} cy={cy} r="22" fill={darkOrange} />

        <circle id="sl" cx="370" cy="200" r="22" fill={gray} />
        <circle id="sl1" cx="370" cy="200" r="18" fill="url(#lockImage)" />

        <circle id="dot" cx="0" cy="0" r="2" stroke="green" strokeWidth={strokeWidth} fill="red" />

        <path 
          id='curve' 
          style={{ stroke: 'url(#currentPathPattern)' }} 
          fill='transparent' 
          strokeWidth='4' 
          strokeDasharray="13,10"
          d='M35,50 Q40,100 150,50 T365,170' 
        />

        {nodesArr.map(node => {

          return (<>
            
          </>);
        })}
      </svg>
    </>
  )
}

export default DynamicSVG