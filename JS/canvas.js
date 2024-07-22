window.onload = function () {
    const canvas = document.getElementById('canvas');  //canvas要素
    const ctx = canvas.getContext('2d');  //2D描画

    let key;  //キーボード
    let score_Board = document.getElementById('score');  //スコア要素
    let score = 0;  //スコア格納
    const time = document.getElementById('time');  //タイマー要素取得


    //キーボード入力判定
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            console.log('Enterが押されました');   //確認用
            draw();  //GAME START  描画開始関数の実行 
            timer();  //タイマーカウント開始
        }
    });

    //Enter押下で描画開始
    function draw() {
        // ボックスの位置をランダム設定
        let square = {
            x: Math.floor(Math.random() * 580 + 1),//縦軸。※0が返ってくる時もある為、1足している。
            y: Math.floor(Math.random() * 580 + 1),
            w: 20,
            h: 20
            // Math.floor() ：引数の値の小数点以下を切り捨てて整数を返す。
            // Math.random() 関数は、 0 以上 1 未満 (0 は含むが、 1 は含まない) の範囲で浮動小数点の擬似乱数を返す。引数；無し、　返値：0 (含む) から 1 (含まない) までの擬似乱数である浮動小数点数
        };

        //キャンバス上でのオブジェクトがクリックされたか判定
        canvas.addEventListener('click', function (e) {
            const rect = canvas.getBoundingClientRect();  //キャンバスの位置とサイズ（x:600,y:600）を取得。e.target：canvas要素を指す。
            // Element.getBoundingClientRect() メソッドは、要素の寸法と、そのビューポート（left, top, right, bottom, x, y, width, height）に対する相対位置に関する情報を返す。
            // ビューポート：https://developer.mozilla.org/ja/docs/Web/API/Element/getBoundingClientRect/element-box-diagram.png

            //キャンバス要素上のクリックされた位置を計算
            const point = {
                x: e.clientX - rect.left,  //clientX：クリックされたビューポート上のx座標。
                y: e.clientY - rect.top    //clientY：クリックされたビューポート上のy座標。
            };
            //判定基準
            const hit =
                (square.x <= point.x && point.x <= square.x + square.w)  // 横方向の判定
                && (square.y <= point.y && point.y <= square.y + square.h)  // 縦方向の判定

            //要素squareがクリックされか判定
            if (hit) {
                // alert('clicked!');
                scoreCount();  //スコアカウント関数実行
                draw();
            }
        });



        // -----描画-----
        ctx.clearRect(0, 0, canvas.width, canvas.height);  //キャンバス全体をリセット
        // 構文 clearRect(x, y, width, height)

        // ボックスの描画
        ctx.fillStyle = 'red';  //色
        ctx.fillRect(square.x, square.y, square.w, square.h);
    };
    
    //-----カウントタイマー-----
    function timer(){
        // タイマー要素のHTMLを取得
        let count = parseInt(time.textContent, 10);  //parseInt() 関数は、文字列の引数を整数値で返す。構文：parseInt(string, radix)※第二引数：１０進数
        const id = setInterval(function(){  //setInterval() メソッドは一定の遅延間隔を置いて関数やコードスニペットを繰り返し呼び出す。返値：インターバルを一意に識別するインターバル ID を返す。
            count--;
            time.textContent = count;

            //カウントが0になったらタイマーを停止する
            if(count <= 0){
                gameOver(id);
            } 
        },1000);//１秒毎にsetInterval()を実行。
    };

    //-----スコアカウント-----
    function scoreCount() {
        score++;  //要素をクリックするとプラス1点
        score_Board.innerText = score;  //点数を表示
    };

    //クリックされた数に応じてランクを判定
    function rankCheck(score){
        let text;

        if(score < 20){
            text = `あなたの反射神経ランクはCです。\nBランクまであと${20-score}点です`;
        }else if(score >= 20 && score < 25){
            text = `あなたの反射神経ランクはBです。\nAランクまであと${25-score}点です`;
        }else if(score >= 25 && score < 30){
            text = `あなたの反射神経ランクはAです。\nSランクまであと${30-score}点です`;
        }else if(score >= 30){
            text = `あなたの反射神経ランクはSです。\n最高ランクおめでとうございます！！`;
        }
        return `スコアは${score}点です！\n${text}`;
    };

    // ゲームを終了
    async function gameOver(id){  //async function：非同期関数を宣言し、その中で awaitキーワードを使うことで、Promise(約束)が解決されるまで関数の実行を一時停止することができる。
        clearInterval(id);  //タイマー停止。
        await sleep(500);  //await: 非同期関数内で使用され、Promiseが処理されるまで待機。//0.5秒待機するPromiseを返すsleep関数を呼び出し。

        // alert('SCOREは' + score + '点です');
        const result = confirm(rankCheck(score));  //confirm：ブラウザーへ任意のメッセージ付きのダイアログを表示し、ユーザーがダイアログを承認またはキャンセルするまで待機。//返値:論理型で、OK (true) とキャンセル (false) 
        
        if(result == true){
            window.location.reload();  //location.reload()：現在の URL のリソースを再読み込み。
        }

    };

    function sleep(ms) {
        return new Promise(function(resolve){  //sleep関数：指定されたミリ秒だけ待機するPromise処理結果を返す。
            setTimeout(function(){  //指定された時間（ms）後にコールバック関数を実行。resolveを呼び出してPromiseを処理。//setTimeout() ：指定された時間（ms）後、関数または指定されたコード実行。
                resolve()}, ms);
        });
    };
};






