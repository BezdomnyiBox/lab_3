function showImage(element) {
  element.style.opacity = "1";
}

function hideImage(element) {
  element.style.opacity = "0.7";
}



function sortData() {
  alert("Отсортировано");
  // Получение значений выбранных полей и флагов сортировки
  let sortFirst = document.getElementById("sortFirst").value;
  let descFirst = document.getElementById("descFirst").checked;
  let sortSecond = document.getElementById("sortSecond").value;
  let descSecond = document.getElementById("descSecond").checked;
  let sortThird = document.getElementById("sortThird").value;
  let descThird = document.getElementById("descThird").checked;

  // Логика сортировки таблицы
  let table = document.getElementById("main_table");
  let rows = table.rows;
  let data = [];

  // Преобразование строк таблицы в массив объектов
  for (let i = 1; i < rows.length; i++) { // Начинаем с 1, чтобы пропустить заголовок таблицы
    let row = rows[i];
    let rowData = {
      name: row.cells[0].innerHTML,
      position: row.cells[1].innerHTML,
      nationality: row.cells[2].innerHTML,
      club: row.cells[3].innerHTML,
      birthYear: row.cells[4].innerHTML,
      height: row.cells[5].innerHTML,
      rating: row.cells[6].innerHTML
    };
    data.push(rowData);
  }


  function sortArrayByProperty(array, propertys, desc) {

    array.sort(function (a, b) {
      var valueA = a[propertys];
      var valueB = b[propertys];

      if (typeof valueA === "string" && typeof valueB === "string") {
        if (!desc) {
          return valueA.localeCompare(valueB);
        }
        else {
          return valueB.localeCompare(valueA);
        }
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        if (!desc) {
          return valueA - valueB;
        }
        else {
          return valueB - valueA;
        }
      } else {
        return 0;
      }
    });

    return array;
  }

  let sorted = data;

  // Применение сортировки на каждом уровне
  if (sortThird !== "none" && sortSecond !== "none" && sortFirst !== "none") {
    sorted = sortArrayByProperty(sorted, sortThird, descThird);
  }
  if (sortSecond !== "none" && sortFirst !== "none") {
    sorted = sortArrayByProperty(sorted, sortSecond, descSecond);
  }
  if (sortFirst !== "none") {
    sorted = sortArrayByProperty(sorted, sortFirst, descFirst);
  }


  // Обновление таблицы с отсортированными данными
  for (let i = 1; i < rows.length + 1; i++) {

    rows[i].cells[0].innerHTML = sorted[i - 1].name;
    rows[i].cells[1].innerHTML = sorted[i - 1].position;
    rows[i].cells[2].innerHTML = sorted[i - 1].nationality;
    rows[i].cells[3].innerHTML = sorted[i - 1].club;
    rows[i].cells[4].innerHTML = sorted[i - 1].birthYear;
    rows[i].cells[5].innerHTML = sorted[i - 1].height;
    rows[i].cells[6].innerHTML = sorted[i - 1].rating;
  }
}

function handleLevelChange1() {
  let level1Select = document.getElementById("sortFirst");
  let level2Select = document.getElementById("sortSecond");
  let level3Select = document.getElementById("sortThird");

  // Получаем выбранное значение в Level 1
  let selectedValue1 = level1Select.value;

  if (level1Select.value != "none") {
    level2Select.disabled = false;
    restoreOption(level2Select);
    restoreOption(level3Select);
    removeOption(level2Select, selectedValue1);
  }
  else {
    level2Select.disabled = true;
  }
}

function handleLevelChange2() {
  let level1Select = document.getElementById("sortFirst");
  let level2Select = document.getElementById("sortSecond");
  let level3Select = document.getElementById("sortThird");

  // Получаем выбранное значение в Level 1
  let selectedValue1 = level1Select.value;
  let selectedValue2 = level2Select.value;

  if (level1Select.value != "none" && level2Select.value != "none") {
    level3Select.disabled = false;
    restoreOption(level3Select);
    removeOption(level3Select, selectedValue1);
    removeOption(level3Select, selectedValue2);
  }
  else {
    level3Select.disabled = true;
  }
}

