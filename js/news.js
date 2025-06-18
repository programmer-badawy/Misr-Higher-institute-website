document.addEventListener('DOMContentLoaded', function() {
 
    const newsCards = document.querySelectorAll('.card');
    const cardsPerPage = 6;
    let currentPage = 1;
    let filteredCards = [...newsCards];
    
    createPaginationControls();
    
    createSearchFunctionality();
    
    createDateFiltering();
    
    addCategoryTags();
    
    initCardAnimations();
    
    createBackToTopButton();
    
    showPage(currentPage);
    
    function showPage(page) {
        const startIndex = (page - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        
        filteredCards.forEach(card => {
            card.style.display = 'none';
        });
        
        for (let i = startIndex; i < endIndex && i < filteredCards.length; i++) {
            filteredCards[i].style.display = 'block';
            
            filteredCards[i].style.opacity = 0;
            setTimeout(() => {
                filteredCards[i].style.opacity = 1;
                filteredCards[i].style.transition = 'opacity 0.3s ease-in';
            }, i * 100);
        }
        
        updatePaginationControls();
    }
    
    function createPaginationControls() {
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination-container';
        paginationContainer.style.display = 'flex';
        paginationContainer.style.justifyContent = 'center';
        paginationContainer.style.margin = '30px 0';
        paginationContainer.style.gap = '10px';
        
        const newsContainer = document.querySelector('.news');
        newsContainer.appendChild(paginationContainer);
        
        paginationContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('page-btn')) {
                const pageNum = parseInt(e.target.dataset.page);
                currentPage = pageNum;
                showPage(currentPage);
                
                document.querySelector('.news').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    function updatePaginationControls() {
        const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
        const paginationContainer = document.querySelector('.pagination-container');
        paginationContainer.innerHTML = '';
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn prev-btn';
        prevBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        });
        paginationContainer.appendChild(prevBtn);
        
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.dataset.page = i;
            
            pageBtn.style.padding = '8px 12px';
            pageBtn.style.borderRadius = '4px';
            pageBtn.style.border = 'none';
            pageBtn.style.backgroundColor = i === currentPage ? '#c7a23e' : '#f0f0f0';
            pageBtn.style.color = i === currentPage ? '#fff' : '#333';
            pageBtn.style.cursor = 'pointer';
            pageBtn.style.transition = 'all 0.3s ease';
            
            pageBtn.onmouseover = () => {
                if (i !== currentPage) {
                    pageBtn.style.backgroundColor = '#e4e4e4';
                }
            };
            
            pageBtn.onmouseout = () => {
                if (i !== currentPage) {
                    pageBtn.style.backgroundColor = '#f0f0f0';
                }
            };
            
            paginationContainer.appendChild(pageBtn);
        }
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn next-btn';
        nextBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        });
        paginationContainer.appendChild(nextBtn);
    }
    
    function createSearchFunctionality() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.margin = '20px auto';
        searchContainer.style.width = '100%';
        searchContainer.style.maxWidth = '500px';
        searchContainer.style.position = 'relative';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'البحث في الأخبار...';
        searchInput.className = 'search-input';
        searchInput.style.width = '100%';
        searchInput.style.padding = '12px 40px 12px 12px';
        searchInput.style.borderRadius = '30px';
        searchInput.style.border = '1px solid #ddd';
        searchInput.style.fontSize = '16px';
        searchInput.style.outline = 'none';
        searchInput.style.transition = 'all 0.3s ease';
        

        
        const searchIcon = document.createElement('i');
        searchIcon.className = 'fa-solid fa-search';
        searchIcon.style.position = 'absolute';
        searchIcon.style.left = '15px';
        searchIcon.style.top = '50%';
        searchIcon.style.transform = 'translateY(-50%)';
        searchIcon.style.color = '#777';
        
        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchIcon);
        
        const newsContainer = document.querySelector('.news');
        newsContainer.insertBefore(searchContainer, newsContainer.firstChild);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim().toLowerCase();
            
            if (searchTerm === '') {
                filteredCards = [...newsCards];
            } else {
                filteredCards = [...newsCards].filter(card => {
                    const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
                    const date = card.querySelector('.posted-date p')?.textContent.toLowerCase() || '';
                    const combinedText = `${title} ${date}`;
                    return combinedText.includes(searchTerm);
                });
            }
            
            currentPage = 1;
            showPage(currentPage);

            const noResultsMsg = document.querySelector('.no-results-msg');
            if (filteredCards.length === 0) {
                if (!noResultsMsg) {
                    const msg = document.createElement('p');
                    msg.className = 'no-results-msg';
                    msg.textContent = 'لا توجد نتائج تطابق بحثك';
                    msg.style.textAlign = 'center';
                    msg.style.margin = '30px 0';
                    msg.style.color = '#777';
                    msg.style.fontSize = '18px';

                    const cardsContainer = document.querySelector('.cards');
                    cardsContainer.parentNode.insertBefore(msg, cardsContainer.nextSibling);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        });
    }
    
    function createDateFiltering() {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-container';
        filterContainer.style.margin = '20px auto';
        filterContainer.style.display = 'flex';
        filterContainer.style.justifyContent = 'center';
        filterContainer.style.gap = '15px';

        const filters = [
            { text: 'الكل', value: 'all' },
            { text: 'هذا الشهر', value: 'مايو' },   
            { text: 'هذا العام', value: '2025' }   
        ];

        filters.forEach(filter => {
            const btn = document.createElement('button');
            btn.className = `filter-btn ${filter.value === 'all' ? 'active' : ''}`;
            btn.textContent = filter.text;
            btn.dataset.filter = filter.value;

            btn.style.padding = '8px 15px';
            btn.style.borderRadius = '20px';
            btn.style.border = 'none';
            btn.style.backgroundColor = filter.value === 'all' ? '#c7a23e' : '#f0f0f0';
            btn.style.color = filter.value === 'all' ? '#fff' : '#333';
            btn.style.cursor = 'pointer';
            btn.style.transition = 'all 0.3s ease';

            btn.addEventListener('click', function () {
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('active');
                    b.style.backgroundColor = '#f0f0f0';
                    b.style.color = '#333';
                });

                this.classList.add('active');
                this.style.backgroundColor = '#c7a23e';
                this.style.color = '#fff';

                const filterValue = this.dataset.filter;
                
                const currentDate = new Date();
                const currentMonth = currentDate.getMonth(); 
                const currentYear = currentDate.getFullYear();
                
                if (filterValue === 'all') {
                    filteredCards = [...newsCards];
                } else {
                    filteredCards = [...newsCards].filter(card => {
                        const dateText = card.querySelector('.posted-date p')?.textContent.trim() || '';
                        try {
                            const dateObj = parseArabicDate(dateText);
                            
                            if (filterValue === 'مايو') {
                                return dateObj.getMonth() === currentMonth && 
                                       dateObj.getFullYear() === currentYear;
                            } else if (filterValue === '2025') {
                                return dateObj.getFullYear() === currentYear;
                            }
                        } catch (e) {
                            console.error("Error parsing date:", e);
                            return false;
                        }
                        return true;
                    });
                }

                currentPage = 1;
                showPage(currentPage);
            });

            filterContainer.appendChild(btn);
        });

        const searchContainer = document.querySelector('.search-container');
        searchContainer.parentNode.insertBefore(filterContainer, searchContainer.nextSibling);
    }
    
    function parseArabicDate(dateStr) {
        const arabicMonths = {
            'يناير': 0,    
            'فبراير': 1,    
            'مارس': 2,      
            'أبريل': 3,     
            'ابريل': 3,     
            'مايو': 4,      
            'يونيو': 5,     
            'يوليو': 6,     
            'أغسطس': 7,     
            'اغسطس': 7,     
            'سبتمبر': 8,    
            'أكتوبر': 9,    
            'اكتوبر': 9,    
            'نوفمبر': 10,   
            'ديسمبر': 11    
        };
        
        const parts = dateStr.split(' ');
        const day = parseInt(parts[1]);
        
        const monthName = parts[2];
        if (!(monthName in arabicMonths)) {
            throw new Error(`Unknown month: ${monthName}`);
        }
        const month = arabicMonths[monthName];
        
        const year = parseInt(parts[3]);
        
        let time = parts[4];
        const isPM = time.includes('م');
        time = time.replace('ص', '').replace('م', '');
        
        let [hours, minutes] = time.split(':').map(Number);
        
        if (isPM && hours < 12) {
            hours += 12;
        }
        
        return new Date(year, month, day, hours, minutes);
    }
    
    function addCategoryTags() {
        const categories = ['تعليم', 'إعلانات', 'أنشطة', 'مبادرات', 'فعاليات'];
        
        newsCards.forEach(card => {
            const randomIndex = Math.floor(Math.random() * categories.length);
            const category = categories[randomIndex];
            
            const categoryTag = document.createElement('span');
            categoryTag.className = 'category-tag';
            categoryTag.textContent = category;
            categoryTag.style.position = 'absolute';
            categoryTag.style.top = '10px';
            categoryTag.style.right = '10px';
            categoryTag.style.backgroundColor = getCategoryColor(category);
            categoryTag.style.color = '#fff';
            categoryTag.style.padding = '4px 10px';
            categoryTag.style.borderRadius = '20px';
            categoryTag.style.fontSize = '12px';
            categoryTag.style.fontWeight = 'bold';
            
            card.querySelector('.image-section').style.position = 'relative';
            card.querySelector('.image-section').appendChild(categoryTag);
        });
    }
    
    function getCategoryColor(category) {
        const colors = {
            'تعليم': '#3498db',
            'إعلانات': '#e74c3c',
            'أنشطة': '#2ecc71',
            'مبادرات': '#9b59b6',
            'فعاليات': '#f39c12'
        };
        
        return colors[category] || '#777';
    }
    
    function initCardAnimations() {
        newsCards.forEach(card => {
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            card.style.borderRadius = '8px';
            card.style.overflow = 'hidden';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
        });
    }
    
    function createBackToTopButton() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
        backToTopBtn.style.position = 'fixed';
        backToTopBtn.style.bottom = '20px';
        backToTopBtn.style.right = '20px';
        backToTopBtn.style.width = '40px';
        backToTopBtn.style.height = '40px';
        backToTopBtn.style.borderRadius = '50%';
        backToTopBtn.style.backgroundColor = '#c7a23e';
        backToTopBtn.style.color = '#fff';
        backToTopBtn.style.border = 'none';
        backToTopBtn.style.cursor = 'pointer';
        backToTopBtn.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.transition = 'opacity 0.3s ease';
        backToTopBtn.style.zIndex = '1000';
        
        document.body.appendChild(backToTopBtn);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.opacity = '1';
            } else {
                backToTopBtn.style.opacity = '0';
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');
    
    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                navLinks.style.transform = 'translateY(0)';
                navLinks.style.opacity = '1';
            } else {
                navLinks.style.transform = 'translateY(-20px)';
                navLinks.style.opacity = '0';
            }
        });
    }
    
    const style = document.createElement('style');
    style.innerHTML = `
        .nav-links {
            transform: translateY(-20px);
            opacity: 0;
            
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .cards .card {
            animation: fadeIn 0.5s ease forwards;
        }
    `;
    document.head.appendChild(style);
});