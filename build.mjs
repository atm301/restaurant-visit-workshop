import fs from 'fs';

// p1 頁首＋樣式；p2 到 p8 各段內容；p9 資料（開 script）；p10 邏輯；p11 事件（關 script）
const parts = ['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11'];
let out = '';
for (const p of parts) {
  if (!fs.existsSync(p + '.html')) continue;
  let s = fs.readFileSync(p + '.html', 'utf8');
  if (p === 'p9') {
    const i = s.lastIndexOf('</script>');
    if (i < 0) { console.error('p9 找不到 </script>'); process.exit(1); }
    s = s.slice(0, i) + s.slice(i + 9);
  }
  out += s;
}
fs.writeFileSync('index.html', out, 'utf8');

const blocks = [...out.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
let bad = 0;
blocks.forEach((m, i) => {
  const tag = m[0].slice(0, m[0].indexOf('>'));
  if (/\bsrc=/.test(tag)) return;
  if (/ld\+json/.test(tag)) { try { JSON.parse(m[1]); } catch (e) { bad++; console.error('JSON-LD 格式錯誤：' + e.message); } return; }
  try { new Function(m[1]); } catch (e) { bad++; console.error('script#' + i + ' 語法錯誤：' + e.message); fs.writeFileSync('_bad' + i + '.js', m[1], 'utf8'); }
});

// 重複 id 檢查
const ids = [...out.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
const dup = ids.filter((v, i) => ids.indexOf(v) !== i);
if (dup.length) { bad++; console.error('重複 id：' + [...new Set(dup)].join('、')); }

const kb = (Buffer.byteLength(out, 'utf8') / 1024).toFixed(0);
const em = (out.match(/—/g) || []).length;
console.log('已合併 index.html　' + kb + ' KB　script 區塊 ' + blocks.length + ' 個　語法錯誤 ' + bad + ' 個　全形破折號 ' + em + ' 個　id ' + ids.length + ' 個');
if (/�/.test(out)) console.error('⚠️ 有亂碼字元');
if (bad || em) process.exit(1);
