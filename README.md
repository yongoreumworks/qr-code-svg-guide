# QR코드 SVG로 만들기

명함, 포스터, 스티커처럼 인쇄물에 들어가는 QR코드는 PNG보다 SVG로 만드는 편이 좋습니다. 이유는 간단합니다.

- SVG는 벡터라서 아무리 키워도 깨지지 않습니다. 명함용으로 만든 QR을 현수막에 그대로 써도 됩니다.
- 인쇄소에서 요구하는 AI, PDF 파일에 그대로 얹을 수 있습니다.
- 색을 코드 한 줄로 바꿀 수 있어 브랜드 색을 맞추기 쉽습니다.

이 문서는 QR코드를 SVG로 만드는 방법 세 가지(온라인 도구, JavaScript, Python)와 인쇄할 때 주의할 점을 정리한 것입니다.

## 1. 온라인 도구로 바로 만들기

코드를 쓰지 않아도 됩니다. [카드멜로 QR코드 생성기](https://www.cardmelo.com/qr/)는 가입 없이 무료로 쓸 수 있고 SVG와 PNG 둘 다 저장됩니다.

- 주소나 연락처를 넣으면 QR이 바로 만들어집니다.
- 점 모양, 색, 가운데 로고, 아래 문구를 고를 수 있습니다.
- 입력한 내용은 서버로 가지 않고 브라우저 안에서만 QR로 바뀝니다.
- 와이파이 접속용은 [와이파이 QR코드 생성기](https://www.cardmelo.com/qr/wifi/)를 쓰면 됩니다. 손님이 카메라로 찍으면 비밀번호 입력 없이 연결됩니다.

## 2. JavaScript로 만들기

Node.js에서는 [qrcode](https://www.npmjs.com/package/qrcode) 패키지의 `toString`에 `type: 'svg'`를 주면 SVG 문자열이 나옵니다.

```bash
npm install qrcode
```

```js
const QRCode = require('qrcode');
const fs = require('fs');

QRCode.toString('https://www.cardmelo.com/', {
  type: 'svg',
  errorCorrectionLevel: 'M', // 로고를 얹을 거면 'H'
  margin: 4,                 // 여백(quiet zone), 최소 4모듈
  color: { dark: '#111111', light: '#ffffff' },
}).then(svg => fs.writeFileSync('qr.svg', svg));
```

브라우저에서 쓸 때는 같은 패키지의 번들판을 CDN으로 불러오거나 위 코드를 서버에서 돌려 결과 SVG만 내려주면 됩니다.

## 3. Python으로 만들기

[segno](https://pypi.org/project/segno/)는 의존성이 없는 QR 라이브러리입니다. 파일 확장자를 `.svg`로 주면 SVG로 저장됩니다.

```bash
pip install segno
```

```python
import segno

qr = segno.make('https://www.cardmelo.com/', error='m')  # 로고를 얹을 거면 'h'
qr.save('qr.svg', scale=10, border=4, dark='#111111')
```

## 인쇄할 때 주의할 점

- **여백을 지키세요.** QR 네 변에는 모듈 4칸 이상의 빈 공간(quiet zone)이 있어야 합니다. 디자인하다가 여백을 잘라내면 스캔이 안 됩니다.
- **크기는 스캔 거리의 1/10 이상.** 30cm 거리에서 찍는 명함이라면 QR 한 변이 최소 1.5~2cm는 되어야 안정적으로 읽힙니다.
- **대비를 확보하세요.** 바탕은 밝게, 점은 어둡게. 색을 뒤집거나(흰 점에 검은 바탕) 바탕과 점의 명도 차가 작으면 일부 카메라에서 인식이 떨어집니다.
- **로고를 가운데 넣을 거면 오류 보정을 H로.** QR은 일부가 가려져도 읽히도록 오류 보정 데이터를 품고 있는데, L(7%) / M(15%) / Q(25%) / H(30%) 중 H로 만들어야 로고가 차지하는 면적을 버틸 수 있습니다.
- **인쇄 전에 꼭 실물 크기로 뽑아서 여러 휴대폰으로 찍어 보세요.**

## 명함에 QR을 넣는다면

종이 명함의 QR에 모바일명함(연락처 저장, 링크 모음이 들어간 웹 명함)을 연결하면 받은 사람이 찍는 것만으로 연락처를 저장할 수 있습니다. 자세한 방법은 [종이 명함에 QR코드 넣는 법](https://www.cardmelo.com/guide/qr-business-card/)에 정리되어 있고 모바일명함 자체는 [카드멜로](https://www.cardmelo.com/)에서 무료로 만들 수 있습니다.

## 라이선스

이 문서는 자유롭게 퍼가서 써도 됩니다(CC BY 4.0). 출처로 이 저장소나 [cardmelo.com](https://www.cardmelo.com/)을 적어 주세요.
