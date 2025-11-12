import Article from './class/Article.js';
import ArticleService from './api/articleService.js';

import Product from './class/Product.js';
import ElectronicProduct from './class/ElectronicProduct.js';
import ProductService from './api/productService.js';

// class Article test
const data1 = ['두번쨰 스프린트 미션 V', '증말~ 어렵다~ ㅋㅋㅋ', 'JS'];
const dataArt1 = new Article(...data1);
console.log(dataArt1);

// class ArticleService test
async function testArticle() {
  const arttest = new ArticleService();

  // ====== GET 함수 2종 테스트 ======
  const artApiList = {
    page: 1,
    pageSize: 10,
    keyword: '',
  };
  const articles = await arttest.getArticleList(artApiList);

  const artApiId = 4834;
  const onlyArticle = await arttest.getArticle(artApiId);

  // ====== POST 함수 테스트 ======
  const artApiData = {
    title: 'testJS',
    content: 'test를 진행합니다 :)',
    image: 'http://sample.jpg',
  };
  const createArticle = await arttest.createArticle(artApiData);

  // ====== PATCH 함수 테스트 ======
  const artApiUpData = {
    id: 5011,
    title: 'testJS123',
    content: 'test를 다시 진행합니다 :)',
    image: 'http://sample222222222.jpg',
  };
  const updateArticle = arttest.patchArticle(artApiUpData);

  // ====== DELETE 함수 테스트 ======
  const artdelApiId = 4834;
  const deleteArticle = arttest.deleteArticle(artdelApiId);
}

testArticle();

// class Product / ElectronicProduct test
const data2 = [
  '여행용 티슈',
  '가성비 캡숑짱b',
  100000,
  '',
  'http://sample.jpg',
];
const dataProd1 = new Product(...data2);
console.log(dataProd1);

const data3 = [
  '개굴가습기',
  '개굴 개굴 개구리, 노래하며 가습해요',
  100000,
  '전자제품',
  'http://sample.jpg',
  '송송전자',
];
const dataProd2 = new ElectronicProduct(...data3);
console.log(dataProd2);

// class ProductService test
async function testProduct() {
  const protest = new ProductService();

  // ====== GET 함수 2종 테스트 ======
  const prodApiList = {
    page: 1,
    pageSize: 10,
    keyword: '',
  };
  const products = await protest.getProductList(prodApiList);

  const prodApiId = 2530;
  const onlyProduct = await protest.getProduct(prodApiId);

  // ====== CREATE 함수 테스트 ======
  const prodApiData = {
    name: '알린 스피커',
    description: "귀여운 토이스토리 알린 캐릭터 스피커 'v' ",
    price: 10,
    images: ['https://example.com/...'],
    isEletron: '아니오',
  };
  const createProduct = await protest.createProduct(prodApiData);

  // ====== PATCH 함수 테스트 ======
  const prodApiUpData = {
    id: 2530,
    name: '라이언 스피커',
    description: '카카오 캐릭터 스피커 ~,~ ',
    price: 10,
    images: ['https://example.com/...'],
    isEletron: '네',
  };
  const updateProduct = await protest.patchProduct(prodApiUpData);

  // ====== DELETE 함수 테스트 ======
  const prodDelApiId = 2530;
  const deleteProduct = await protest.deleteProduct(prodDelApiId);
}

// testProduct();

// +++++ 추가 작업 +++++
import ArticleServiceAxios from './api/articleSevice_axios.js';

// class ArticleServiceAxios test
async function testArticleAxios() {
  const artaxitest = new ArticleServiceAxios();

  // ====== GET 함수 2종 테스트 ======
  const artAxiosApiList = {
    page: 1,
    pageSize: 5,
    orderBy: 'recent',
    keyword: '',
  };
  const articlesAxios = await artaxitest.getArticleListAxios(artAxiosApiList);

  const artAxiosApiId = 5012;
  const onlyArticleAxios = await artaxitest.getArticleAxios(artAxiosApiId);

  // ====== CREATE 함수 테스트 ======
  const artAxiosApiData = {
    title: 'testJS',
    content: 'test를 진행합니다 :)',
    image: 'http://sample.jpg',
  };
  const creatArticleAxios = await artaxitest.createArticleAxios(
    artAxiosApiData
  );

  // ====== PATCH 함수 테스트 ======
  const artAxiosApiUpData = {
    id: 5012,
    title: 'testJS123456',
    content: 'test를 다시다시 진행합니다 :)',
    image: 'http://sample222222222.jpg',
  };
  const updateArticleAxios = await artaxitest.patchArticleAxios(
    artAxiosApiUpData
  );

  // ====== DELETE 함수 테스트 ======
  const artAxiosDelApiId = 5012;

  const deleteArticleAxios = await artaxitest.deleteArticleAxios(
    artAxiosDelApiId
  );
}

// testArticleAxios();

console.log(123);
