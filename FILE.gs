/* ToDO:
 ・ダウンロード
   - toCSV をちゃんとしたものにする（項目内にカンマが含まれているケースなど）
   - Shift-JIS が文字化けするのた対応が必要
   - オプション：文字コード指定（デフォルト：Shift-JIS）
   - オプション：区切り文字指定（デフォルト：カンマ）
   - オプション：ファイル名指定（デフォルト：download.csv）
   - オプション：ダウンロードダイアログの大きさ指定
 ・アップロード
   - オプション：文字コード指定（デフォルト：Shift-JIS）
   - オプション：区切り文字指定（デフォルト：カンマ）
 */

var FILE = {};
FILE.data; // ダウンロードデータをHTMLファイル内に埋め込むためグローバル変数として定義する必要がある

FILE.download = function(arrays){
  FILE.data = FILE.toCSV(arrays);
  FILE.showDialog('downloadFile');
}

FILE.showDialog = function(htmlFileName){
  var html = HtmlService.createTemplateFromFile(htmlFileName)
              .evaluate()
              .setWidth(300)
              .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, "ファイルダウンロード");  
}

FILE.toCSV = function(arrays) {
  var data = [];
  arrays.forEach(function(array){
    data.push(array.join(','));
  })
  return data.join('\n');
}

// downloadFile.html から呼び出される
FILE.getDownloadData = function() {
  return FILE.data;
}
