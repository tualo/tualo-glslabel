
var label = Label({});
var data = new Buffer(label,'ascii');
fs.writeFile('/dev/usb/lp0', data, function (err) {
  if (err) throw err;
  console.log('It\'s printed!');
	process.exit();
});

