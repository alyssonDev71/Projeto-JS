// Array storage class (pode ser removido se você for usar só dentro do HTML)
let carouselArr = [];

// Classe Carousel
class Carousel {
    constructor(image, title, url) {
        this.image = image;
        this.title = title;
        this.url = url;
    }

    // Inicia o carrossel
    static Start(arr) {
        if (arr && arr.length > 0) {
            Carousel.carouselArr = arr;
            Carousel._sequence = 0;
            Carousel._size = arr.length;
            Carousel.Next();
    
            // Intervalo automático
            Carousel._interval = setInterval(() => {
                Carousel.Next();
            }, 5000);
    
            document.getElementById("prev-btn").addEventListener("click", () => {
                Carousel.Prev();
                Carousel.RestartInterval();
            });
    
            document.getElementById("next-btn").addEventListener("click", () => {
                Carousel.Next();
                Carousel.RestartInterval();
            });
        } else {
            throw "O método Start precisa de um array com objetos Carousel.";
        }
        Carousel.GenerateDots();

    }
    
    static Prev() {
        Carousel._sequence--;
        if (Carousel._sequence < 0) {
            Carousel._sequence = Carousel._size - 1;
        }
        Carousel.Show();
    }
    
   
    static Next() {
        Carousel._sequence++;
        if (Carousel._sequence >= Carousel._size) {
            Carousel._sequence = 0;
        }
        Carousel.Show();
    }
    
    static Show() {
        const currentItem = Carousel.carouselArr[Carousel._sequence];
    
        const carouselDiv = document.getElementById("carousel");
        
        carouselDiv.innerHTML = `
            <img src="img/${currentItem.image}" style="width:100%; max-height:400px;">
            <button id="prev-btn">&#10094;</button>
            <button id="next-btn">&#10095;</button>
        `;
 
        const titleDiv = document.getElementById("carousel-title");
        titleDiv.innerHTML = `<a href="${currentItem.url}" style="text-decoration:none; font-size:20px; color:#000;">${currentItem.title}</a>`;
    
    
        document.getElementById("prev-btn").addEventListener("click", () => {
            Carousel.Prev();
            Carousel.RestartInterval();
        });
    
        document.getElementById("next-btn").addEventListener("click", () => {
            Carousel.Next();
            Carousel.RestartInterval();
        });
        Carousel.HighlightDot();

    }
    static RestartInterval() {
        clearInterval(Carousel._interval);
        Carousel._interval = setInterval(() => {
            Carousel.Next();
        }, 5000);
    }
    static GenerateDots() {
        const dotsContainer = document.getElementById("carousel-dots");
        dotsContainer.innerHTML = ""; 
    
        for (let i = 0; i < Carousel._size; i++) {
            const dot = document.createElement("span");
            dot.classList.add("carousel-dot");
    
          
            dot.addEventListener("click", () => {
                Carousel._sequence = i;
                Carousel.Show();
                Carousel.RestartInterval();
            });
    
            dotsContainer.appendChild(dot);
        }
    
        Carousel.HighlightDot(); 
    }
    static HighlightDot() {
        const dots = document.querySelectorAll(".carousel-dot");
        dots.forEach((dot, index) => {
            if (index === Carousel._sequence) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }
    
}    
