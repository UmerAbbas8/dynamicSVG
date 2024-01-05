import LockIcon from './assets/icons8-lock.svg';
function DynamicSVG() {
  // lock color #888888
  // gray color #b9b9b9
  // darkOrange #f16020
  // lightOrange #fbd5b9

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
      <button onClick={handleClick}>Click</button>
      <svg width="800" height="400">
        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="#f16020" />
            <stop offset="100%" stopColor="#b9b9b9" />
          </linearGradient>
          <pattern id="pathPattern" x="0" y="0" width="400" height="2" patternUnits="userSpaceOnUse">
            <g>
              <rect x="0" y="0" width="400" height="2" fill="url(#gradient)" />
            </g>
          </pattern>

          <pattern id="lockImage" x="0%" y="0%" height="100%" width="100%" viewBox="0 0 512 512">
            <image x="5%" y="5%" width="430" height="430" xlinkHref={LockIcon} />
          </pattern>
        </defs>




        <circle id="au" cx="35" cy="35" r="35" strokeWidth="3" fill="#fbd4b8" />
        <circle id="au" cx="35" cy="35" r="22" strokeWidth="3" fill="#f16020" />

        <circle id="sl" cx="370" cy="200" r="22" strokeWidth="3" fill="#b9b9b9" />
        <circle id="sl" cx="370" cy="200" r="18" strokeWidth="3" fill="url(#lockImage)" />

        <circle id="dot" cx="0" cy="0" r="2" stroke="green" strokeWidth="3" fill="red" />

        <path id='curve' style={{ stroke: 'url(#pathPattern)' }} fill='transparent' strokeWidth='4' strokeDasharray="13,10"
          d='M35,50 Q40,100 150,50 T365,170' />
      </svg>
    </>
  )
}

export default DynamicSVG