function removeOption(selectElement, value) {
  for (let i = 0; i < selectElement.options.length; i++) {
    if ((selectElement.options[i].value === value) && (selectElement.options[i].value != "none")) {
      selectElement.remove(i);
      break;
    }
  }
}

function restoreOption(selectElement) {
  while (selectElement.options.length) {
    selectElement.options[0] = null;
  }
  let newOption1 = new Option("Нет", "none");
  let newOption2 = new Option("Имя", "name");
  let newOption3 = new Option("Амплуа", "position");
  let newOption4 = new Option("Национальность", "nationality");
  let newOption5 = new Option("Клуб", "club");
  let newOption6 = new Option("Год рождения", "birthYear");
  let newOption7 = new Option("Рост", "height");
  let newOption8 = new Option("Рейтинг", "rating");
  selectElement.append(newOption1);
  selectElement.append(newOption2);
  selectElement.append(newOption3);
  selectElement.append(newOption4);
  selectElement.append(newOption5);
  selectElement.append(newOption6);
  selectElement.append(newOption7);
  selectElement.append(newOption8);

}

/* // Получаем таблицу и все ее строки
let tableForSearch = document.getElementById("main_table");
let rowsForSearch = tableForSearch.getElementsByTagName("tr"); */


function filterTable() {

  let tableForSearch = document.getElementById("main_table");
  let rowsForSearch = tableForSearch.getElementsByTagName("tr");
  // Получаем значения полей формы
  let name = document.getElementById("nameFilter").value;
  let position = document.getElementById("positionFilter").value;
  let nationality = document.getElementById("nationalityFilter").value;
  let club = document.getElementById("clubFilter").value;
  let birthyear1 = document.getElementById("birthYearFrom").value;
  let birthyear2 = document.getElementById("birthYearTo").value;
  let height1 = document.getElementById("heightFrom").value;
  let height2 = document.getElementById("heightTo").value;
  let rating1 = document.getElementById("ratingFrom").value;
  let rating2 = document.getElementById("ratingTo").value;


  // Проходимся по каждой строке таблицы, начиная со второй (так как первая строка содержит заголовки)
  for (let i = 1; i < rowsForSearch.length; i++) {
    let row = rowsForSearch[i];

    // Получаем значения ячеек таблицы
    let rowName = row.cells[0].innerHTML;
    let rowPosition = row.cells[1].innerHTML
    let rowNationality = row.cells[2].innerHTML
    let rowClub = row.cells[3].innerHTML
    let rowYear = row.cells[4].innerHTML
    let rowHeight = row.cells[5].innerHTML
    let rowRate = row.cells[6].innerHTML


    // Фильтруем данные согласно выбранным параметрам
    let isNameValid =
      !name || rowName.toLowerCase().includes(name.toLowerCase());

    let isPositionValid =
      !position || rowPosition.toLowerCase().includes(position.toLowerCase());

    let isNationalityValid =
      !nationality || rowNationality.toLowerCase().includes(nationality.toLowerCase());

    let isClubValid =
      !club || rowClub.toLowerCase().includes(club.toLowerCase());

    let isYearValid =
      !birthyear1 ||
      !birthyear2 ||
      (Number(rowYear) >= birthyear1 && Number(rowYear) <= birthyear2);

    let isHeightValid =
      !height1 ||
      !height2 ||
      (Number(rowHeight) >= height1 && Number(rowHeight) <= height2);

    let isRateValid =
      !rating1 ||
      !rating2 ||
      (Number(rowRate) >= rating1 && Number(rowRate) <= rating2);

    // Скрываем строки, которые не удовлетворяют выбранным параметрам
    if (
      !isNameValid ||
      !isPositionValid ||
      !isNationalityValid ||
      !isClubValid ||
      !isYearValid ||
      !isHeightValid ||
      !isRateValid
    ) {
      row.style.display = "none";
    } else {
      row.style.display = "";
    }
  }
}

