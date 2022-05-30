{
    const houseElem = document.querySelector('.house');
    const progress_bar = document.querySelector('.progress-bar');
    const stageElem = document.querySelector('.stage');
    //offsetHeight = body의 전체 사이즈 , innerHeight = 현재창의 max height(한번에 보여지는 height)
    let maxSizeHeight;
    //.house css에서 시작지점으로 설정한 490값을 빼주기 위함 - transform: translateZ(-490vw); 
    const defaultZHeight = 490;
    // 마지막 스크롤이 끝났을 경우 보여지는 여백 설정(1000이 꽉찬화면)
    const 여백 = 970;
    //마우스 위치를 담을 변수 선언
    const mousePos = {x: 0, y:0};

    //초기화 작업
    function initializaion() {
        resizeHandler();
        setEvents();
    }
    
    //사이즈의 값을 동적으로 받아옴
    function resizeHandler() {
        maxSizeHeight = document.body.offsetHeight - window.innerHeight;
    }

    // 이벤트 등록 함수
    function setEvents() {
        //scroll의 따라 house의 transform : translate를 변경하기 위한 이벤트
        window.addEventListener('scroll',function() {
            const scrollPer = pageYOffset / maxSizeHeight;
            const zMove = scrollPer * 여백 - defaultZHeight;
            houseElem.style.transform = `translateZ(${zMove}vw)`;
            
            //progress bar
            progress_bar.style.width = (scrollPer * 100) + '%';
        });//3번째 인자 = false가 기본

        window.addEventListener('mousemove',function(e) {
            //(e.clientX / window.innerWidth) -> 좌측 끝 지점 = 0,0 -> 우측 끝 지점 = 1,1
            //0,0을 중앙으로 놓고 y지점 위쪽이 1, 아래쪽이 -1
            //x 지점의 좌측이 -1 , 우측이 1로 만드는 계산식.
            mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
            mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
            const pos = 5;

            // rotateX 축으로 회전 = x축을 기준으로 상하로 회전(x축과 반대로 회전)
            // rotateY 축으로 회전 = y축을 기준으로 좌우로 회전(y축과 반대로 회전)
            //그렇기 때문에 마우스 포지션의 반대 값을 주입해준다.
            stageElem.style.transform = `rotateX(${mousePos.y*pos}deg) rotateY(${mousePos.x*pos}deg)`;
        });

        //window의 사이즈가 변경 될때 마다 max의 사이즈를 다시 가져옴.
        window.addEventListener('resize',resizeHandler);
    }
 
    initializaion();
}