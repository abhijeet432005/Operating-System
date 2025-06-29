function DateTime() {
    let currentTime = document.querySelector("#current-time")
    let currentDate = document.querySelector("#current-Date")

    function UpdateTime() {
        let date = new Date()
        currentTime.innerHTML = date.toLocaleTimeString()
    }

    UpdateTime()
    setInterval(UpdateTime, 1000)

    let date = new Date()
    currentDate.innerHTML = date.toLocaleDateString()

}

DateTime()

function Calendar() {
    const monthYear = document.getElementById("month-year")
    const daysContainer = document.getElementById("days")
    const prevBtn = document.getElementById("prev")
    const nextBtn = document.getElementById("next")

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let currentDate = new Date()
    const today = new Date()

    function renderCalendar(date) {
        const year = date.getFullYear()
        const month = date.getMonth()

        const firstDayIndex = new Date(year, month, 1).getDay()
        console.log(firstDayIndex)
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        console.log(daysInMonth)

        monthYear.innerHTML = `${months[month]} ${year}`
        daysContainer.innerHTML = ""


        for (let i = 0; i < firstDayIndex; i++) {
            const emptyDiv = document.createElement("div")
            emptyDiv.classList.add("empty")
            daysContainer.appendChild(emptyDiv)
        }


        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement("div")
            dayDiv.innerHTML = i

            if (
                i === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                dayDiv.classList.add("today")
            }

            daysContainer.appendChild(dayDiv)
        }
    }

    // Prev/Next Button Handlers
    prevBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1)
        renderCalendar(currentDate)
    })

    nextBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1)
        renderCalendar(currentDate)
    })

    renderCalendar(currentDate)
}

Calendar()
let CalendarWindow = document.querySelector(".calender-window")
let openCalender = document.querySelector("#calander")
DragDrop(CalendarWindow)
OpenClose(openCalender, CalendarWindow)

function refresh() {
    let refresh = document.querySelector("#Refresh")

    refresh.addEventListener("click", () => {
        location.reload()
    })
}

refresh()

function ManagesZindexOfWindow() {

    let zIndexCounter = 10;

    function bringToFront(elem) {
        zIndexCounter++;
        elem.style.zIndex = zIndexCounter
    }

    function WindowZindex() {
        let allWindow = document.querySelectorAll(".window")

        allWindow.forEach(elem => {
            elem.addEventListener("mousedown", () => bringToFront(elem))
        })
    }

    WindowZindex()
}

ManagesZindexOfWindow()

function changeWallpaper() {
    let wallpaper = document.querySelectorAll(".card")
    let background = document.querySelector(".back")

    wallpaper.forEach(elem => {
        elem.addEventListener('click', () => {
            //    let img = elem.querySelector("img").getAttribute('src')
            let img = elem.childNodes[1].getAttribute('src')
            background.setAttribute('src', img)
        })
    })
}

changeWallpaper()
let openWallpaperIcon = document.querySelector("#wallpaper");
let change = document.querySelector("#Change")
let WallpaperWindow = document.querySelector(".wallpaper-window")
OpenClose(openWallpaperIcon, WallpaperWindow)
OpenClose(change, WallpaperWindow)
DragDrop(WallpaperWindow)

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



