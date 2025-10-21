import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://panda-market-api-crud.vercel.app/',
    timeout : 3000,

});

export default class ArticleServiceAxios{

    async getArticleListAxios(queryParams){

        // 에러 처리 - page
        if( typeof(queryParams.page) !== "number" || queryParams.page < 1 ){
            throw new Error("page에 숫자를 입력 해 주시기 바랍니다");
            return;
        }

        // 에러 처리 - page size
        if( typeof(queryParams.pageSize) !== "number" || queryParams.pageSize < 1 ){
            throw new Error("pageSize에 숫자를 입력 해 주시기 바랍니다");
            return;
        }
        
        // keyword가 있는 경우 에러처리 
        if(queryParams.keyword && !queryParams.keyword.trim()){
            throw new Error("올바른 키워드를 입력 해 주시기 바랍니다.");
            return;
        }

        // 데이터 통신 영역
        try{
            const res = await instance.get('articles', {
                params : {
                    page: queryParams.page,
                    pageSize : queryParams.pageSize,
                    orderBy : queryParams.orderBy,
                    keyword : queryParams.keyword,
                }
            });

            console.log(res.data);
            return res.data;

        }catch(err){
            console.error(err);
        }
    }

    async getArticleAxios(id){

        // 에러처리 - id
        if(!id || typeof(id) !== "number"|| id < 1){
            // id 숫자 크기 제한은 규정을 알지 못해 1보다 작은 수는 사용 불가하도록 작성하였습니다.
            throw new Error("올바른 숫자를 입력 해 주시기 바랍니다");
            return;
        }

        // 데이터 통신 영역
        try{

            const res = await instance.get(`articles/${id}`);

            // params 안에 들어가는 객체는 ?key=value 형태로 사용 됨
            // 따라서 해당 방식으로 query string 이 사용되지 않으면 
            // 위와 같이 직접 입력 방식으로 사용해야함.

            // params 입력방식 사용 불가!
            // const res = await instance.get('articles', {
            //     params: {
            //         id,
            //     }
            // });

            console.log(res.data);
            return res.data;

        }catch(err){
            console.error(err);
        }
    }


    async createArticleAxios(servayData){

        // 에러처리 - title, content
        // 타이틀과 컨텐츠 중 값이 없음이 발생하면 메서드 종료
        if(!servayData.title?.trim() || !servayData.content?.trim() ) {
            throw new Error("data 입력을 확인 해 주세요");
            return;
        }// image 값이 없는 경우 서버에서 걸러내므로 생략

        // 데이터 통신 영역
        try{
            const res = await instance.post('articles',servayData);

            console.log(res.data);
            return res.data;
        }catch(err){
            console.error(err);
        }
    }


    async patchArticleAxios({id, title, content, image}){

        // 최종 데이터로 사용 할 객체
        const patchArtData = {};

        // 나머지 각 항목 별 값 확인 후 넣기 
        if(image) patchArtData.image = image;

        if(title?.trim() ) patchArtData.title = title;

        if(content?.trim() ) patchArtData.content = content; 

        console.log(patchArtData);
        
        // 데이터 통신 영역
        try{
            const res = await instance.patch(`articles/${id}`,patchArtData);

            console.log(res.data);
            return res.data;

        }catch(err){
            console.error(err);
        }    
    }

    async deleteArticleAxios(id){
        
        // 에러 처리 - id
        if(!id || typeof(id) !== "number"|| id < 1){
            // id 숫자 크기 제한은 규정을 알지 못해 1보다 작은 수는 사용 불가하도록 작성하였습니다.
            throw new Error("올바른 숫자를 입력 해 주시기 바랍니다");
            return;
        }

        // 데이터 통신 영역
        try{

            const res = await instance.delete(`articles/${id}`);

            console.log('삭제완료', res.data);
            return res.data;

        }catch(err){
            console.error(err);
        }
    }

}