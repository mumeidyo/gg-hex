import { ScriptFunction } from "@shared/schema";

/**
 * GameGuardian用のLuaスクリプトを生成します
 * @param functions スクリプト関数のリスト
 * @returns 生成されたスクリプトの文字列
 */
export function generateScript(functions: ScriptFunction[]): string {
  if (!functions || functions.length === 0) {
    return "";
  }

  // クリエイター名を取得（最初の関数から）
  const creatorName = functions[0].creatorName;
  
  // スクリプトのヘッダー部分
  let scriptContent = `--[=[
=================================================
カスタムHEX置換スクリプト
作成者: ${creatorName}
作成日: ${new Date().toLocaleDateString('ja-JP')}
GameGuardian用Luaスクリプト
=================================================
]=]

function Main()
  gg.setVisible(false)
  gg.toast("カスタムスクリプトを実行中...")
`;

  // 各機能をスクリプトに追加
  functions.forEach(func => {
    scriptContent += `
  -- ${func.functionName}
  ReplaceHexCode("${func.beforeHex}", "${func.afterHex}")`;
  });

  // スクリプトのフッター部分
  scriptContent += `

  gg.toast("すべての処理が完了しました")
  gg.setVisible(true)
end

--[=[
HEXコードを置換する関数
@param beforeHex 置換前のHEXコード
@param afterHex 置換後のHEXコード
]=]
function ReplaceHexCode(beforeHex, afterHex)
  gg.clearResults()
  gg.searchNumber("0x" .. beforeHex, gg.TYPE_BYTE)
  
  local count = gg.getResultsCount()
  if count == 0 then
    gg.toast(beforeHex .. " が見つかりませんでした")
    return
  end
  
  local results = gg.getResults(count)
  for i, v in ipairs(results) do
    results[i].value = "0x" .. afterHex
  end
  
  gg.setValues(results)
  gg.toast(beforeHex .. " を " .. afterHex .. " に置換しました (" .. count .. "件)")
  gg.clearResults()
end

-- スクリプトの実行
Main()
`;

  return scriptContent;
}

/**
 * 生成したスクリプトをダウンロードします
 * @param scriptContent スクリプトの内容
 * @param fileName ファイル名
 */
export function downloadScript(scriptContent: string, fileName: string = "custom_script.lua"): void {
  const blob = new Blob([scriptContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.style.display = "none";
  
  document.body.appendChild(a);
  a.click();
  
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}