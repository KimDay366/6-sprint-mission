export default class Article {
  constructor(title, content, writer, likeCount = 0) {
    this.title = title;
    this.content = content;
    this.writer = writer;
    this.likeCount = likeCount;
    this.createdAtData = `${new Date().getFullYear()}년 ${
      new Date().getMonth() + 1
    }월 ${new Date().getDate()}일`;
    this.createdAtTime = `${new Date().getHours()}시 ${new Date().getMinutes()}분 ${new Date().getSeconds()}초`;
  }

  like() {
    this.likeCount++;
  }
}