function OpenClose(element, window) {
    element.addEventListener('click', () => {
        window.style.display = 'block'
        ManagesZindexOfWindow()
    })

    let close = document.querySelectorAll(".close")

    close.forEach(elem => {
        elem.addEventListener('click', () => {
            let parentWindow = elem.closest('.terminal, .calculator, .wallpaper-window, .calender-window, .notes-window, .music-window, .google-search-window');
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
            menuExpand.style.display = 'block'
            flag = 1;
        } else {
            menuExpand.style.display = 'none'
            flag = 0;
        }
    });

    // Close when clicking outside
    document.addEventListener("click", () => {
        menuExpand.style.display = 'none';
        flag = 0;
    });

    // If user clicks inside the expanded menu — don't close
    menuExpand.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}

menuExpansion()

function AppMainMenu() {
    let mainMenu = document.querySelector("#main-menu")
    let mainMenuWindow = document.querySelector(".main-menu-window")
    let flag = 0;

    mainMenu.addEventListener("click", (e) => {
        e.stopPropagation();

        if (flag === 0) {
            mainMenuWindow.style.display = "block"
            flag = 1
        }

        else {
            mainMenuWindow.style.display = 'none'
            flag = 0
        }

    })

    document.addEventListener("click", () => {
        mainMenuWindow.style.display = 'none'
        flag = 0
    })
}

AppMainMenu()


function MainMenuApplication() {
    let apps = document.querySelectorAll(".app")

    const windows = [
        document.querySelector(".calculator"),       // id="0"
        document.querySelector(".wallpaper-window"), // id="1"
        null,                                        // id="2" (LinkedIn)
        null,                                        // id="3" (Weather)
        null,                                        // id="4" (Camera)
        document.querySelector(".terminal"),        // id="5"
        document.querySelector(".notes-window"),   // id="6" (Notes)
        null,                                        // id="7" (Map)
        document.querySelector(".google-search-window"),                                        // id="8" (Chrome)
        document.querySelector(".music-window"),                                        // id="9" (Music)
        null,                                        // id="10" (Code Editor)
        document.querySelector(".gallery-window"),                                        // id="11" (Gallery)
        document.querySelector(".calender-window")   // id="12" (Calendar)
    ];

    apps.forEach((elem, idx) => {
        elem.addEventListener("click", () => {
            let win = windows[idx]
            // console.log(win, idx)

            if (win) {
                win.style.display = "block";
                ManagesZindexOfWindow(win)
            }
        })
    })


    apps.forEach(app => {
        app.addEventListener("click", () => {
            const appName = app.dataset.app;
            const appWindow = document.querySelector(`.window[data-app="${appName}"]`);

            if (!appWindow) return;

            appWindow.style.display = "block";
            ManagesZindexOfWindow(appWindow);

            addRemoveAppToTaskbar(appName, app.querySelector("img").src);
        });
    });

}

MainMenuApplication()

function addRemoveAppToTaskbar(appName, iconSrc) {
    const taskbar = document.querySelector("#taskbar-apps");

    if (document.querySelector(`li[data-app="${appName}"]`)) return;

    const li = document.createElement("li");
    li.dataset.app = appName;
    li.innerHTML = `<img src="${iconSrc}" alt="${appName}" />`;

    li.addEventListener("click", () => {
        const win = document.querySelector(`.window[data-app="${appName}"]`);
        if (!win) return;

        if (win.style.display === "none") {
            win.style.display = "block";
            ManagesZindexOfWindow(win);
        } else {
            win.style.display = "none";
        }
    });

    taskbar.appendChild(li);

    const appWindow = document.querySelector(`.window[data-app="${appName}"]`);
    const closeBtn = appWindow?.querySelector(".close");

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            appWindow.style.display = "none";

            const icon = document.querySelector(`#taskbar-apps li[data-app="${appName}"]`);
            if (icon) icon.remove();
        });
    }
}

function toggleTaskbarHighlight(appName, isActive) {
    const taskbarIcon = document.querySelector(`.task-bar .apps li[data-app="${appName}"]`);
    console.log(appName)
    if (!taskbarIcon) return;

    taskbarIcon.classList.toggle("active", isActive);
}
function appHighlightEffect() {

    function showAppWindow(appName) {
        const appWindow = document.querySelector(`.window[data-app="${appName}"]`);
        if (!appWindow) return;

        appWindow.style.display = "block";
        ManagesZindexOfWindow(appWindow);
        toggleTaskbarHighlight(appName, true);
    }

    function hideAppWindow(appName) {
        const appWindow = document.querySelector(`.window[data-app="${appName}"]`);
        if (!appWindow) return;

        appWindow.style.display = "none";
        toggleTaskbarHighlight(appName, false);
    }

    document.querySelectorAll(".window .close").forEach(btn => {
        btn.addEventListener("click", () => {
            const parentWindow = btn.closest(".window");
            if (!parentWindow) return;

            const appName = parentWindow.dataset.app;
            hideAppWindow(appName);
        });
    });

    document.querySelectorAll(".app").forEach(app => {
        app.addEventListener("click", () => {
            const appName = app.dataset.app;
            showAppWindow(appName);
        });
    });

    document.querySelectorAll(".task-bar .apps li").forEach(icon => {
        icon.addEventListener("click", () => {
            const appName = icon.dataset.app;
            showAppWindow(appName);
        });
    });

}


