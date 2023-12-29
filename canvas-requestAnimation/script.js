const clock = () => {
  const now = new Date();
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  //Setup canvas
  ctx.save(); // save the default state
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250); // put 0, 0 in middle
  ctx.rotate(-Math.PI / 2); // rotate -90 degree

  // set the default color
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#f4f4f4";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  // draw clock face/border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = "#800000";
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  // hour lines
  ctx.save();
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  //Minute lines
  ctx.save();
  ctx.lineWidth = 4;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  // Get the current time
  const hour = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  //console.log(`${hour}-${minutes}-${seconds}`);
  // Place hour hand
  ctx.save();
  ctx.rotate(
    (Math.PI * hour) / 6 +
      (Math.PI * minutes) / 360 +
      (Math.PI * seconds) / (360 * 60)
  );
  ctx.strokeStyle = "#800000";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // Place Minute hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * minutes + (Math.PI / 1800) * seconds);
  ctx.strokeStyle = "#800000";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  // Place Second hand
  ctx.save();
  ctx.rotate((seconds * Math.PI) / 30);
  ctx.strokeStyle = "#ff7f50";
  ctx.fillStyle = "#ff7f50";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.restore(); // restore the default state
  requestAnimationFrame(clock);
};

requestAnimationFrame(clock);
