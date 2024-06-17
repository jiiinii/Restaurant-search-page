const PaginationButton = (pagination) => {
  const pageBox = document.querySelector(".pageBox");
  
  const prevAndNextBtn = (tmp) => {
    pageBox.innerHTML = "";
    tmp.forEach(function (index) {
      console.log(`Index >>> `, index);
      const parent = document.createElement("li");
      const child = document.createElement("a");
      parent.className = `${index}Btn`;

      if (pageBox) {
        pageBox.append(parent);
        parent.append(child);
        child.append(`${index}`);

        const idxBtn = pageBox.querySelector(`.${index}Btn`);
        idxBtn.addEventListener("click", function () {
          if ("next" === index) {
            pagination.nextPage();
          } else if ("prev" === index) {
            pagination.prevPage();
          }
        });
      } else {
        console.error("pageBox element not found");
      }
    });
  };

  if (pagination.hasNextPage && pagination.hasPrevPage) {
    prevAndNextBtn(["prev", "next"]);
  } else if (pagination.hasNextPage) {
    prevAndNextBtn(["next"]);
  } else if (pagination.hasPrevPage) {
    prevAndNextBtn(["prev"]);
  }
};

export default PaginationButton;
