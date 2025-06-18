// burger
const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.getElementById('navLinks');

burgerMenu.addEventListener('click', () => {
navLinks.classList.toggle('show');
});


//  counter


const counters = document.querySelectorAll('.counter');

counters.forEach((counter) => 
{ counter.innerHTML='0' ;

const updatecounter = ()=> {
    const target = +counter.getAttribute('data-target');
    const c = + counter.innerHTML;
    const increment = target/1000;
if(c<target){
    counter.innerHTML=`${Math.ceil(c + increment)}` ;
    setTimeout(updatecounter,1);
}
};
    updatecounter();
    
});



// student services page


function loadContent(page) {
    const contentArea = document.getElementById("contentArea");
  
    if (page === "studegree") {
      contentArea.innerHTML = `
        <h1>للحصول علي الدرجات قم بالدخول الي نظام ابن الهيثم عبر الرابط التالي</h1>
        <a class="stda" href="https://stda.mans.edu.eg/">نظام ابن الهيثم</a>
      `;
    } else if (page === "schedules") {
      contentArea.innerHTML = `
        <div class="row mb-3">
            <div class="col-md-6">
              <div class=" sched p-3  ">
                <h1>شعبة علوم حاسب</h1>
                <a target="_blank" href="https://metmans.edu.eg/uploads/tables/study_tables/craQeggCTHQWKE08AwjMlHFArKPwClHnaYEZn2Fu.jpg">الفرقة الاولي</a>
                <a target="_blank" href="https://metmans.edu.eg/uploads/tables/study_tables/SIWPrTsawa8OQKNkCDY01KtSRd6EOFkFRLPy3LS4.jpg">الفرقة الثانية</a>
                <a target="_blank" href="https://metmans.edu.eg/uploads/tables/study_tables/TE8KL0PZ8cABQaIwOXn198L26A7H7itxJsUWp0dk.jpg">الفرقة الثالثة</a>
                <a target="_blank" href="https://metmans.edu.eg/uploads/tables/study_tables/DY3lWapvJCM6s06Qeh19n6N530UDU1JJyOFgUMJK.jpg">الفرقة الرابعة</a>
            </div>
            </div>
            <div class="col-md-6">
                <div class=" sched p-3  ">
                    <h1>شعبة نظم معلومات الاعمال</h1>
                    <a target="_blank" href="https://metmans.edu.eg/uploads/tables/study_tables/22bXHZP2zt0AMxPsifIMHTKUbTpkzxDypKeIO65g.jpg">الفرقة الاولي</a>
                    <a target="_blank" href="https://metmans.edu.eg/uploads/tables/study_tables/kNpLntuuVCmFUuyCnfcBploeXmdBRDye3je67Dyy.jpg">الفرقة الثانية</a>
                    <a target="_blank" href="https://metmans.edu.eg/uploads/tables/study_tables/THM35Paw3zYOEDzW82hDC8K6Pk0aMeQ45qZ5pejo.jpg">الفرقة الثالثة</a>
                    <a target="_blank" href="https://metmans.edu.eg/uploads/tables/study_tables/N4X8acDnbsnNnxhwK4pSVJrs4EiSeWn6veB6SLUs.jpg">الفرقة الرابعة</a>
                </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
                <div class=" sched p-3 ">
                    <h1>شعبة محاسبة</h1>
                    <a target="_blank" href="https://metmans.edu.eg/uploads/tables/study_tables/FDMkrpYo0ABmd0RwhHInGxfFIOlE6NXZidTZ2UVn.jpg">الفرقة الاولي</a>
                    <a target="_blank" href="https://metmans.edu.eg/uploads/tables/study_tables/fZn2DofMOflZsjyUeDXuDTd2W8DFDNcpV5FASBjx.jpg">الفرقة الثانية</a>
                    <a target="_blank" href="https://metmans.edu.eg/uploads/tables/study_tables/fbq3Fj4H5DdaZbZxih4VUDjgyv0Rke7E2tf2q5C5.jpg">الفرقة الثالثة</a>
                    <a target="_blank" href="https://metmans.edu.eg/uploads/tables/study_tables/0tHo3C1Jf62sAprV3pUqxpj8YwVkqOCnkyoNnv2E.jpg">الفرقة الرابعة</a>
                </div>
            </div>
            <div class="col-md-6">
                <div class=" sched p-3 ">
                    <h1>شعبة ادارة اعمال</h1>
                    <a target="_blank" href="https://metmans.edu.eg/uploads/tables/study_tables/k7B3e49PjiiYeoDGjKpvF8oMu2joiLkVdlor3s3q.jpg">الفرقة الثالثة</a>
                    <a target="_blank" href="https://metmans.edu.eg/uploads/tables/study_tables/LFZnQ2PhofKz6aM3GlEHspC173zQZlVy1pzTSqwf.jpg">الفرقة الرابعة</a>
                </div>
            </div>
          </div>
      `;
    } else if (page === "agenda") {
      contentArea.innerHTML = `
        <table class="table table-secondary table-hover table-bordered text-center mb-30">
            <thead class="text-center">
                <tr>
                    <th class="th-with-table">النشاط</th>
                    <th class="th-with-table">التاريخ</th>
                    <th class="th-with-table">المدة</th>
                </tr>
            </thead>
            <tbody>
                                        <tr class=" ">
                    <td class="text-right">بداية الفصل الدراسي الثاني</td>
                    <td>السبت, 8 فبراير 2025</td>
                    <td>-</td>
                </tr>
                                        <tr class=" ">
                    <td class="text-right">امتحانات أعمال السنة (الفصل الدراسي الثاني)</td>
                    <td>السبت, 5 أبريل 2025</td>
                    <td>-</td>
                </tr>
                                        <tr class=" ">
                    <td class="text-right">نهاية المحاضرات النظرية</td>
                    <td>الخميس, 15 مايو 2025</td>
                    <td>-</td>
                </tr>
                                        <tr class=" ">
                    <td class="text-right">بداية امتحانات العملى(للمقررات العملية فقط)</td>
                    <td>السبت, 17 مايو 2025</td>
                    <td>-</td>
                </tr>
                                        <tr class=" ">
                    <td class="text-right">بداية امتحانات التخلفات (لطلاب الفرق الثانية والثالثة الرراسبين بمقرر او اثنين من السنوات السابقة)</td>
                    <td>السبت, 17 مايو 2025</td>
                    <td>-</td>
                </tr>
                                        <tr class=" ">
                    <td class="text-right">امتحان نهاية الفصل الدراسي الثاني</td>
                    <td>الخميس, 22 مايو 2025</td>
                    <td>-</td>
                </tr>
                                        <tr class=" ">
                    <td class="text-right">مناقشة مشروع التخرج(للفرقة الرابعة شعبة علوم الحاسب ونظم المعلومات)</td>
                    <td>السبت, 28 يونيو 2025</td>
                    <td>-</td>
                </tr>
            </tbody>
        </table>
      `;
    }else if (page === "library") {
    contentArea.innerHTML = `
      <iframe src="books" frameborder="0"></iframe>
    `;
  }else if (page === "eduplatform") {
    contentArea.innerHTML = `
      <iframe src="https://student.metmans.edu.eg/" frameborder="0"></iframe>
      `;
    }else if (page === "exams") {
        contentArea.innerHTML = `
        <iframe src="https://exexams.mans.edu.eg/student/login" frameborder="0"></iframe>
      
    `;
  }
  }