appHighlightEffect()



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
    let number = document.querySelector(".brightness .number");
    let line = document.querySelector('.brightness .line');
    let overlay = document.querySelector("#overlay");

    // Default value
    let DefaultValue = 60;
    input_range.value = DefaultValue;
    number.innerHTML = DefaultValue
    line.style.width = `${DefaultValue}%`
    overlay.style.opacity = (1 - (DefaultValue / 100))

    input_range.addEventListener('input', () => {
        let value = input_range.value;


        number.innerHTML = value;
        line.style.width = `${value}%`;


        let level = 1 - (value / 100);
        overlay.style.opacity = level
    });
}

BrightnessControl();


function VolumeControl() {
    let input_range = document.querySelector(".volume .input_range")
    let sound = document.querySelector(".sound")
    let number = document.querySelector(".volume .number")
    let line = document.querySelector(".volume .line")

    let DefaultValue = 40;
    number.innerHTML = DefaultValue
    line.style.width = `${DefaultValue}%`

    input_range.addEventListener('input', () => {
        let value = input_range.value

        let number = document.querySelector(".volume .number")
        let line = document.querySelector('.volume .line')

        number.innerHTML = value
        line.style.width = `${value}%`

        if (sound) {
            sound.volume = value / 100
        }
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
        EnableRename(folder)
        IconMenu(folder);
        AttachDoubleClickRename(folder);

    })



}

CreateFolder()

function EnableRename(folder) {
    const nameElement = folder.querySelector(".name-change");
    if (!nameElement) return;

    const currentName = nameElement.innerText;

    const input = document.createElement("input");
    input.type = "text";
    input.value = currentName;
    input.classList.add("rename-input");

    folder.replaceChild(input, nameElement);
    //           |          |
    // newElement  // oldElement

    input.focus();

    function saveName() {
        const newName = input.value.trim() || currentName;
        const newSpan = document.createElement("span");
        newSpan.classList.add("name-change");
        newSpan.innerText = newName;

        folder.replaceChild(newSpan, input);
        AttachDoubleClickRename(folder); // attach dblclick again on new span
    }

    input.addEventListener("blur", saveName);
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            saveName();
        }
    });
}


function AttachDoubleClickRename(folder) {
    folder.querySelector(".name-change")?.addEventListener("dblclick", (e) => {
        e.stopPropagation()
        EnableRename(folder);
    });
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

let currentRightClickedFolder = null;

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

function RenameFolder() {
    let rename = document.querySelector(".Rename")

    rename.addEventListener("click", () => {

        if (currentRightClickedFolder) {
            EnableRename(currentRightClickedFolder)
        }
    })
}

RenameFolder()




function folderOpenClose(folder) {
    let open = document.querySelector(".folder-window");

    folder.addEventListener("dblclick", () => {
        open.style.display = 'block';

        addRemoveAppToTaskbar("folder", "./Assets/folder.png"); // taskbar pe icon
        ManagesZindexOfWindow(open); // z-index management
        toggleTaskbarHighlight("folder", true); // highlight ON
    });

    let close = document.querySelector(".closeFolder");
    if (close) {
        close.addEventListener("click", () => {
            open.style.display = 'none';
            toggleTaskbarHighlight("folder", false); // highlight OFF
        });
    }
}


const folderWindow = document.querySelector(".folder-window");
DragDrop(folderWindow);


function NotesApplication() {
    let color = document.getElementById("color");
    let createBtn = document.getElementById("createBtn")
    let list = document.getElementById("list")

    createBtn.addEventListener("click", () => {
        let newNote = document.createElement('div')
        newNote.classList.add('note');
        newNote.innerHTML = `
        <span class="exit">X</span>
                                    <textarea placeholder="Write-content..." rows="10" cols="30"></textarea>
        `

        newNote.style.borderColor = color.value
        list.appendChild(newNote)
        NoteDrag(newNote)
    })

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('exit')) {
            e.target.parentNode.remove()
        }
    })

    let front = 10
    function NoteDrag(element) {
        element.addEventListener("mousedown", (e) => {
            front++;
            element.style.zIndex = front
            const parent = element.parentElement.getBoundingClientRect();
            let shiftX = e.clientX - element.getBoundingClientRect().left;
            let shiftY = e.clientY - element.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                element.style.left = pageX - parent.left - shiftX + 'px';
                element.style.top = pageY - parent.top - shiftY + 'px';
            }

            function onMouseMove(e) {
                moveAt(e.pageX, e.pageY);
            }

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", onMouseMove);
            }, { once: true });
        });

        element.ondragstart = () => false;
    }

}

