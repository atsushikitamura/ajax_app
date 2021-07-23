const buildHTML = (XHR) => {
  // buildHTMLという関数を35行目で呼び出し
  const item = XHR.response.post;
    // レスポンスの中から投稿されたメモ(form_with)の内容を抽出
    // XHR.response.postで値が取れるのは、postsコントローラーのcreateアクションにrender json: {post: post}と記述されていることで、postというキーと投稿されたメモの内容が紐付いているから
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
        // HTMLの生成は処理の本質ではないので最上部に切り出し、buildHTML(XHR)という関数を定義。「戻り値は新規投稿内容を含むHTML」
      formText.value = "";
        // フォームに残っている値をリセット。formText.valueで投稿内容を取得できる。
    };
  });
 };
 
 window.addEventListener('load', post);