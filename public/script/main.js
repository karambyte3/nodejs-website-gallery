// Set variable for scrolling
let oldValue = 0;
window.addEventListener('scroll', function(e){
    // Get the new Value when scroll
    let newValue = window.pageYOffset;

    //Subtract the two and conclude
    if(oldValue - newValue > 0){
        // When scroll UP
        // console.log("Up");
        document.getElementById("navbar").style.height = "100px";

        document.getElementById("title").style.marginTop = "23px";
        document.getElementById("menu").style.marginTop = "40px";
    } else if(oldValue - newValue < 0){
        // When scroll DOWN
        // console.log("Down");
        document.getElementById("navbar").style.height = "70px";
        document.getElementById("navbar").style.position = "fixed";
        document.getElementById("title").classList.add('scroll-brand');
        document.getElementById("navbar").style.top = "0";

        document.getElementById("title").style.marginTop = "10px";
        document.getElementById("menu").style.marginTop = "30px";
    }
    
    // Update the old value
    oldValue = newValue;
});