NotesApplication()



let openCal = document.querySelector("#calculator")
let calculator = document.querySelector(".calculator")
OpenClose(openCal, calculator)


const CalculatorWindow = document.querySelector(".calculator");
DragDrop(CalculatorWindow)


let openTerminalByMenu = document.querySelector("#Terminal")
let Terminal = document.querySelector(".terminal")
OpenClose(openTerminalByMenu, Terminal)
DragDrop(Terminal)




let notesIcon = document.getElementById("NotesTaking")
let NotesWindow = document.querySelector(".notes-window");
DragDrop(NotesWindow)
OpenClose(notesIcon, NotesWindow)



function MusicPlayer() {
    let right = document.querySelector(".lower .right")
    let songPlaylist = document.querySelector(".song-playlist")
    const songs = [
        {
            Name: "Pal - Pal",
            Addresss: "songs/Afusic - Pal Pal.mp3",
            Author: "Afusic",
            Banner: "songs/pal pal.webp"
        },
        {
            Name: "Russian Bandana",
            Addresss: "songs/Dhanda Nyoliwala - Russian Bandana.mp3",
            Author: "Dhanda Nyoliwala",
            Banner: "songs/Russian Bandana.webp"
        },
        {
            Name: "Chal Diye Tum Kahan",
            Addresss: "songs/Chal Diye Tum Kahan.mp3",
            Author: "AUR",
            Banner: "songs/chal diye tum kaha.webp"
        }
    ]

    let songIndex = 0

    let progress = document.querySelector("#progress")
    let play = document.querySelector(".controls #play")
    let next = document.querySelector(".controls #next")
    let prev = document.querySelector(".controls #prev")
    let title = document.querySelector(".title")
    let banner = document.querySelector(".banner img")
    let Music = document.getElementById("songs")

    function LoadSong(song) {
        title.innerHTML = `${song.Name}`
        banner.setAttribute("src", song.Banner)
        Music.setAttribute("src", song.Addresss)
        Music.load()
    }

    Music.addEventListener("loadedmetadata", () => {
        progress.max = Music.duration;
        progress.value = Music.currentTime;
    });

    setInterval(() => {
        progress.value = Music.currentTime
    }, 500);

    progress.addEventListener("change", () => {
        Music.currentTime = progress.value;
        Music.play();
    });

    function togglePlayPause() {
        if (Music.paused) {
            Music.play();
            play.innerHTML = `<i class="ri-pause-fill"></i>`;
        } else {
            Music.pause();
            play.innerHTML = `<i class="ri-play-fill"></i>`;
        }
    }

    play.addEventListener("click", togglePlayPause)

    prev.addEventListener("click", () => {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        LoadSong(songs[songIndex]);
        Music.play();
        play.innerHTML = `<i class="ri-pause-fill"></i>`;
    });

    next.addEventListener("click", () => {
        songIndex = (songIndex + 1) % songs.length;
        LoadSong(songs[songIndex]);
        Music.play();
        play.innerHTML = `<i class="ri-pause-fill"></i>`;
    });

    let sum = ""
    songs.forEach((elem, idx) => {
        sum += `<div class="list" id="${idx}">${elem.Name} (${elem.Author})</div>`
    })
    songPlaylist.innerHTML = sum

    right.addEventListener("click", (e) => {
        if (e.target.classList.contains("list")) {
            songIndex = parseInt(e.target.id)
            LoadSong(songs[songIndex])
            Music.play();
            play.innerHTML = `<i class="ri-pause-fill"></i>`;

        }
    });

    LoadSong(songs[songIndex]);
}


