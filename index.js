//constで再代入できない変数を定義。formから受け取った値をformという変数に入れている。
//このformも実はオブジェクトである。
//document」オブジェクトを活用することで、Webページを構成しているHTML要素へプログラム上から簡単にアクセスできる
//getElementById()」メソッドは、指定したID属性を持つHTML要素を取得することができるメソッド
const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

//画面をリロードしたときにローカルストレージから取得して空にならないようにする。
//SON.parse() JSON.parse() メソッドは文字列を JSON として解析し、文字列によって記述されている JavaScript の値やオブジェクトを構築します。 任意の reviver 関数で、生成されたオブジェクトが返される前に変換を実行することができます。
//localStorageからデータを取得するには、getItemメソッドを使用します。 引数にキーの名称を指定することで、そのキーに応じた値が戻り値として返却されます。
const todos = JSON.parse(localStorage.getItem("todos"));

//これだけで「todosが空じゃなかったら」という意味になる。型変換（空はfolseだから）
//forEach メソッドを使うと配列に含まれる要素を順に取り出し、記述したコールバック関数渡して処理する
//forEach文では、配列の各要素に対する繰り返し処理を一括で指示することができます。
//var array = [配列データ];
//array.forEach(コールバック関数);って形
//todoがあるなら、todoに対してaddを行う

if (todos) {
 todos.forEach(todo => {
  add(todo);
 });
}

//submitとはエンターされた時のこと。consoleログを書くことで動作確認を行えるようにしている。
//オブジェクトで考えると、これはformというオブジェクトにメソッドを付与している
//addEventListener マウスによるクリックやキーボードからの入力といった様々なイベント処理を実行するメソッド。
form.addEventListener("submit", function (event) {
 event.preventDefault(); //上のeventおよびこの１文によりエンターされたときにリロードされるのを防いでくれる。
 add();
});

//functionタグでaddという関数を定義する。(様々な処理をまとめて名前をつける)
// クラスを指定したのは、デザインを当てるため
//if文にして空のものまでリスト化するのを防いでいる。
//if(条件文){処理}の形
//saveDataという関数を先に書くことで使われた方を明確にする。（疑問上から下に流れるものではないのか）

//createElement()はHTMLの要素を作る時に使われます。主にDOM操作で使用され、appendChild()とセットで使われています。
//動的にHTMLの要素を作成する時に使用され、すべて記入されたらボタンを表示するなど動的なサイトを作成できます。
//innertextで挿入
//classListの後にメソッドを定義する(add）)ことでクラスを追加できる。
//appendChild() メソッドで html に liタグを追加しています。
//listというドキュメントを作る。ユーザーの入力した値はinput.valueなのでそれを取得する。
// クラスを指定したのは、デザインを当てるため。
//appendChildにてliをulの子タグとして登録した。
//最後のフォームのなかを空にして処理を終える。

function add(todo) {
 let todoText = input.value;

 if (todo) {
  todoText = todo.text;
 }

 if (todoText) {
  const li = document.createElement("li");
  li.innerText = todoText;
  li.classList.add("list-group-item");

  if (todo && todo.completed) {
   li.classList.add("text-decoration-line-through");
  }

  //右クリックされたときにイベントが発生するようにする。（contextmenuが右クリックのこと）
  li.addEventListener("contextmenu", function (event) {
   event.preventDefault(); //右クリックしたときに出るやつをブロックする。
   li.remove(); //右クリックしたらデータを消すようにする。
   saveDate(); //ローカルストレージも同様とする
  });

  //左クリックしたら見え消しで完了させる機能をつける
  li.addEventListener("click", function () {
   li.classList.toggle("text-decoration-line-through"); //toggleによって、なければつけるし、あれば消すという処理を行う。
   saveDate();
  });

  //appendChildで(li)の最後尾に要素を追加する

  ul.appendChild(li);
  input.value = "";
  saveDate();
 }
}

//saveDateという関数を定義。リストに入力したものが入っているからそれらを取得してlistsという変数に入れる。
//forEachでリストの中身全てに処理を適用（for文の簡略化）
//querySelectorAllを使うと、セレクタの条件に一致する要素をすべて取得できます。
function saveDate() {
 const lists = document.querySelectorAll("li");
 let todos = [];

 lists.forEach(list => {
  //新しくオブジェクトを定義して完了状態(completed)をローカルストレージで保持できるようにする。
  let todo = {
   text: list.innerText,
   completed: list.classList.contains("text-decoration-line-through")
  };

  todos.push(todo);
 });
 //ローカルストレージの保村。JSONに直しておくと文字列となり、後々扱いが楽になる
 localStorage.setItem("todos", JSON.stringify(todos));
}
