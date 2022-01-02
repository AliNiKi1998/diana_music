export const scrollTop = () => {
    // setTimeout(() => {
    //     let scrollY = window.scrollY;
    //     let currentTime = duration;
    //     let speed = 10;
    //     let animate = () => {
    //         if (currentTime < 0) return;
    //         setTimeout(() => {
    //             scrollY -= scrollY / (currentTime / speed);
    //             window.scrollTo({
    //                 top: scrollY,
    //                 left: 0,
    //                 // behavior: "smooth"
    //             })
    //             currentTime -= speed;
    //             animate();
    //         }, speed);
    //     }
    //     if (scrollY != 0) animate();
    // }, delay);
    window.scrollTo({
        top: 0,
        left: 0,
    })
}
