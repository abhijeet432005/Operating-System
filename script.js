function wallpaper() {

    let images = ["Assets/earth.jpg", "Assets/spider.jpg", "Assets/rog.jpg", "Assets/monster.jpg"]

    let wallpaper = document.querySelector("#wallpaper")
    let background = document.querySelector(".back")
    let change = document.querySelector("#Change")

    wallpaper.addEventListener('click', () => {
        let value = Math.floor(Math.random() * images.length)
        let random = images[value]
        console.log(random)

        background.setAttribute("src", random)

    })


    change.addEventListener('click', () => {
        let value = Math.floor(Math.random() * images.length)
        let random = images[value]
        console.log(random)
        background.setAttribute("src", random)

    })

}

wallpaper()


function DragDrop(element) {
    let header = element.querySelector(".upper")

    header.addEventListener('mousedown', (e) => {
        let shiftX = e.clientX - element.getBoundingClientRect().left
        let shiftY = e.clientY - element.getBoundingClientRect().top

        function moveAt(pageX, pageY) {
            element.style.left = pageX - shiftX + 'px'
            element.style.top = pageY - shiftY + 'px'
        }

        function onMouseMove(e) {
            moveAt(e.pageX, e.pageY)
        }

        document.addEventListener('mousemove', onMouseMove)

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove)
        }, { once: true })
    })

    element.ondragstart = () => false
}

function IconDraggable(Icon) {

    Icon.addEventListener("mousedown", (e) => {

        let shiftX = e.clientX - Icon.getBoundingClientRect().left
        let shiftY = e.clientY - Icon.getBoundingClientRect().top

        // folder.style.zindex = 9

        function moveAt(pageX, pageY) {
            Icon.style.left = pageX - shiftX + "px"
            Icon.style.top = pageY - shiftY + "px"
        }

        moveAt(e.pageX, e.pageY)

        function onMouseMove(e) {
            moveAt(e.pageX, e.pageY)
        }

        document.addEventListener("mousemove", onMouseMove)

        Icon.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", onMouseMove)
        }, { once: true })
    })

    Icon.ondragstart = () => false
}


function IconMenu(element) {
    let menu = document.querySelector(".folder-menu")

    element.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();

        currentRightClickedFolder = element;

        menu.style.top = e.clientY + 'px'
        menu.style.left = e.clientX + 'px'
        menu.style.display = 'block'
    })

    document.addEventListener('click', () => {
        menu.style.display = 'none'
    })


}



function Delete() {
    let Del = document.querySelector('.delete');

    Del.addEventListener('click', () => {
        if (currentRightClickedFolder) {
            currentRightClickedFolder.remove();
            currentRightClickedFolder = null;
        }
    });
}
Delete()


function OpenClose(element, window) {
    element.addEventListener('click', () => {
        window.style.display = 'block'
    })

    let close = document.querySelectorAll(".close")

    close.forEach(elem => {
        elem.addEventListener('click', () => {
            let parentWindow = elem.closest('.terminal, .calculator');
            console.log(parentWindow)
            if (parentWindow) {
                parentWindow.style.display = 'none';
            }
        });
    });
}



function menuExpansion() {
    const menu = document.querySelector(".menu");
    const menuExpand = document.querySelector(".menu-expand");

    let flag = 0;

    menu.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent bubbling to document

        if (flag === 0) {
            menuExpand.style.opacity = 1;
            flag = 1;
        } else {
            menuExpand.style.opacity = 0;
            flag = 0;
        }
    });

    // Close when clicking outside
    document.addEventListener("click", () => {
        menuExpand.style.opacity = 0;
        flag = 0;
    });

    // If user clicks inside the expanded menu — don't close
    menuExpand.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}

menuExpansion()

function TaskBarSwitchOnOF() {
    let taskBar = document.querySelectorAll(".taskBar .img")

    taskBar.forEach(elem => {
        let flag = 0;
        elem.addEventListener('click', () => {
            if (flag === 0) {
                elem.style.backgroundColor = 'hsl(0, 0%, 100%, 0.5)'
                flag = 1
            }
            else {
                elem.style.backgroundColor = ''
                flag = 0
            }
        })

    });

}

TaskBarSwitchOnOF()


function controlMenu() {

    const desktop = document.querySelector("main");
    const menu = document.querySelector(".control-menu");


    desktop.addEventListener('contextmenu', (e) => {
        e.preventDefault();


        menu.style.top = e.clientY + 'px'
        menu.style.left = e.clientX + 'px'
        menu.style.display = 'block'
    })


    document.addEventListener('click', () => {
        menu.style.display = 'none'
    })
}


controlMenu()


function BrightnessControl() {

    let input_range = document.querySelector(".brightness .input_range")

    input_range.addEventListener('input', () => {
        let value = input_range.value

        let number = document.querySelector(".brightness .number")
        let line = document.querySelector('.brightness .line')

        number.innerHTML = value
        line.style.width = `${value}%`



        let display = document.querySelector("#display")

        let opacity = (value / 100)
        display.style.opacity = opacity
    })
}

BrightnessControl()


function VolumeControl() {
    let input_range = document.querySelector(".volume .input_range")

    input_range.addEventListener('input', () => {
        let value = input_range.value

        let number = document.querySelector(".volume .number")
        let line = document.querySelector('.volume .line')

        number.innerHTML = value
        line.style.width = `${value}%`
    })
}

VolumeControl()


function CreateFolder() {

    let newFolderBtn = document.querySelector("#Folder")
    let container = document.querySelector(".top")

    newFolderBtn.addEventListener('click', () => {
        let folder = document.createElement("div")
        folder.classList.add('folder')

        folder.innerHTML = `<img src="./Assets/folder.png" alt="">
                <span class="name-change">New folder</span>`


        folder.style.top = Math.floor(Math.random() * 400) + 'px'
        folder.style.left = Math.floor(Math.random() * 400) + 'px'

        container.appendChild(folder)
        IconDraggable(folder);
        folderOpenClose(folder);
        IconMenu(folder);
    })



}

CreateFolder()

function folderOpenClose(folder) {
    let open = document.querySelector(".folder-window")

    folder.addEventListener("dblclick", () => {
        // open.style.opacity = 1
        open.style.display = 'block'
    })


    let close = document.querySelector(".closeFolder");
    if (close) {
        close.addEventListener("click", () => {
            open.style.display = 'none'
        });
    }
}

const folderWindow = document.querySelector(".folder-window");
DragDrop(folderWindow);


// function CloseOpenCalculator() {



//     open.addEventListener('click', () => {
//         calculator.style.display = "block"
//     })

//     let close = document.querySelector(".closeCal");
//     if (close) {
//         close.addEventListener("click", () => {
//             calculator.style.display = 'none'
//         });
//     }
// }

// CloseOpenCalculator()


let openCal = document.querySelector("#calculator")
let calculator = document.querySelector(".calculator")

OpenClose(openCal, calculator)



const CalculatorWindow = document.querySelector(".calculator");
DragDrop(CalculatorWindow)




let openTerminalByMenu = document.querySelector("#Terminal")
let Terminal = document.querySelector(".terminal")
OpenClose(openTerminalByMenu, Terminal)
DragDrop(Terminal)