MusicPlayer()
let MusicWindow = document.querySelector(".music-window")
let MusicIcon = document.getElementById("Music-icon")
OpenClose(MusicIcon, MusicWindow)
DragDrop(MusicWindow)



let ChromeWindow = document.querySelector(".google-search-window")
let ChromeIcon = document.getElementById("Google-search")
OpenClose(ChromeIcon, ChromeWindow)
DragDrop(ChromeWindow)






let capturedImages = [];       // Shared with gallery
let cameraStream = null;       // To manage start/stop stream
let isCameraInitialized = false; // Flag to avoid duplicate init

function CameraWrap() {

    function CameraFnc() {
        let camera = document.getElementById("camera");
        let captureBtn = document.getElementById("capture");
        let previewImage = document.getElementById("previewImage");
        let thumbnails = document.getElementById("thumbnails");
        let preview = document.querySelector(".preview")
        let openImage = document.querySelector(".openImage")
        let PreviewClose = document.querySelector(".Preview-close")

        captureBtn.addEventListener("click", () => {
            preview.style.display = "block"
        })
        


        preview.addEventListener("click", () => {
            let imgSrc = document.getElementById("previewImage").getAttribute("src");

            if (imgSrc) {
                document.querySelector(".openImage img").setAttribute("src", imgSrc);
                openImage.style.display = "block"; // Show the preview
            }
        });

        PreviewClose.addEventListener("click", () => {
            openImage.style.display = "none"; // Close the fullscreen image
        });

        if (!cameraStream) {
            navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
                cameraStream = stream;
                camera.srcObject = stream;
                camera.play();
            });
        }

        if (!isCameraInitialized) {
            isCameraInitialized = true;

            captureBtn.addEventListener("click", () => {
                const canvas = document.createElement("canvas");
                canvas.width = camera.videoWidth;
                canvas.height = camera.videoHeight;
                const ctx = canvas.getContext("2d");
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(camera, 0, 0, canvas.width, canvas.height);

                const imgURL = canvas.toDataURL();
                previewImage.src = imgURL;

                const thumb = document.createElement("img");
                thumb.src = imgURL;
                thumbnails.appendChild(thumb);

                capturedImages.push(imgURL);
                thumb.addEventListener("click", () => openFullscreen(capturedImages.indexOf(imgURL)));
            });

            let cameraCloseBtn = document.querySelector(".camera-window .close");
            cameraCloseBtn.addEventListener("click", () => {
                document.querySelector(".camera-window").style.display = "none";
                if (cameraStream) {
                    cameraStream.getTracks().forEach(track => track.stop());
                    cameraStream = null;
                    isCameraInitialized = false;
                }
            });
        }
    }


    document.getElementById("CameraIcon").addEventListener("click", () => {
        let cameraWindow = document.querySelector(".camera-window");
        cameraWindow.style.display = "block";
        CameraFnc(); // Stream will restart only if not already running
    });


    let cameraWindow = document.querySelector(".camera-window")
    DragDrop(cameraWindow)

}


CameraWrap()


function galleryFnc() {
    let fullscreen = document.getElementById("fullscreenView");
    let fullscreenImg = document.getElementById("fullscreenImage");
    let closeFullscreen = document.getElementById("closeFullscreen");
    let prevImageBtn = document.getElementById("prevImage");
    let nextImageBtn = document.getElementById("nextImage");

    let currentImageIndex = 0;

    window.openFullscreen = function (index) {
        currentImageIndex = index;
        fullscreenImg.src = capturedImages[index];
        fullscreen.style.display = "flex";
    }

    closeFullscreen.addEventListener("click", () => {
        fullscreen.style.display = "none";
    });

    prevImageBtn.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex - 1 + capturedImages.length) % capturedImages.length;
        fullscreenImg.src = capturedImages[currentImageIndex];
    });

    nextImageBtn.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % capturedImages.length;
        fullscreenImg.src = capturedImages[currentImageIndex];
    });
}
galleryFnc();

let galleryWindow = document.querySelector(".gallery-window")
DragDrop(galleryWindow)



