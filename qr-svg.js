// QR코드를 SVG 파일로 만드는 Node.js 스크립트
// 사용법: npm install qrcode && node qr-svg.js "https://example.com" qr.svg
// 코드 없이 만들려면(로고·색·문구 포함): https://www.cardmelo.com/qr/

const QRCode = require('qrcode');
const fs = require('fs');

const [, , text, out = 'qr.svg'] = process.argv;
if (!text) {
  console.error('사용법: node qr-svg.js "넣을 내용" [저장할 파일명.svg]');
  process.exit(1);
}

QRCode.toString(text, {
  type: 'svg',
  errorCorrectionLevel: 'M', // 가운데 로고를 얹을 거면 'H'
  margin: 4, // 여백(quiet zone) 4모듈 - 지우면 스캔이 안 됨
  color: { dark: '#111111', light: '#ffffff' },
})
  .then((svg) => {
    fs.writeFileSync(out, svg);
    console.log(`저장함: ${out}`);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
