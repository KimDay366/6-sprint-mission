// import Article from "../class/Article.js";
// class Article 을 써보고 싶었으나 
// class Article 에서 선언된 프로퍼티와 HTTP 메소드에 사용될 프로퍼티가 일부 달라 
// 사용하려다 말았습니다.

export default class ArticleService{


    getArticleList({page, pageSize, keyword}){

        // 에러처리 - page
        if( typeof(page) !== "number" || page < 1 ){
            throw new Error("page에 숫자를 입력 해 주시기 바랍니다");
            return;
        }

        // 에러처리 - page size
        if( typeof(pageSize) !== "number" || pageSize < 1 ){
            throw new Error("pageSize에 숫자를 입력 해 주시기 바랍니다");
            return;
        }

        let url = `https://panda-market-api-crud.vercel.app/articles?page=${page}&pageSize=${pageSize}&orderBy=recent`;

        // 키워드 정보 확인 및 에러처리
        if(keyword && !keyword.trim()){
            throw new Error("올바른 키워드를 입력 해 주시기 바랍니다.");
            return;

        }else if(keyword){
            url = `https://panda-market-api-crud.vercel.app/articles?page=${page}&pageSize=${pageSize}&orderBy=recent&keyword=${keyword}`;
        }

        // 데이터 통신 영역
        fetch(url)
        .then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data);
            return data;
        }).catch((err)=>{
            console.log(err)
        });
    }

    getArticle(id){

        // 에러처리 - id 
        if(!id || typeof(id) !== "number"|| id < 1){
            // id 숫자 크기 제한은 규정을 알지 못해 1보다 작은 수는 사용 불가하도록 작성하였습니다.
            throw new Error("올바른 숫자를 입력 해 주시기 바랍니다");
            return;
        }

        const url = `https://panda-market-api-crud.vercel.app/articles/${id}`;

        // 데이터 통신 영역
        fetch(url)
        .then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data);
            return data;
        }).catch((err)=>{
            console.log(err);
        });
    }


    createArticle({title, content, image}){

        // 에러처리 - 타이틀, 컨텐츠 
        if(!title?.trim() || !content?.trim() ) {
            throw new Error("data 입력을 확인 해 주세요");
            return;
        }// image 값이 없는 경우 서버에서 걸러내므로 생략

        // 최종 객체
        const articleData = {
            title,
            content,
            image,
        }

        const url = 'https://panda-market-api-crud.vercel.app/articles';

        // 데이터 통신 영역
        fetch(url,{
            method: "POST",
            headers: {
                accept : 'application/json',
                'Content-Type': 'application/json', 
            },
            body : JSON.stringify(articleData),
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data);
        }).catch((err)=>{
            console.log(err)
        });

    }


    patchArticle({id, title, content, image}){

        // 최종 데이터로 사용 할 객체
        const patchArtData = {};

        // 나머지 각 항목 별 값 확인 후 넣기 
        if(image) patchArtData.image = image;

        if( title?.trim() ) patchArtData.title = title;

        if( content?.trim() ) patchArtData.content = content; 

        // console.log(id, patchArtData);

        const url = `https://panda-market-api-crud.vercel.app/articles/${id}`;

        // 데이터 통신 영역
        fetch(url,{
            method: "PATCH",
            headers: {
                accept : 'application/json',
                'Content-Type': 'application/json', 
            },
            body : JSON.stringify(patchArtData),

        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data);
        }).catch((err)=>{
            console.log(err)
        });        
    
    }

    deleteArticle(id){
        
        // 에러처리 - id
        if(!id || typeof(id) !== "number"|| id < 1){
            // id 숫자 크기 제한은 규정을 알지 못해 1보다 작은 수는 사용 불가하도록 작성하였습니다.
            throw new Error("올바른 숫자를 입력 해 주시기 바랍니다");
            return;
        }

        const url = `https://panda-market-api-crud.vercel.app/articles/${id}`;

        // 데이터 통신 영역
        fetch(url,{
            method : "DELETE",
            header : {
                accept : 'application/json',
            }
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(`삭제 성공 : ${data.id}`);
            return data;
        }).catch((err)=>{
            console.log(err)
        });
    }

}